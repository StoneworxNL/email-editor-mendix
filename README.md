## Email Builder Mendix Pluggable Widget

A Mendix Pluggable Widget to build emails and email templates using
[Unlayer's Editor](https://github.com/unlayer/react-email-editor). This will allow you to quickly build beautiful and
complex emails, end-user oriented; reuse templates and designs; make sure they look ok in different devices and in
dark-mode... All embedded in your Mendix application.

<img alt="Mendix Pluggable Widget Email Editor Logo" src="https://github.com/StoneworxNL/email-editor-mendix/blob/main/images/logo.jpeg" width="65px"/>

## Features

Build emails and email templates in a friendly and easy manner, using drag and drop.

-   Create and customize email templates
    -   Add content (which may be kept dynamic by using Mendix Email Placeholders, such as {%Name%})
    -   Create unique layouts with blocks
    -   Change settings
-   Load existing templates
-   Preview emails (for desktop, tablet and mobile devices, using different resolutions)
    -   Preview available for dark mode as well
-   Save Design (JSON with template) and/or save HTML
    -   Mendix action (such as call microflow) possible
    -   You can then easily convert it into Mendix Email Templates
    -   With custom logic, you can go back and forth between the email editor and the Mendix template

## Usage

1. In a database entity, make sure you have a String attribute (unlimited length) to store the JSON design and,
   optionally, another String attribute to store the HTML. These can be non-persistent.
2. Fetch an object of this entity in a data view's data source (eg. microflow).
3. Add the email editor widget inside the data view.
4. Set the JSON template attribute and, optionally, the HTML attribute.
5. Choose how the design is saved:
    - **Toolbar actions**: set the Save Template and/or Export HTML actions. Save Template writes the JSON and HTML
      attributes and then runs its action; both actions also receive the HTML and JSON as variables.
    - **Write changes to attributes**: the attributes are updated while the user edits, so a regular Save button on
      the page stores them.

If the object is read-only, the editor opens in preview mode and the Save Template button is hidden.

### Properties

| Group        | Property                    | Description                                                                                          |
| ------------ | --------------------------- | ---------------------------------------------------------------------------------------------------- |
| Data         | JSON Template               | String attribute holding the design.                                                                 |
| Data         | HTML                        | Optional. String attribute that receives the exported HTML.                                          |
| Data         | Write changes to attributes | Update the attributes while editing (off by default).                                                |
| Editor       | Unlayer project ID          | Project ID from the [Unlayer Developer Console](https://dashboard.unlayer.com). Needed in production. |
| Editor       | Height                      | Minimum height (CSS length). Unlayer recommends at least 1024 × 700 px.                              |
| Editor       | Theme                       | Modern or classic, light or dark.                                                                    |
| Editor       | Locale                      | Optional expression, eg. `'nl-NL'`.                                                                  |
| Editor       | Advanced options (JSON)     | Any other [Unlayer option](https://docs.unlayer.com), eg. `{"tools": {"html": {"enabled": false}}}`. |
| Actions      | Captions                    | Translatable button captions.                                                                        |
| Merge tags   | Merge tags                  | Optional list of placeholders offered in the editor (see below).                                     |
| Images       | Image uploads               | Unlayer storage, own endpoint or disabled (see below).                                               |

Advanced options are applied when the editor is created; changing them recreates the editor. Locale and merge tags
are updated in place.

### Merge Tags

Point the Merge tags data source at a list (eg. a microflow returning non-persistent objects) and set:

-   **Name**: label in the editor's merge tag menu, eg. `$currentObject/Label`
-   **Value**: text inserted into the design, eg. `'{%' + $currentObject/Name + '%}'` for Mendix email template
    placeholders
-   **Sample** (optional): value shown while previewing

### Image Uploads

By default, images that users upload are stored by Unlayer, outside your application. To keep them in your app, set
**Image uploads** to **Own endpoint** and set **Upload URL** to an endpoint in your app (eg. a published REST
service at `rest/emaileditor/v1/images`) that:

-   accepts a `POST` with `multipart/form-data`, the image in a part named `file`
-   stores it where the email's recipients can reach it (the URL ends up in the email)
-   responds with JSON: `{"url": "https://your-app/path/to/image.png"}`

When available, the Mendix session's CSRF token is sent in the `X-Csrf-Token` header, so the service can use the
active session for authentication. Choose **Disabled** to hide uploads entirely.

### Content Security Policy

The editor loads `https://editor.unlayer.com/embed.js` and runs in an iframe from `editor.unlayer.com`. If your app
sets a Content Security Policy, allow that host in `script-src` and `frame-src`. The widget cannot be used offline.

### Configuration Screenshots

#### Page Setup

![Studio Pro Screenshot](https://github.com/StoneworxNL/email-editor-mendix/blob/main/images/studiopro.png)

#### Domain Model (Demo)

<img alt="Domain Model Demo" src="https://github.com/StoneworxNL/email-editor-mendix/blob/main/images/domainmodel.png" width="150px"/>

#### Widget's General Settings

<img alt="Widget's General Settings" src="https://github.com/StoneworxNL/email-editor-mendix/blob/main/images/Data.png" width="500px"/>

#### Widget's Action Settings

<img alt="Widget's Auto-Draw Settings" src="https://github.com/StoneworxNL/email-editor-mendix/blob/main/images/actions.png" width="500px"/>

#### Export Microflow Example

![Export Microflow Example](https://github.com/StoneworxNL/email-editor-mendix/blob/main/images/export.png)

## Demo Project

-   [Mendix app running on the cloud](https://email-editor-mendix-sandbox.mxapps.io/index.html)
-   [Mendix demo module (.mpk)](https://github.com/StoneworxNL/email-editor-mendix/tree/main/demo) 
    <!-- - [Marketplace widget](https://marketplace.mendix.com/link/component/237438) -->

### Editor Embedded in Mendix Web App

![Editor Example](https://github.com/StoneworxNL/email-editor-mendix/blob/main/images/demo.png)

### Example of Editing Email Template

![Editor Gif Example](https://github.com/StoneworxNL/email-editor-mendix/blob/main/images/demogif.gif)

### Preview

It is possible to preview the email in Web, Tablet and Mobile Phone versions. It is also possible to select different
devices / screen sizes.

![Preview Example](https://github.com/StoneworxNL/email-editor-mendix/blob/main/images/preview.png)

### Email Sent (Example)

After creating the template, we can use custom logic to fill in placeholders (if applicable), as well as send the email.
For the image below, we used FakeSMTP to receive a test email.

![Sent Email Example](https://github.com/StoneworxNL/email-editor-mendix/blob/main/images/example.png)

## Issues, Suggestions and Feature Requests

This editor uses an iframe. Beware of this when creating templates/emails containing sensitive (company) data. The good
news is that you don't need to place sensitive data in the template itself, as you can use Mendix Email Placeholders and
then populate those in Mendix, before sending the email.

<!-- ## About Stoneworx

<img alt="From https://www.stoneworx.nl/o" src="https://cdn.prod.website-files.com/66991b9fc069c88aec093fd1/66b242753e65840128c97ab9_imagehero-p-800.png" width="50px"/>

We started our company as friends and will always remain a club of people that likes doing business in a friendly matter. A group of entrepreneurial, smart and highly experienced Mendix professionals.  

On a daily basis, we create software applications that simplify our clients’ business processes by using the Mendix low code platform. It is our mission is to turn complex ideas into simple solutions for medium to corporate-sized businesses, in any industry. -->
