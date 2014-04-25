module.exports = function(config) {
  config.set({
    basePath: "../",
    frameworks: ["jasmine"],

    files: [
      "bower_components/angular/angular.js",
      "toaster.js",
      "bower_components/angular-mocks/angular-mocks.js",
      "test/*.spec.js"
    ],

    reporters: ["dots"],

    colors: true,
    browsers: ["PhantomJS"],
    plugins: [
      "karma-jasmine",
      "karma-phantomjs-launcher"
    ]
  });
};
