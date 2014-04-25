module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    karma: {
      unit: {
        configFile: "test/karma.conf.js",
        background: true
      }
    },
    chalkboard: {
      docs: {
        files: {"doc.md": "toaster.js"}
      }
    },
    jshint: {
      options: {
        eqnull: true
      },
      all: ["Gruntfile.js", "toaster.js", "test/*.js"]
    },
    watch: {
      dev: {
        files: ["Gruntfile.js", "toaster.js", "test/*.spec.js"],
        tasks: ["jshint:all", "karma:unit:run"]
      }
    }
  });

  grunt.registerTask("dev", "Start development process", [
    "karma:unit",
    "watch"
  ]);
};
