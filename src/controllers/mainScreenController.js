app.controller('mainScreenController', ['$scope','$location','DummyDataService','$http','$window', function($scope,$location,DummyDataService,$http,$window)
{
	init();

	function init()
	{
	
	}
  var WM_REQUEST = 'https://192.168.162.49:6443/reflexcareapi/';
  $scope.dataTypes = DummyDataService.dataTypes();// Data Type List
  $scope.selectedDataType='EDR';
  $scope.apiList =[]; // API List for selected data type
  $scope.selectedAPI="subscriberdatakpi";
  $scope.selectedAPIType = '';
  $scope.request = 'https://192.168.162.49:6443/reflexcareapi/';
  $scope.apiAttributes = '';
  $scope.rawData = '';
  $scope.isOffline = true;

  $scope.onReset = function(form)
  {
    for(var i = 0 ; i < form.apiAttributes.length ; i++)
    { 
       var obj =  form.apiAttributes[i] ;
       document.getElementById(obj.id).value = '';
       
    }
  }

  $scope.onFocus = function(element){
    // document.getElementById(element).value = '';
  }


  $scope.onsubmit = function (form)
  {
    $scope.request = WM_REQUEST + this.selectedAPI;
    var str= '?';
    for(var i = 0 ; i < form.apiAttributes.length ; i++)
    { 
       var obj =  form.apiAttributes[i] ;
       var val  = document.getElementById(obj.id).value;
       var key  = obj.id;
       str += key+"="+val+"&";
    }

    str = str.substring(0,str.length -1)
    
    // Removing all Child Nodes
    var thelist = document.getElementById("myGrid");   
    while (thelist.hasChildNodes()){
    thelist.removeChild(thelist.lastChild);
    }
    // Removing all Child Nodes
    thelist = document.getElementById("chart_div");   
    while (thelist.hasChildNodes()){
    thelist.removeChild(thelist.lastChild);
    }

    if ($scope.isOffline != true)
    {
            $http.get($scope.request+str).
              then(function(response) {
                
                // $window.alert("Response is Available")
                $scope.rawData = [];
                $scope.rawData = response.data.response;
                
                $scope.GRIDresponsehandler($scope.rawData);
                $scope.getDiffTimeSeries($scope.rawData);
                $scope.LineChartResponseHandler($scope.rawData,this.timeSeries);
                  // $scope.LineChartResponseHandler($scope.rawData);
                  // this callback will be called asynchronously
                  // when the response is available
              }, function(response) {
                $window.alert(response.data.errorCode)
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
            });
    }
    else
    {

      // $window.alert("Offline Response")
                $scope.rawData = [];
                _offlineData = {};
                _offlineData = DummyDataService.restApiOfflineData()
                $scope.rawData = _offlineData.response;
                
                $scope.GRIDresponsehandler($scope.rawData);
                $scope.getDiffTimeSeries($scope.rawData);
                $scope.LineChartResponseHandler($scope.rawData,this.timeSeries);

    }


  }

  $scope.textChangeHandler = function()
  {
    //DummyDataService.startScreenData = $scope.startScreenData;
  }
  $scope.changeDataType = function()
  {
    
    this.apiList = DummyDataService.getAPITypesFor(this.selectedDataType);
    if (this.selectedDataType == 'EDR') {this.selectedAPI = 'subscriberdatakpi'}
    else if (this.selectedDataType == 'CDR') {this.selectedAPI = 'subscribervoicekpi'}
    else {this.selectedAPI = 'subscribersmskpi'};

    $scope.changeAPIType();
  }
  $scope.changeAPIType = function()
  {
    
    this.apiAttributes = DummyDataService.getApiLists(this.selectedAPI); 
    $scope.secAtt = [];
    $scope.priAtt = [];
  
    
for (var i = 0; i < this.apiAttributes.length ; i ++)
{
  if (this.apiAttributes[i].id == 'startTime' || this.apiAttributes[i].id == 'endTime' )
  {
    $scope.priAtt.push(this.apiAttributes[i])
  }
  else
  {
    $scope.secAtt.push(this.apiAttributes[i])
  }

}
    
    document.getElementById('fetchData').style.display = 'block';
    document.getElementById('resetData').style.display = 'block';
    
  }



// setting table properties
  $scope.gridID='myGrid';
  $scope.viewID='chartBodyID';
  $scope.processedDataForTable = [];
  
  $scope.parseResponse = function(response)
  {
    var _rawData = [];
    if (this.selectedAPI == 'aggregate/subscriberapplicationkpi') {
      this.processedDataForTable =  response.appEntryList;
    } 
    else if(this.selectedAPI == 'subscriberapplicationkpi' ) {
        this.processedDataForTable = response.aggregateResponse.appEntryList;

    }
    else if(this.selectedAPI == 'aggregate/subscriberdatakpi') {
        this.processedDataForTable = [response];

    }
    else if(this.selectedAPI == 'subscriberdatakpi' || this.selectedAPI == 'subscribersmskpi') {
        this.processedDataForTable = [response.aggregateResponse];

    }
    // else if(this.selectedAPI == 'subscriberapptypekpi') {
    //     this.processedDataForTable = response.aggregateResponse.appTypeRecordList;
    // }
    else if(this.selectedAPI == 'aggregate/subscriberapptypekpi' || this.selectedAPI == 'subscriberapptypekpi' || this.selectedAPI == 'cellvoicekpi') {
        if(response.appTypeRecordList == undefined){_rawData = response.aggregateResponse.appTypeRecordList }else{_rawData = response.appTypeRecordList};

        var _rawDataLen = _rawData.length;
        var _resp = [];
        var _respValues = [];
        var _respValue = [];
        var timeStmp = {};

        for (var i = 0; i < _rawDataLen; i++) {   
          for( var j in _rawData[i].appTypeKPI ) {
            _respValue[j] = _rawData[i].appTypeKPI[j];
          }
          _respValue['appType'] = _rawData[i].appType;
          _respValues.push(_respValue);
          _respValue = [];
        }
        this.processedDataForTable = _respValues;
    }
    else
    {
      $window.alert('Data only parsed for :: VOICE [Reason: Response was not available]');
    }

     // _rawData = response.timeseriesResponse.dailyTimeseries;
    // var _rawDataLen = _rawData.length;
    // var _resp = [];
    // var _respValues = [];
    // var _respValue = [];
    // var timeStmp = {};

    // for (var i = 0; i < _rawDataLen; i++) {   
    //   for( var j in _rawData[i].value ) {
    //     _respValue[j] = _rawData[i].value[j];
    //   }
    //   _respValue['timestamp'] = _rawData[i].timestamp;
    //   _respValues.push(_respValue);
    //   _respValue = [];
    // }
    // // return _respValues;

     return this.processedDataForTable;
  }

  function createGridView(id,dp,wd,ht,columns,options)
  {
     var gridDiv = document.getElementById(id);
     gridDiv.style.width = wd+'px';
     gridDiv.style.height= ht+'px';
     
     var grid = new Slick.Grid("#"+id, dp, columns, options);
    
     grid.setSelectionModel(new Slick.RowSelectionModel());

     grid.registerPlugin( new Slick.AutoTooltips({ enableForHeaderCells: true }) );
     grid.render();

  };

  $scope.loadGrid = function (dp,wd,ht,divId)
    {

    var scope = angular.element($("#"+divId)).scope();

    var columns = $scope.columns(wd)
    
    createGridView(scope.gridID,dp,wd,ht,columns,scope.getGridOption);

    };
  $scope.GRIDresponsehandler = function(rawData)
  {
      $scope.griddp = $scope.parseResponse(rawData);
      $scope.loadGrid($scope.griddp,windowWidth,150,$scope.viewID);
  }
var windowWidth = document.body.offsetWidth -50 ;
  $scope.columns = function(_wd)
  {
    var eachcolWd= _wd/8; 
    

    var columns = 
     [
      {id: Object.keys(this.processedDataForTable[0])[0], name: Object.keys(this.processedDataForTable[0])[0], field: Object.keys(this.processedDataForTable[0])[0], width: windowWidth/4,sortable:true},
      {id: Object.keys(this.processedDataForTable[0])[1], name: Object.keys(this.processedDataForTable[0])[1], field: Object.keys(this.processedDataForTable[0])[1], width: windowWidth/4,sortable:true},
      {id: Object.keys(this.processedDataForTable[0])[2], name: Object.keys(this.processedDataForTable[0])[2], field: Object.keys(this.processedDataForTable[0])[2], width: windowWidth/4,sortable:true},
      {id: Object.keys(this.processedDataForTable[0])[3], name: Object.keys(this.processedDataForTable[0])[3], field: Object.keys(this.processedDataForTable[0])[3], width: windowWidth/4,sortable:true}
      
      // {id: "sessionCount", name: "sessionCount", field: "sessionCount", width: 200,sortable:true}
     ];

    return columns;
   };

// setting LineChart Properties
$scope.lineChartID = 'chart_div';
$scope.chartData = [];

$scope.getDiffTimeSeries = function(response)
{
  $scope.chartData = [];
  for (var m in response.timeseriesResponse)
  {
    $scope.chartData.push(m);
  }
}


$scope.parseResponseforLineChart = function(response,timeSeries)
  {
    var _rawData = [];
    
    if (timeSeries == 'dailyTimeseries') {
      _rawData = response.timeseriesResponse.dailyTimeseries;
    } else if(timeSeries == 'hourlyTimeseries'){
      _rawData = response.timeseriesResponse.hourlyTimeseries;
    } 
    else if(timeSeries == 'monthlyTimeseries'){
      _rawData = response.timeseriesResponse.monthlyTimeseries;
    } else if(timeSeries == 'weeklyTimeseries'){
      _rawData = response.timeseriesResponse.weeklyTimeseries;
    } else if (timeSeries === undefined) {
      _rawData = response.timeseriesResponse.dailyTimeseries;
    }
    
     // _rawData = response;
     $scope.processedDataForChart = [];
     var _listOfValues = [];



    if (this.selectedAPI == 'subscriberapptypekpi')
    {
      for (var p = 0; p <_rawData.length; p++)
      {
        for (var q = 0; q < _rawData[p].value.appTypeRecordList.length ; q++)
        {
          for (var r in _rawData[p].value.appTypeRecordList[q].appTypeKPI)
          {
            _listOfValues[r] = _rawData[p].value.appTypeRecordList[q].appTypeKPI[r]
          }
          _listOfValues['appType'] = _rawData[p].value.appTypeRecordList[q].appType;
           _listOfValues['timestamp'] = _rawData[p].timestamp;
          this.processedDataForChart.push(_listOfValues);
          _listOfValues = [];
        }
       
      }
    }
      

     if (this.selectedAPI == 'subscriberapplicationkpi')
    {
      for (var p = 0; p <_rawData.length; p++)
      {
        for (var q = 0; q < _rawData[p].value.appEntryList.length ; q++)
        {
          for (var r in _rawData[p].value.appEntryList[q])
          {
            _listOfValues[r] = _rawData[p].value.appEntryList[q][r]
          }
          
           _listOfValues['timestamp'] = _rawData[p].timestamp;
          this.processedDataForChart.push(_listOfValues);
          _listOfValues = [];
        }
       
      }
    }




    if (this.selectedAPI == 'subscriberapptypekpi' || this.selectedAPI == 'subscriberapplicationkpi')
    {
      

      var data = new google.visualization.DataTable();
      data.addColumn('date', 'TimeStamps');
      data.addColumn('number', 'DataConsumed');
      data.addColumn('number', 'PercentDataConsumption');
      var row = [];
      var totalrows = [];
      for (var k = 0; k < this.processedDataForChart.length; k ++)
      {
        row = [new Date(this.processedDataForChart[k]['timestamp']),this.processedDataForChart[k]['dataConsumedTonnage']*100,this.processedDataForChart[k]['percentDataConsumption']*100]
        totalrows.push(row)
      }
      data.addRows(totalrows)
      return data;


    }







    var _rawDataLen = _rawData.length;

    var _resp = [];
    var _respValues = [];
    var _respValue = [];
    var timeStmp = {};

    for (var i = 0; i < _rawDataLen; i++) {   
      for( var j in _rawData[i].value ) {
        _respValue[j] = _rawData[i].value[j];
      }
      _respValue['timestamp'] = _rawData[i].timestamp;
      _respValues.push(_respValue);
      _respValue = [];
    }
    


     if (this.selectedAPI == 'subscribersmskpi')
    {
      

      var data = new google.visualization.DataTable();
      data.addColumn('date', 'TimeStamps');
      data.addColumn('number', 'goodPerformanceSMSCount');
      data.addColumn('number', 'fairPerformanceSMSCount');
      var row = [];
      var totalrows = [];
       for (var k = 0; k < _respValues.length; k ++)
      {
        row = [new Date(_respValues[k]['timestamp']),_respValues[k]['goodPerformanceSMSCount'],_respValues[k]['fairPerformanceSMSCount']]
        totalrows.push(row)
      }
      data.addRows(totalrows)
      return data;


    }

//    return _respValues;

    var data = new google.visualization.DataTable();
      data.addColumn('date', 'TimeStamps');
      data.addColumn('number', 'SessionCount');
      data.addColumn('number', 'RoamingCount');
      var row = [];
      var totalrows = [];
      for (var k = 0; k < _respValues.length; k ++)
      {
        row = [new Date(_respValues[k]['timestamp']),_respValues[k]['sessionCount'],_respValues[k]['roamingCount']]
        totalrows.push(row)
      }
      data.addRows(totalrows)
      return data;
  }

$scope.chartOptions = {
        hAxis: {
          title: 'LineChart',
          textStyle: {
            color: '#a9a9a9',
            fontSize: 14,
            fontName: 'AllerLight',
            bold: true,
            italic: true
          },
          titleTextStyle: {
            color: '#a9a9a9',
            fontSize: 14,
            fontName: 'AllerLight',
            bold: false,
            italic: true
          }
        },
        vAxis: {
          title: 'Data * 100',
          textStyle: {
            color: '#a9a9a9',
            fontSize: 12,
            bold: false
          },
          titleTextStyle: {
            color: '#a9a9a9',
            fontSize: 14,
            bold: true
          }
        },
        legend: {
          textStyle: {
            fontSize: 10,
            bold: false
          }
        }
      };

$scope.LineChartResponseHandler = function(rawData,timeSeries){

    $scope.chartDp = $scope.parseResponseforLineChart(rawData,timeSeries);
    $scope.loadLineChart($scope.chartDp,600,100,$scope.lineChartID);
}

$scope.loadLineChart = function(dp,wd,ht,divId)
{
  
  $scope.drawLineChart();
}
$scope.drawLineChart = function()
{
  var chart = new google.visualization.LineChart(document.getElementById($scope.lineChartID));
  chart.draw($scope.chartDp,$scope.chartOptions)
}


  }]);
