// Checks the released .mpk for the files the Marketplace release needs:
// LICENSE, and dependencies.txt with a license text for every bundled package.
// Runs after `npm run release` on every platform (releases are built on
// Windows, CI on Linux). Plain Node, no dependencies.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { inflateRawSync } from "node:zlib";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const org = pkg.packagePath;
const mpk = join("dist", pkg.version, `${org}.${pkg.widgetName}.mpk`);

function readZip(file) {
    const buf = readFileSync(file);
    let eocd = buf.length - 22;
    while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) {
        eocd--;
    }
    if (eocd < 0) {
        throw new Error(`${file} is not a zip file`);
    }
    const count = buf.readUInt16LE(eocd + 10);
    let offset = buf.readUInt32LE(eocd + 16);
    const entries = new Map();
    for (let i = 0; i < count; i++) {
        const method = buf.readUInt16LE(offset + 10);
        const size = buf.readUInt32LE(offset + 20);
        const nameLength = buf.readUInt16LE(offset + 28);
        const extraLength = buf.readUInt16LE(offset + 30);
        const commentLength = buf.readUInt16LE(offset + 32);
        const local = buf.readUInt32LE(offset + 42);
        const name = buf.toString("utf8", offset + 46, offset + 46 + nameLength).replace(/\\/g, "/");
        entries.set(name, () => {
            const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
            const data = buf.subarray(start, start + size);
            return (method === 8 ? inflateRawSync(data) : data).toString("utf8");
        });
        offset += 46 + nameLength + extraLength + commentLength;
    }
    return entries;
}

const problems = [];
let entries;
try {
    entries = readZip(mpk);
} catch (error) {
    console.error(`check-mpk: cannot read ${mpk}: ${error.message}`);
    process.exit(1);
}

if (!entries.has("LICENSE") || !entries.get("LICENSE")().trim()) {
    problems.push("LICENSE is missing or empty");
}
if (entries.has("dependencies.txt")) {
    const blocks = entries
        .get("dependencies.txt")()
        .split(/\r?\n-{3,}\r?\n/)
        .filter(block => /^Name:/m.test(block));
    for (const block of blocks) {
        if (!/License Text:/.test(block)) {
            problems.push(`dependencies.txt has no license text for ${block.match(/^Name: (.*)$/m)[1]}`);
        }
    }
} else {
    problems.push("dependencies.txt is missing (build with npm run release, not npm run build)");
}

if (problems.length) {
    console.error(`check-mpk: ${mpk}\n  - ${problems.join("\n  - ")}`);
    process.exit(1);
}
console.log(`check-mpk: ${mpk} contains LICENSE and dependencies.txt with license texts.`);
