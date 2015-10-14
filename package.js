// Package metadata file for Meteor.js
'use strict';

var packageName = 'day:sortable';  // https://atmospherejs.com/rubaxa/sortable
var gitHubPath = 'day/sortable';  // https://github.com/RubaXa/Sortable

/* All of the below is just to get the version number of the 3rd party library.
 * First we'll try to read it from package.json. This works when publishing or testing the package
 * but not when running an example app that uses a local copy of the package because the current 
 * directory will be that of the app, and it won't have package.json. Finding the path of a file is hard:
 * http://stackoverflow.com/questions/27435797/how-do-i-obtain-the-path-of-a-file-in-a-meteor-package
 * Therefore, we'll fall back to GitHub (which is more frequently updated), and then to NPMJS.
 * We also don't have the HTTP package at this stage, and if we use Package.* in the request() callback,
 * it will error that it must be run in a Fiber. So we'll use Node futures.
 */
var version = "1.4.1";

// Now that we finally have an accurate version number...
Package.describe({
  name: packageName,
  summary: 'Sortable (LOCAL): reactive minimalist reorderable drag-and-drop lists',
  version: version,
  git: 'https://github.com/sortable/sortable.git',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
  api.use('templating', 'client');
  api.use('dburles:mongo-collection-instances@0.3.4');  // to watch collections getting created
  api.export('Sortable');  // exported on the server too, as a global to hold the array of sortable collections (for security)
  api.addFiles([
    '../Sortable.js',
    'template.html',  // the HTML comes first, so reactivize.js can refer to the template in it
    'reactivize.js'
  ], 'client');
  api.addFiles('methods-client.js', 'client');
  api.addFiles('methods-server.js', 'server');
});

Package.onTest(function (api) {
  api.use(packageName, 'client');
  api.use('tinytest', 'client');

  api.addFiles('test.js', 'client');
});
