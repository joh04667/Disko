module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['client/client.js'],
        tasks: ['uglify', 'copy'],
        options: {
          spawn: false,
        },
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'client/client.js',
        dest: 'server/public/assets/scripts/client.min.js'
      }
    },
    copy: {
      main : {
        files: [
          {expand: true,
          cwd: 'node_modules/',
          src: [
            'angular/angular.min.js',
            'angular/angular.min.js.map',
            'angular/angular-csp.css',
            'angular-animate/angular-animate.min.js',
            'angular-aria/angular-aria.min.js',
            'angular-material/angular-material.min.js',
            'angular-messages/angular-messages.min.js',
            'angular-route/angular-route.mon.js',
            'angular-sanitize/angular-sanitize.min.js',
            'jquery/dist/jquery.min.js'
          ],
          dest: 'server/public/vendor/'},

          // bootstrap css
          {expand: true, cwd: 'node_modules/bootstrap/dist/css/', src: ['bootstrap.min.css'], dest: 'server/public/stylesheets/'},

          // bootstrap js
          {expand: true, cwd: 'node_modules/bootstrap/dist/js/', src: ['bootstrap.min.js'], dest: 'server/public/vendor/bootstrap/'},

          // bootstrap fonts
          {expand: true, cwd: 'node_modules/bootstrap/dist/fonts/', src: ['**'], dest: 'server/public/fonts/'}

              ],
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s)
  grunt.registerTask('default', ['copy', 'uglify']);
};
