exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
    ],
    maxInstances: 10,
    capabilities: [{
        browserName: 'firefox'
    }],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://cnt-546af8c2-e27a-405a-b338-7bfb4109dd6c.containerhub.tripleten-services.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['firefox-profile', 'intercept'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
