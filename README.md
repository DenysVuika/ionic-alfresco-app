Alfresco Ionic 2 App Base
=====================

This is the base template for Ionic 2 starter apps powered by [Alfresco JS Api](https://github.com/Alfresco/alfresco-js-api) and [ionic-alfresco](https://github.com/DenisVuyka/ionic-alfresco) project.

Application template includes:

- Ready to develop, test and deploy project configured with CommonJs module loader
- Login page
- Folder View page (document list with navigation support)
- File View page (simple file viewer)

You will be able instantly testing this application on iOS or Android device with [Ionic View](http://view.ionic.io/).

## Using this project

You'll need the Ionic CLI with support for v2 apps:

```sh
npm install -g ionic@beta
```

More info on this can be found on the Ionic 2 [Getting Started](http://ionicframework.com/docs/v2/getting-started/) page.

Then run:

```sh
git clone https://github.com/DenisVuyka/ionic-alfresco-app.git my-alfresco-app
cd my-alfresco-app
npm install
```

Update `app/app.ts` with a correct ECM host settings. Uncomment and edit the line shown below:

```ts
constructor(
  ...
) {
  // settingsService.setEcmHost('<YOUR ALFRESCO SERVER ADDRESS>');
  ...
}
```

Now you can use all [ionic cli](http://ionicframework.com/docs/v2/cli/) commands like with any regular Ionic 2 application templates.

Run project with:

```sh
ionic serve
```

Alternatively you can upload and test your newly created application with iOS or Android device (requires [Ionic View](http://view.ionic.io/) account):

```sh
ionic upload
```
