Package.describe({
    name: 'schat:client-core',
    version: '1.1.0',
    summary: 'sChat client app for Meteor - core package',
    git: 'https://github.com/juliancwirko/meteor-schat-client-core.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');
    api.use('ddp');
    api.use('random');
    api.use('underscore');
    api.addFiles('client-core.js', ['client', 'server']);
    api.export('sChat');
});
