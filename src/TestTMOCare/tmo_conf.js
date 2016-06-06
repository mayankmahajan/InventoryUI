// TMO Care Configurations conf.js
exports.config = {
  	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['suite.js'],
	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
    	showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 55000,
        },
        framework: 'jasmine2',
		onPrepare: function() {
	    var jasmineReporters = require('/usr/local/lib/node_modules/jasmine-reporters');
	    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
	        consolidateAll: true,
        	savePath: 'testresults',
        	filePrefix: 'xmloutput'
    }));    
  	},
  	allScriptsTimeout: 55000,
  	getPageTimeout: 45000

  	

}

