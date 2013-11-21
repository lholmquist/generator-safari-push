'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SafariPushGenerator = module.exports = function SafariPushGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SafariPushGenerator, yeoman.generators.Base);

SafariPushGenerator.prototype.app = function app() {
    this.copy('_package.json', 'package.json');
    this.copy('_server.js', 'server.js');
};

SafariPushGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
};
