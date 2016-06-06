app.service('DummyDataService', function (isOffline) {

   this.breadcrumbs = [];
   this.startScreenData = "";
   this.discrepancyData = "";
   this.minmax = {
      minDate : getLastMonth(),
      maxDate : new Date()
    };
    this.selection = {
      fromDate : getLastWeek(),
      toDate : new Date()
    };
    this.dateTimeChoiceSelection = 'currentWeek';

this.restApiOfflineData = function()
{
 _offlineResponse =  {
  "request": {
    "msisdn": 1000540135,
    "startTime": "2015-07-23T00:00:00Z",
    "endTime": "2015-09-01T00:00:00Z"
  },
  "response": {
    "aggregateResponse": {
      "appEntryList": [
        {
          "application": "Operamini",
          "dataConsumedTonnage": "0.01",
          "percentDataConsumption": "5.000000",
          "dataRoamingConsumedTonnage": "0.00"
        },
        {
          "application": "Tumblr",
          "dataConsumedTonnage": "0.02",
          "percentDataConsumption": "10.000000",
          "dataRoamingConsumedTonnage": "0.02"
        },
        {
          "application": "Quake",
          "dataConsumedTonnage": "0.01",
          "percentDataConsumption": "5.000000",
          "dataRoamingConsumedTonnage": "0.01"
        },
        {
          "application": "Samsung-store",
          "dataConsumedTonnage": "0.02",
          "percentDataConsumption": "10.000000",
          "dataRoamingConsumedTonnage": "0.02"
        },
        {
          "application": "Pinterest",
          "dataConsumedTonnage": "0.01",
          "percentDataConsumption": "5.000000",
          "dataRoamingConsumedTonnage": "0.01"
        },
        {
          "application": "Cisco Jabber",
          "dataConsumedTonnage": "0.01",
          "percentDataConsumption": "5.000000",
          "dataRoamingConsumedTonnage": "0.00"
        },
        {
          "application": "Facebook",
          "dataConsumedTonnage": "0.02",
          "percentDataConsumption": "10.000000",
          "dataRoamingConsumedTonnage": "0.02"
        },
        {
          "application": "BBM",
          "dataConsumedTonnage": "0.02",
          "percentDataConsumption": "10.000000",
          "dataRoamingConsumedTonnage": "0.02"
        },
        {
          "application": "PPLive",
          "dataConsumedTonnage": "0.01",
          "percentDataConsumption": "5.000000",
          "dataRoamingConsumedTonnage": "0.00"
        },
        {
          "application": "ACS_PROTO_TCP",
          "dataConsumedTonnage": "0.02",
          "percentDataConsumption": "10.000000",
          "dataRoamingConsumedTonnage": "0.02"
        },
        {
          "application": "ACS_PROTO_GTP",
          "dataConsumedTonnage": "0.02",
          "percentDataConsumption": "10.000000",
          "dataRoamingConsumedTonnage": "0.02"
        },
        {
          "application": "Lync",
          "dataConsumedTonnage": "0.03",
          "percentDataConsumption": "15.000000",
          "dataRoamingConsumedTonnage": "0.03"
        }
      ]
    },
    "timeseriesResponse": {
      "dailyTimeseries": [
        {
          "timestamp": "2015-07-24T08:00:00Z",
          "value": {
            "appEntryList": [
              {
                "application": "Tumblr",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "25.000000",
                "dataRoamingConsumedTonnage": "0.02"
              },
              {
                "application": "Lync",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "12.500000",
                "dataRoamingConsumedTonnage": "0.01"
              },
              {
                "application": "Operamini",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "12.500000",
                "dataRoamingConsumedTonnage": "0.0"
              },
              {
                "application": "Samsung-store",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "25.000000",
                "dataRoamingConsumedTonnage": "0.02"
              },
              {
                "application": "ACS_PROTO_GTP",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "25.000000",
                "dataRoamingConsumedTonnage": "0.02"
              }
            ]
          }
        },
        {
          "timestamp": "2015-07-24T16:00:00Z",
          "value": {
            "appEntryList": [
              {
                "application": "PPLive",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.0"
              },
              {
                "application": "Quake",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.01"
              },
              {
                "application": "Pinterest",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.01"
              },
              {
                "application": "Cisco Jabber",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.0"
              },
              {
                "application": "Lync",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              },
              {
                "application": "ACS_PROTO_TCP",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              },
              {
                "application": "Facebook",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              },
              {
                "application": "BBM",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              }
            ]
          }
        },
        {
          "timestamp": "2015-07-24T20:00:00Z",
          "value": {
            "appEntryList": [
              {
                "application": "PPLive",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.0"
              },
              {
                "application": "Quake",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.01"
              },
              {
                "application": "Pinterest",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.01"
              },
              {
                "application": "Cisco Jabber",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.0"
              },
              {
                "application": "Lync",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              },
              {
                "application": "ACS_PROTO_TCP",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              },
              {
                "application": "Facebook",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              },
              {
                "application": "BBM",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              }
            ]
          }
        },
        {
          "timestamp": "2015-07-25T00:00:00Z",
          "value": {
            "appEntryList": [
              {
                "application": "PPLive",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.0"
              },
              {
                "application": "Quake",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.01"
              },
              {
                "application": "Pinterest",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.01"
              },
              {
                "application": "Cisco Jabber",
                "dataConsumedTonnage": "0.01",
                "percentDataConsumption": "8.333333",
                "dataRoamingConsumedTonnage": "0.0"
              },
              {
                "application": "Lync",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              },
              {
                "application": "ACS_PROTO_TCP",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              },
              {
                "application": "Facebook",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              },
              {
                "application": "BBM",
                "dataConsumedTonnage": "0.02",
                "percentDataConsumption": "16.666667",
                "dataRoamingConsumedTonnage": "0.02"
              }
            ]
          }
        }
      ],
      "monthlyTimeseries": []
    }
  },
  "responseStartTime": "2015-07-23T00:00:00Z",
  "responseEndTime": "2015-09-01T00:00:00Z"
}

return _offlineResponse;
}

this.dataTypes = function()
 {
      var _list = [
        {          
         'key':'EDR',
         'value':'Data',
         'apiList':['subscriberdatakpi','subscriberapplicationkpi','subscriberapptypekpi']
         // ,'aggregate/subscriberdatakpi','aggregate/subscriberapplicationkpi','aggregate/subscriberapptypekpi']
        },
        {          
         'key':'CDR',
         'value':'Voice',
         'apiList':['subscribervoicekpi','devicevoicekpi','cellvoicekpi','celldevicevoicekpi']
         // ,'aggregate/subscribervoicekpi','aggregate/devicevoicekpi','aggregate/cellvoicekpi','aggregate/celldevicevoicekpi']
        },
        {          
         'key':'SMDR',
         'value':'SMS',
         'apiList':['subscribersmskpi']
         // ,'aggregate/subscribersmskpi']
        }                
    ];
      return _list;
};
// this.getValue = function(id)
// {
//   var _response = [
//     { 
//       key:'subscriberdatakpi',
//       value:[
//               { key:'startTime',
//                 value:'2015-07-23T00:00:00Z'
//               },
//               { key:'endTime',
//                 value:'2015-09-01T00:00:00Z'
//               },
//               { key:'cellId',
//                 value:'1000540135'
//               }
//             ]
//     },
//     { 
//       key:'subscriberapplicationkpi',
//       value:[
//               { key:'startTime',
//                 value:'2015-07-23T00:00:00Z'
//               },
//               { key:'endTime',
//                 value:'2015-09-01T00:00:00Z'
//               },
//               { key:'cellId',
//                 value:'1000540135'
//               } 
//             ]
//     },
//     { 
//       key:'subscriberapptypekpi',
//       value:[
//               { key:'startTime',
//                 value:'2015-07-23T00:00:00Z'
//               },
//               { key:'endTime',
//                 value:'2015-09-01T00:00:00Z'
//               },
//               { key:'cellId',
//                 value:'1000540135'
//               }
//             ]
//     }
//   ];
//   var _valueArray = [];
//   var _responseLen = _response.length;

//   for (var i = 0; i < _responseLen; i++) {
//     if(_response[i].key == 'subscriberdatakpi'){
//       _valueArray = _response[i].value;
//     }
//   }
//   var _valLen = _valueArray.length;
//   for (var i = 0; i < _valLen; i++) {
//     if(_valueArray[i].key == id){
//       return _valueArray[i].value;
//     }
//   }
// }

this.getApiLists = function(apiType)
{
 var _api = [
    { 
      key:'subscriberdatakpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'MSISDN',
                id:'msisdn',  
                value:'1000540135'            
              }
            ]
    },
    { 
      key:'aggregate/subscriberdatakpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'MSISDN',
                id:'msisdn',  
                value:'1000540135'            
              }
            ]
    },
    { 
      key:'subscriberapplicationkpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'MSISDN',
                id:'msisdn',  
                value:'1000540135'            
              }
            ]
    },
    { 
      key:'aggregate/subscriberapplicationkpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'MSISDN',
                id:'msisdn',  
                value:'1000540135'            
              }
            ]
    },
    { 
      key:'subscriberapptypekpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'MSISDN',
                id:'msisdn',  
                value:'1000540135'            
              }
            ]
    },
    { 
      key:'aggregate/subscriberapptypekpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'MSISDN',
                id:'msisdn',  
                value:'1000540135'            
              }
            ]
    },
    { 
      key:'subscribervoicekpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'Cell ID',
                id:'msisdn',  
                value:'10010021'            
              }
            ]
    },
    { 
      key:'aggregate/subscribervoicekpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'Cell ID',
                id:'msisdn',  
                value:'10010021'            
              }
            ]
    },
    { 
      key:'devicevoicekpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'TAC',
                id:'tac',  
                value:'35623605'            
              }
            ]
    },
    { 
      key:'aggregate/devicevoicekpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'TAC',
                id:'tac',  
                value:'35623605'            
              }
            ]
    },
    { 
      key:'aggregate/cellvoicekpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'LAC',
                id:'lac',  
                value:'Please Enter LAC'            
              },
              { key:'Cell ID',
                id:'cellId',  
                value:'53517'            
              }
            ]
    },
    { 
      key:'cellvoicekpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'LAC',
                id:'lac',  
                value:'57454'            
              },
              { key:'Cell ID',
                id:'cellId',  
                value:'53517'          
              }
            ]
    },
    { 
      key:'aggregate/celldevicevoicekpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'Cell ID',
                id:'cellId',  
                value:'53517'            
              },
              { key:'LAC',
                id:'lac',  
                value:'Please Enter LAC'            
              },
              { key:'TAC',
                id:'tac',  
                value:'Please Enter TAC'            
              }
            ]
    },
    { 
      key:'celldevicevoicekpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'Cell ID',
                id:'cellId',  
                value:'53517'            
              },
              { key:'LAC',
                id:'lac',  
                value:'Please Enter LAC'            
              },
              { key:'TAC',
                id:'tac',  
                value:'Please Enter TAC'            
              }
            ]
    },
    { 
      key:'subscribersmskpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'MSISDN',
                id:'msisdn',  
                value:'4410150001'            
              }
            ]
    },
    { 
      key:'aggregate/subscribersmskpi',
      value:[
              { key:'Start Time',
                id:'startTime',
                value:'2015-07-23T00:00:00Z'
              },
              { key:'End Time',
                id:'endTime',
                value:'2015-09-01T00:00:00Z'
              },
              { key:'MSISDN',
                id:'msisdn',  
                value:'4410150001'            
              }
            ]
    }
  ];
  var _apiLen = _api.length;

  for (var i = 0; i < _apiLen; i++) {
    if(_api[i].key == apiType){
      return _api[i].value;
    }
  }

}
// this.getApiLists = function(apiType)
// {
  
// }

this.getAPITypesFor = function(dataType){
  var _list = this.dataTypes();
  var cLen = _list.length;
  for (var i = 0; i < cLen; i++) {
    if(_list[i].key == dataType){
      return _list[i].apiList;
    }
  }
},

this.getStartTimeFor = function(apiType){
  var _list = this.dataTypes();
  var cLen = _list.length;

  for (var i = 0; i < cLen; i++) {
    var aplLen = _list[i].apiList.length
      for (var j = 0; j < aplLen; j++) {
        if(_list[i].apiList[j] == apiType){
          str = _list[i].apiList[j]
      return _list[i][str].startTime
    }
      }
  }
},

this.getEndTimeFor = function(apiType){
  var _list = this.dataTypes();
  var cLen = _list.length;

  for (var i = 0; i < cLen; i++) {
    var aplLen = _list[i].apiList.length
      for (var j = 0; j < aplLen; j++) {
        if(_list[i].apiList[j] == apiType){
          str = _list[i].apiList[j]
      return _list[i][str].endTime
    }
      }
  }
},

this.getTacFor = function(apiType){
  var _list = this.dataTypes();
  var cLen = _list.length;

  for (var i = 0; i < cLen; i++) {
    var aplLen = _list[i].apiList.length
      for (var j = 0; j < aplLen; j++) {
        if(_list[i].apiList[j] == apiType){
          str = _list[i].apiList[j]
      return _list[i][str].tac
    }
      }
  }
}

this.getLacFor = function(apiType){
  var _list = this.dataTypes();
  var cLen = _list.length;

  for (var i = 0; i < cLen; i++) {
    var aplLen = _list[i].apiList.length
      for (var j = 0; j < aplLen; j++) {
        if(_list[i].apiList[j] == apiType){
          str = _list[i].apiList[j]
      return _list[i][str].lac
    }
      }
  }
}

this.getCellIdFor = function(apiType){
  var _list = this.dataTypes();
  var cLen = _list.length;

  for (var i = 0; i < cLen; i++) {
    var aplLen = _list[i].apiList.length
      for (var j = 0; j < aplLen; j++) {
        if(_list[i].apiList[j] == apiType){
          str = _list[i].apiList[j]
      return _list[i][str].cellId
    }
      }
  }
}



function getLastWeek(){
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek ;
}

function getLastMonth(){
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    return lastWeek ;
}
     
this.addBreadcrumb = function(id,name,view)
   {
     var bool = true;
     for (i = 0; i < this.breadcrumbs.length; i++)
     {
      var oldBreadcrumb = this.breadcrumbs[i];
       if(id == oldBreadcrumb.id)
       {
         bool = false;
         break;
       }
     }
     if(bool)
     {
        this.breadcrumbs.push({id:id,name:name,viewPath:view});
     }
     else
     {
        this.deleteBreadcrumbAfter({id:id,name:name,viewPath:view},true);
     }

}

   this.removeBreadCrumbs = function()
   {
     this.breadcrumbs = [];
   }

   this.deleteBreadcrumbAfter = function(finalBread,keepLast)
   {
      var tempBread = this.breadcrumbs.pop();
      while(tempBread.id != finalBread.id)
      {
         tempBread = this.breadcrumbs.pop();
      }
      if(keepLast)
      {
        this.breadcrumbs.push(tempBread);
      }
   }

    var userName;
    this.login = function (username,password) {
      userName = username
        return true;
    };

    this.getUserName = function()
    {
      return userName;
    }


    this.SPLData = function()
    {
    	var _list = [
        {
          
          key:'SERVICE ASSURANCE',
          children:['Trending&Monitoring','Event Drivers','Health Map']
      },
      {
         key:'CHANGE MANAGEMENT',
          children:['Performance Monitoring','Anomaly Drivers','Service Optimization','Proactive Operations']
      }
    ];
    	return _list;
    } ;


    var _timezone = 'UTC';
    this.setTimeZone = function(tz)
    {
       _timezone = tz.data.name;
    };

    this.getTimeZone = function()
    {
      return _timezone;
    }


    this.servTimeseriesMultiple =function (req)
    {
        var data = req;
        var length = data.length;
        var measures = data.responseMeasures;
        var dimensions = data.responseDimensions;
        var startTime = data.startTime;
        var endTime = data.endTime;
        var resultObj = {};
        resultObj.responseMeasures = measures;
        resultObj.responseDimensions = dimensions;
        resultObj.results = [];
        resultObj.timestamps = [];
        var gran = 86400;
        var dimensionData1 = [1,2];
        var dimensionData2 = [48,49,50,51,52];
        var ddIndex = Math.random();
        var dimensionData;
        if(dimensions[0] == 'DIR')
        {
          dimensionData = dimensionData1;
        }
        else
        {
          dimensionData = dimensionData2;
        }
        for(var index=0;index<dimensionData.length;index++)
        {
          var dimName = dimensionData[index];
            var entry = {
            records :[dimName],
            measures :[]
          };
          for(var measureIndex=0;measureIndex<measures.length;measureIndex++)
          {
              var measureVal = measures[measureIndex];
              var measureArr = [];
              for(var timeIndex=startTime;timeIndex<=endTime;)
              {
                if(index == 0 && measureIndex==0)
                {
                  resultObj.timestamps.push(timeIndex);
                }
                measureArr.push(Math.floor(Math.random()*50000*(timeIndex+measureIndex+index+1)));
                timeIndex = timeIndex + gran;
              }
              entry.measures.push(measureArr);
          }
         resultObj.results.push(entry);
        }
        
        var res={};
        res.data = resultObj;
        return res;

    };



    this.servAggregateMultiple = function (req)
    {
  
       var data =  req;
       var length = data.length;
       var measures = data.responseMeasures;
       var dimensions = data.responseDimensions;
       var resultObj = {};
       resultObj.responseMeasures = measures;
       resultObj.totalRecords = length;
       resultObj.responseDimensions = dimensions;
       resultObj.results = [];
       for(var index=0;index<length;index++)
       {
        var entry = {
          records :[],
          measures :[]
        };

        for(var dimIndex=0;dimIndex<dimensions.length;dimIndex++)
        {
            var dimVal = dimensions[dimIndex];
            entry.records.push(dimVal+(index+1));
        }
         for(var measureIndex=0;measureIndex<measures.length;measureIndex++)
        {
            var measureVal = measures[measureIndex];
            entry.measures.push(Math.random()*(index+1)*500);
        }
         resultObj.results.push(entry);
       }
        
        var res={};
        res.data = resultObj;
        return res;

   } ;


   this.getTimeRange = function()
   {
      var res={};
      var stDate= new Date().getTime()/1000;
      var eDate = stDate - 2592000 // 30 days before now
      res.data = [eDate,stDate];
      return  res;
   }

   this.getSPLData = function ()
   {

   return  [

      {
          style:'list-group-item-text-disabled',
        
          key:'MARKETING',
          children:[
              {
                associatedPath:'#/startScreen',
                nameStyle:'list-group-item-disabled',
                name:'Customer Based Segmentation',
                
                imgStyle:'list-group-item-img-disabled'
              },
              {
                associatedPath:'#/startScreen',
                nameStyle:'list-group-item-disabled',
                name:'Customer Targeting',
                imgStyle:'list-group-item-img-disabled'
              }
          
          ],

         
      },
      {
          style:'list-group-item-text',
          key:'REVENUE ASSURANCE',
      
          children:[
            {
              associatedPath:'#/discrepancyHunterScreen',
              nameStyle:'list-group-item',
              name:'Discrepancy Hunter',
              style:'list-group-item',
              imgStyle:'list-group-item-img'
            }
          ],
            
      },
      {
          style:'list-group-item-text',
          key:'CUSTOMER USAGE',
        
          children:[
            {
              associatedPath:'#/modemLookupScreen',
              nameStyle:'list-group-item',
              name:'Modem Lookup',
              style:'list-group-item',
              imgStyle:'list-group-item-img'
            }
          ],
          
      }
      ];
   }


});


