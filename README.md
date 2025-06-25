## Email Builder Mendix Pluggable Widget
A Mendix Pluggable Widget to build emails and email templates using [Unlayer's Editor](https://github.com/unlayer/react-email-editor). This will allow you to quickly build beautiful and complex emails, end-user oriented; reuse templates and designs; make sure they look ok in different devices and in dark-mode... All embedded in your Mendix application.

<img alt="Mendix Pluggable Widget Email Editor Logo" src="https://github.com/joaodelopes/email-editor-mendix/blob/main/images/logo.jpeg" width="65px"/>

## Features
Build emails and email templates in a friendly and easy manner, using drag and drop.

*   Create and customize email templates
    *   Add content (which may be kept dynamic by using Mendix Email Placeholders, such as {%Name%})
    *   Create unique layouts with blocks
    *   Change settings
*   Load existing templates
*   Preview emails (for desktop, tablet and mobile devices, using different resolutions)
    *   Preview available for dark mode as well
*   Save Design (JSON with template) and/or save HTML
    *   Mendix action (such as call microflow) possible
    *   You can then easily convert it into Mendix Email Templates
    *   With custom logic, you can go back and forth between the email editor and the Mendix template

## Usage
1. In a database entity, make sure you have a String attribute to store the JSON configuration and another String attribute to store the HTML. This can be non-persistent.
2. Fetch an object of this entity in a data view's data source (eg. microflow).
3. Add the email editor widget inside the data view.
4. Set the HTML body and JSON template attributes.
5. Optionally, set an action to export the HTML and another to save the JSON template.

### Configuration Screenshots

#### Page Setup
![Studio Pro Screenshot](https://github.com/joaodelopes/email-editor-mendix/blob/main/images/studiopro.png)

#### Domain Model (Demo)
<img alt="Domain Model Demo" src="https://github.com/joaodelopes/email-editor-mendix/blob/main/images/domainmodel.png" width="150px"/>

#### Widget's General Settings
<img alt="Widget's General Settings" src="https://github.com/joaodelopes/email-editor-mendix/blob/main/images/Data.png" width="500px"/>

#### Widget's Action Settings
<img alt="Widget's Auto-Draw Settings" src="https://github.com/joaodelopes/email-editor-mendix/blob/main/images/actions.png" width="500px"/>

#### Export Microflow Example
![Export Microflow Example](https://github.com/joaodelopes/email-editor-mendix/blob/main/images/export.png)

## Demo Project
<!-- - [Mendix app running on the cloud](https://x-spreadsheet-demo-sandbox.mxapps.io/index.html)
- [Mendix demo module (.mpk)](https://github.com/joaodelopes/xspreadsheet/tree/main/demo)
- [Marketplace widget](https://marketplace.mendix.com/link/component/237438) -->
<!-- - [Mendix demo scss (.scss)](https://github.com/joaodelopes/block-note-mendix/blob/main/demo/demo.scss) -->

### Editor Embedded in Mendix Web App

![Editor Example](https://github.com/joaodelopes/email-editor-mendix/blob/main/images/demo.png)

### Example of Editing Email Template

![Editor Gif Example](https://github.com/joaodelopes/email-editor-mendix/blob/main/images/demogif.gif)

### Preview

It is possible to preview the email in Web, Tablet and Mobile Phone versions. It is also possible to select different devices / screen sizes.

![Preview Example](https://github.com/joaodelopes/email-editor-mendix/blob/main/images/preview.png)

### Email Sent (Example)
After creating the template, we can use custom logic to fill in placeholders (if applicable), as well as send the email. For the image below, we used FakeSMTP to receive a test email.

![Sent Email Example](https://github.com/joaodelopes/email-editor-mendix/blob/main/images/example.png)

## Issues, Suggestions and Feature Requests
This editor uses an iframe. Beware of this when creating templates/emails containing sensitive (company) data.
The good news is that you don't need to place sensitive data in the template itself, as you can use Mendix Email Placeholders and then populate those in Mendix, before sending the email.

<!-- ## About Stoneworx

<img alt="From https://www.stoneworx.nl/o" src="https://cdn.prod.website-files.com/66991b9fc069c88aec093fd1/66b242753e65840128c97ab9_imagehero-p-800.png" width="50px"/>

We started our company as friends and will always remain a club of people that likes doing business in a friendly matter. A group of entrepreneurial, smart and highly experienced Mendix professionals.  

On a daily basis, we create software applications that simplify our clients’ business processes by using the Mendix low code platform. It is our mission is to turn complex ideas into simple solutions for medium to corporate-sized businesses, in any industry. -->