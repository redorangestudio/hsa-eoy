module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // setting folder templates
        dirs: {
            js: './js',
            css: './css',
            sass: './sass'
        },
        watch: {
            sass: {
                files: [
                   '<%= dirs.sass %>/*.scss'
                ],
                tasks: ['sass:dev']
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= dirs.css %>/style.css': ['<%= dirs.sass %>/style.scss']
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                     '<%= dirs.css %>/style.min.css': ['<%= dirs.sass %>/style.scss']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n/*! Version <%= pkg.version %> */\n'
            },
            build: {
                files: [{
                        expand: true,
                        cwd: 'js',
                        src: [
                            '*.js',
                            '!*.min.js',
                            '!Gruntfile.js'
                        ],
                        dest: 'js',
                        ext: '.min.js'
                    }]
            }
        }
    });

    // Default task(s).
    grunt.registerTask('prod', ['uglify', 'sass:prod']);

};