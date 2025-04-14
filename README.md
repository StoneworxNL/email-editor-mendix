## Data Spreadsheet Mendix Pluggable Widget
A Mendix Pluggable Widget to build emails and email templates using [Unlayer's Editor](https://github.com/unlayer/react-email-editor). This will allow you to quickly build beautiful and complex emails, end-user oriented; reuse templates and designs; make sure they look ok in different devices and in dark-mode... All embedded in your Mendix application.

<img alt="Mendix Pluggable Widget Data Spreadsheet Logo" src="https://github.com/joaodelopes/email-editor-mendix/blob/main/images/logo.jpeg" width="65px"/>

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

<!-- ### Light
![Light Mode](https://github.com/joaodelopes/block-note-mendix/blob/main/images/lightmodedemo.png)
![Light Mode (full-page)](https://github.com/joaodelopes/block-note-mendix/blob/main/images/fullscreendemo.png)

### Dark
![Dark Mode](https://github.com/joaodelopes/block-note-mendix/blob/main/images/darkmodedemo.png)

### View-only
![View-only Mode](https://github.com/joaodelopes/block-note-mendix/blob/main/images/viewmodedemo.png) -->

## Usage
1. In a database entity, make sure you have a String attribute to store the JSON configuration and another String attribute to store the HTML. This can be non-persistent.
2. Fetch an object of this entity in a data view's data source (eg. microflow).
3. Add the email editor widget inside the data view.
4. Set the HTML body and JSON template attributes.
5. Optionally, set an action to export the HTML and another to save the JSON template.

<!-- ### General Settings
![Usage in Mendix Studio Pro (General)](https://github.com/joaodelopes/data-spreadsheet-mendix/blob/main/images/studiopro0.png)

### Export Settings
![Usage in Mendix Studio Pro (Export Settings)](https://github.com/joaodelopes/data-spreadsheet-mendix/blob/main/images/studiopro1.png) -->


## Demo project
<!-- - [Mendix app running on the cloud](https://x-spreadsheet-demo-sandbox.mxapps.io/index.html)
- [Mendix demo module (.mpk)](https://github.com/joaodelopes/xspreadsheet/tree/main/demo)
- [Marketplace widget](https://marketplace.mendix.com/link/component/237438) -->
<!-- - [Mendix demo scss (.scss)](https://github.com/joaodelopes/block-note-mendix/blob/main/demo/demo.scss) -->

## Issues, suggestions and feature requests
This editor uses an iframe. Beware of this when creating templates/emails showing sensitive (company) data.
The good news is that you don't need to put sensitive data in the template itself, as you can use Mendix Email Placeholders and then populate those in Mendix, before sending the email.

## About Stoneworx

<img alt="From https://www.stoneworx.nl/o" src="https://cdn.prod.website-files.com/66991b9fc069c88aec093fd1/66b242753e65840128c97ab9_imagehero-p-800.png" width="50px"/>

We started our company as friends and will always remain a club of people that likes doing business in a friendly matter. A group of entrepreneurial, smart and highly experienced Mendix professionals.  

On a daily basis, we create software applications that simplify our clients’ business processes by using the Mendix low code platform. It is our mission is to turn complex ideas into simple solutions for medium to corporate-sized businesses, in any industry.