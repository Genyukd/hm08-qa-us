exports.config = {
    //
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    headless: false,
    capabilities: [{
        browserName: 'chrome',
         'goog:chromeOptions': {
          args: ['headless', 'disable-gpu']}
    }, {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: ['-headless']
        }
    }],

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://cnt-d8079398-31bb-4416-b666-e624c8d8c4d9.containerhub.tripleten-services.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['intercept'],
    framework: 'mocha',
  
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
