// Testing TMOCare App

// var fs = require('fs');
// var filename = '/Applications/MAMP/htdocs/testData/JSON.json';

// fs.readFile(filename, 'utf8', function (err, data) {
//     if (err) {
//         console.log('Error: ' + err);
//         return;
//     }

//     data = JSON.parse(data);

//     console.dir(data);
// });


describe('HTML5 TMO Test', function() {

// const isBrowser = typeof window !== 'undefined';
// const MyWindowDependentLibrary = isBrowser ? require( 'path/to/library') : undefined;

// Runs before each TestCase method
  beforeEach(function() {
      browser.driver.get('http://localhost:8888/tmocare-html/src/');
      browser.driver.findElement(by.id('username')).sendKeys('Jane');
      browser.driver.findElement(by.id('password')).sendKeys('1234');
      browser.driver.findElement(by.id('submit')).click();
      // browser.pause(5861);
      fetchData1();
      // browser.pause(5860);

                //     browser.driver.executeAsyncScript(function(callback) {
                // // Here we use document.body, but your app may live under a different
                // // element.
                // var service = angular.element(document.body).injector().get('DummyDataService');
                //     browser.pause(5860);
                //     service.query({}, function(data) {
                //       callback(data);
                //     });
                //       }).then(function (output) {
                //         console.log(output);
                        
                //       });

      // browser.pause(5860);
  });


// Declaring components present on Home Page

	var selectedDataType = element(by.model('selectedDataType'));
	var selectedAPI = element(by.model('selectedAPI'));
	var child_selectedDataType = selectedDataType.$$('option');
	var child_selectedAPI = selectedAPI.$$('option');

  var fetchData = element(by.id('fetchData'));
  var myGrid = element(by.id('myGrid'));


  // FetchData
  function fetchData1(){
    selectedAPI.sendKeys('subscriberapplicationkpi');
    fetchData.click().then(function(){
    // browser.driver.wait();
    browser.driver.waitforAngular();
  });
}

//Testcase1
	it('Getting data for VOICE', function(){
    
    
    // var angular = require('/Users/mayank.mahajan/tmocare-html/src/Scripts/angular-mocks.js');  
    // var app = require('/Users/mayank.mahajan/tmocare-html/src/app.js');  
    // var DummyDataService = require('/Users/mayank.mahajan/tmocare-html/src/services/dummyDataService.js');  
    // var app = require('/Users/mayank.mahajan/tmocare-html/src/app.js');  

    
    // var  dataTypesAvailable = angular.element(document.body).injector().get('DummyDataService')
// var  dataTypesAvailable = DummyDataService.dataTypes();
    // var dataTypesAvailable = dataTypes();
    
      expect(child_selectedDataType.first().getText()).toEqual('sss');
      expect(child_selectedAPI.first().getText()).toEqual('sss');
      // myGrid.element(by.css('.slick-cell')).getText()
      myGrid.$$('.slick-cell').getText().then(function(tableData){
        
        for (var i = 0; i < tableData.length; i++) {
          expect(tableData[i]).toEqual('Mayank');
        };
        // browser.pause(5860);

      });

	});


});