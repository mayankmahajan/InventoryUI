
var QueryRequest = function(_startTime,_endTime,_length,_offset,_timeGranularity,_sortDirection,_sortProperty,_responseMeasures,_responseDimensions,_filterData,_filters,_paramMap,_responseFilters,_cubeContextDimensions,_maxResults,_maxResultOffset)
{
   var request = this;
   request.responseMeasures = _responseMeasures;
   request.responseDimensions = _responseDimensions;
   request.filterData = _filterData;
   request.filters = _filters;
   request.paramMap = _paramMap;
   request.cubeContextDimensions = _cubeContextDimensions;
   request.maxResults = _maxResults;
   request.maxResultOffset = _maxResultOffset;
   request.length = _length;
   request.offset = _offset;
   request.endTime = _endTime;
   request.startTime = _startTime;
   request.timeGranularity = _timeGranularity;
   request.sortDirection = _sortDirection;
   request.sortProperty = _sortProperty;

   return request;
}

function buildDataRequest(request)
{
	var data = 
	{
      "responseMeasures": request.responseMeasures,
      "responseDimensions": request.responseDimensions,
      "filterData":request.filterData,
      "filters":request.filters,
      "paramMap":request.paramMap,
      "responseFilters":request.responseFilters,
      "cubeContextDimensions":request.cubeContextDimensions,
      "maxResults":request.maxResults,
      "maxResultOffset":request.maxResultOffset,
      "length":request.length,
      "offset":request.offset,
      "endTime":request.endTime,
      "startTime":request.startTime,
      "timeGranularity":request.timeGranularity,
      "sortDirection":request.sortDirection,
      "sortProperty":request.sortProperty
              
    };


   return  data;          

}

function parseResponse(responseText)
{
 

  var response = responseText.data;
  // console.log(response);


  var datas = []


  var measures = [];
  var dimensions = [];
  // var timestamps = [];
  for (var i = 0 ;i < response.responseDimensions.length ;i++)
  {
  	 dimensions.push(response.responseDimensions[i]);
  }
  for (var i = 0 ;i < response.responseMeasures.length ;i++)
  {
  	measures.push(response.responseMeasures[i]);
  }
 

  if(response.hasOwnProperty('timestamps'))
  {
    for (var i = 0 ;i < response.timestamps.length ;i++)
    { 

       var obj={};

       obj['TIMESTAMP_ORG'] = response.timestamps[i];
       var dt = new Date(obj['TIMESTAMP_ORG'] *1000);
       obj['TIMESTAMP_UI'] = dt.getDate();
       datas.push(obj);
    }

    for(var resultID in response.results)
    {

          var resultObj = response.results[resultID];

          var prop= resultObj.records[0]



          for (var i = 0 ;i < resultObj.measures.length ;i++)
          {
             var mvalueArray = resultObj.measures[i];

             for (var j = 0 ;j < datas.length ;j++)
             { 
                  var itm = datas[j];

                  itm[prop+"#"+getUIKeyFor(measures[i])] = mvalueArray[j];
             };

          };

      };
  }
  else
  {
     for(var resultID in response.results)
      {
          var resultObj = response.results[resultID];

          var obj={};

          for (var i = 0 ;i < resultObj.measures.length ;i++)
          {
            obj[getUIKeyFor(measures[i])] = resultObj.measures[i];
          }

          for (var j = 0 ;j < resultObj.records.length ;j++)
          {
            obj[getUIKeyFor(dimensions[j])] = resultObj.records[j];
          }

          datas.push(obj);
      };

  };

 
  return datas;
};


function getMeasuresFromResponse(responseText)
{
  var response = responseText.data;
  var measures = [];
  for (var i = 0 ;i < response.responseMeasures.length ;i++)
  {
    measures.push(response.responseMeasures[i]);
  }

  return measures;
}

function getDimensionsFromResponse(responseText)
{
  var response = responseText.data;
  var dimensions = [];
  for (var i = 0 ;i < response.responseDimensions.length ;i++)
  {
     dimensions.push(response.responseDimensions[i]);
  }
  return dimensions;
}

function createChartLegendView(id,legendid,legendHt,legendWd,dp,wd,ht,redraw,chartOptions,legendOptions)
{ 
  createChartView(id,dp,wd,ht,redraw,chartOptions);
  createLegendView(legendid,legendHt,legendWd,redraw,legendOptions);
}

function createChartView(id,dp,wd,ht,redraw,chartOptions)
{
    var cc =  new Guavus.Components.ColumnChart('#'+id,ht,wd,chartOptions); 
    cc.dataProvider(dp);
    return cc;
};

function createLegendView(id,Ht,Wd,redraw,options)
{
    var leg =  new Guavus.Components.Legend('#'+id,Ht,Wd,options);
    leg.draw();
    return leg;
};

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

function _chartOptions(_series,renderer,tooltip,catField)
 {

     var _options1 =  {
     'margin': {top: 10, right: 20, bottom: 70, left:15},
     'gridDirection':'horizontal',
     'xAxisRenderer':renderer,
     'toolTipFunction' :tooltip,
     'categoryField' :catField,
     'type':'stacked',
     'series':_series,
     };

     return _options1;

 }

 

 function _legendOptions(_series,clkhandler)
 {

     var _loptions = 
     {
     'padding': {top: 0, right: 10, bottom: 0, left:30},
     'direction':'horizontal',
     'textClass' :'lgTxt',
     'markerWidth' :16,
     'markerHeight' :16,
     'legendGap':30,
     'markerTextGap':10,
     'clickHandler' :clkhandler,
     'series':_series,
     };

     return _loptions;

 }

 function drawXAxisRenderer(svg,_data,xScale,yScale,height,width,margin,defSelIndex,imgPath,catfield,clickhandler,subseries)
 {
    var cls  = [];
    var flds = [];

    for (var i  =  0 ; i < subseries.length ; i++)
    {
      var sr = subseries[i];
      cls.push(sr.color);
      flds.push(sr.field);
    }
   
   // add total of sub subseries field  aand value
    for(var i = 0 ; i < _data.length ; i++)
    {  
       var o = _data[i];
       var tot  = 0;
       for(var j = 0 ; j < flds.length ; j++)
       {
          tot  += o[flds[j]];
       }
        
       o['totalData'] = tot;
    }


   //recalculate data for discrpesnies---
    var y = d3.scale.linear()
      .rangeRound([xScale.rangeBand(), 0]);  

    var color = d3.scale.ordinal()
      .range(cls)
      .domain(flds);
   // var _xScale = d3.scale.linear().range([0, width]).domain([0, 100]);
    _data.forEach(function(d) 
    {
       // console.log('start y0',y0);
      var y0 = 0;
      var cxNext = 0;
     d.ages = color.domain()
    .map(function(name) { 
      // console.log('name',name);
      var myObj = { // Create and initialize the variable that will be returned
        name: name, 
        y0: y0, 
        y1: y0 + Number(d[name])
      };

    y0 += Number(d[name]);
   

    return myObj; // return the object and continue with the remaining values if there's a list
    });
      
      d.ages.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });


    });
    
// draw aletrnate color rect which holds all items of renderer
  // selectedid ;
  // alert(selectedid);
  svg.selectAll("rect")
  .data(_data)
  .enter()
  .append("rect")
  .attr('class','rectbar')
  .attr("width", xScale.rangeBand())
  .attr("height", 63)
  .attr("x", function(d) { return xScale(d[catfield]); })
  .attr('y', height+margin.top+2)
  .attr('stroke', 'black')
  .attr('stroke-width', function (d,i) {
    return 0 ;
  })
  .attr('id', function (d,i) {
    return i;
  })
  .style("fill",  function (d,i) {
    
    if(i == defSelIndex)
      return '#92A8B4';

    return (i % 2 == 0) ? '#F2F3F3' :'#ffffff';
  })
  .on("mouseover", function(d){

          d3.select(this).attr("stroke","black").attr("stroke-width",1);
     })
  .on("mouseout",function(){

        d3.select(this).attr("stroke","black").attr("stroke-width",0);
              
   })
   .on('click', function(d,i)
    {  
        
      // remove any existing border for all rects
      if(defSelIndex >= 0)
      {
        var cls = (defSelIndex % 2 == 0) ? '#F2F3F3' :'#ffffff'
        svg.selectAll("svg rect[id='" + defSelIndex + "']")
            .attr("stroke","black").attr("stroke-width",0)
            .style("fill",cls);
      }

      defSelIndex = d3.select(this).attr('id');

      d3.select(this).attr("stroke","black").attr("stroke-width",0)
      .style("fill",'#92A8B4');

    if(clickhandler != undefined)
      clickhandler(d,i);
   
    }
    );


// add svg image
  svg.selectAll(".bar")
     .append("g")
     .data(_data)
     .enter()
     .append("svg:image")
     .attr("xlink:href",imgPath)
     .attr("width", 15)
     .attr("height", 15)
     .attr("x",  function(d) { return xScale(d[catfield]) + (xScale.rangeBand()/2- 8); })
     .attr('y', height+margin.top +28);

// add text
   svg.selectAll(".bar")
    .append("g")
    .data(_data)
    .enter()
    .append("text")
    .attr("x", function(d) { return xScale(d[catfield]) + xScale.rangeBand()/2 - Guavus.Util.getTextWidth(d['totalData'])/2 ; })
    .attr("y", height + margin.top +50)
    .attr("dy", ".35em")
    // .text(function(d) { return Math.round(Math.random() * 20);})
    .text(function(d) { return d['totalData'];})
    // .style("fill", 'green')
    .style("font-family", 'AllerLight')
    .style("font-size", '10px');

// add stacked bar chart
  var state = svg.selectAll(".bar")
  .data(_data)
  .enter().append("g")
  .attr("class", "state")
  .attr("transform", function(d) { return "translate(" + xScale(d[catfield]) + ",0)"; });

  state.selectAll("rect")
  .data(function(d) { return d.ages; })
  .enter().append("rect")
  .attr("x", function(d) { return y(d.y1); })
  .attr("width", function(d) { return y(d.y0) - y(d.y1); })
  // .attr("width", 5)
  .attr("height", 4)
  .attr('y', height+margin.top +50 + 7)
  .style("fill", function(d) { return color(d.name); });



 };

 function createChartSeries(fields,colors,names,ids)
 {  
    var _sers =  [];
    var serLen = fields.length
    for (var i = 0 ;i < serLen ; i++ )
    {
      var fld = fields[i];
      var name = (names[i] != undefined) ? names[i] :fld;
      var clr=  (colors[i] != undefined) ? colors[i] : Math.round(Math.random()*1000);
      var id = (ids[i] != undefined) ? ids[i] :fld;
      var sr = new Guavus.Components.Series(id,name,clr,fld)  
      _sers.push(sr);
    }

    return _sers;

 };

 function ui2RubixKeyMap()
 {
   var map ={};

   map['SUBSCRIBER_UI'] = 'SUBSCRIBER';
   map['TIMESTAMP_UI'] = 'TIMESTAMP';
   map['SCORE_UI'] = 'SCORE';
   map['DIR_UI'] = 'DIR';
   map['CMTS_UI'] = 'CMTS';

   map['DISCREPANCY_COUNT_UI'] = 'DISCREPANCY_COUNT';
   map['COUNT_UI'] = 'COUNT';
   map['TRUEUP_USAGE_UI'] = 'TRUEUP_USAGE';
   map['CEMP_USAGE_UI'] = 'CEMP_USAGE';
   map['DELTA_PERCENT_UI'] = 'DELTA_PERCENT';
   map['DELTA_UI'] = 'DELTA';
   map['SCN_UI'] = 'SCN';
  
  
  return map;

 };

 function rubix2UiKeyMap()
 {
   var map ={};

   map['SUBSCRIBER'] = 'SUBSCRIBER_UI';
   map['TIMESTAMP'] = 'TIMESTAMP_UI';
   map['SCORE'] = 'SCORE_UI';
   map['DIR'] = 'DIR_UI';
   map['CMTS'] = 'CMTS_UI';

   map['DISCREPANCY_COUNT'] = 'DISCREPANCY_COUNT_UI';
   map['COUNT'] = 'COUNT_UI';
   map['TRUEUP_USAGE'] = 'TRUEUP_USAGE_UI';
   map['CEMP_USAGE'] = 'CEMP_USAGE_UI';
   map['DELTA_PERCENT'] = 'DELTA_PERCENT_UI';
   map['DELTA'] = 'DELTA_UI';
   map['SCN'] = 'SCN_UI';

  return map;

 };

 function id2NameMap()
 {
   var map ={};

   map['1'] = 'Downstream';
   map['2'] = 'Upstream';
   
   map['48'] = 'Highly Under';
   map['49'] = 'Under';
   map['50'] = 'Minimal';
   map['51'] = 'Over';
   map['52'] = 'Highly Over';
  
  return map;
 };

 function id2ColorMap()
 {
   var map ={};

   map['1'] = '#54946F';
   map['2'] = '#A9D532';
   
   map['48'] = '#1557bf';
   map['49'] = '#96c0ec';
   map['50'] = '#e6e6ff';
   map['51'] = '#ff8cca';
   map['52'] = '#d4002b';
  
  return map;
 };

 function getRubixKeyFor(uikey)
 {
   var map = ui2RubixKeyMap();

   return getValueFor(map,uikey);

 }

 function getUIKeyFor(rubixkey)
 {
   var map = rubix2UiKeyMap();
 
   return getValueFor(map,rubixkey);

 }


 function getRubixKeysFrom(uikeys)
 {
   var _k=[];

   for (var i = 0 ; i < uikeys.length ; i++)
   {
      _k.push(getRubixKeyFor(uikeys[i]))
   }

   return _k;
 }

  function getUiKeysFrom(rubixkeys)
 {
   var _k=[];

   for (var i = 0 ; i < rubixkeys.length ; i++)
   {
      _k.push(getUIKeyFor(rubixkeys[i]))
   }

   return _k;
 };

 function getNameFor(id)
 {
   var map = id2NameMap();

   return getValueFor(map,id);;
 };

  function getColorFor(id)
 {
   var map = id2ColorMap();

   return getValueFor(map,id);
 };


 function getValueFor(map ,id)
 {
   if(id in map)
   {
     return map[id];
   }

   return id;

 };

 function getMergedObj(obj1 ,obj2)
 {
   return $.extend({}, obj1, obj2);

 };


 function getMergedCollection(coll1 ,coll2)
 {
   var coll = [];

   $.each( coll1, function( i, value ) {
      coll.push(getMergedObj(value,coll2[i]));
   });

   return coll;

 };


function commonloadChart(chartID,legendID,dp,wd,ht,_sers,axisRenderer,tooltipFunction,legendClickHandler)
{
    var _options1 =  _chartOptions(_sers,axisRenderer,tooltipFunction,'TIMESTAMP_UI');
    var _loptions1 = _legendOptions(_sers,legendClickHandler);
    createChartLegendView(chartID,legendID,30,600,dp,wd,ht,true,_options1,_loptions1);
}

function commonLegendClickHandler(chartID,dp,wd,ht,selections,chartSeries,axisRenderer,tooltipFunction)
{
  
   selections.sort(function(a, b){return a-b});
   var _sers = [];
   for(var i = 0 ; i < selections.length ; i++) 
   {
      var ind = selections[i];
     _sers.push(chartSeries[ind]);
   };

   var _options1 = _chartOptions(_sers,axisRenderer,tooltipFunction,'TIMESTAMP_UI');
   
   createChartView(chartID,dp,wd,ht,true,_options1) ;
}

function commonToolTipFunction(data)
{
   return "<span>Value : " +Math.round( data[Guavus.Constants.CORE_DATA_VALUE_FIELD] )+ "</span>";
}

function getSeriesForType(itm,propExclude,propInclude)
{
   // var itm = dp[0];
   var flds= []
   var cls=[];
   var names =[];

  for(var p in itm)
  {
    // console.log(p);
    if(p != propExclude)
    {
      var ps= p.split('#');

      if(ps[1] == propInclude)
      {
        flds.push(p);
        names.push(getNameFor(ps[0]));
        cls.push(getColorFor(ps[0]));
      };
      
    }

  };

  return  createChartSeries(flds,cls,names,flds);

}


function getDayNameFor(index)
{
  var day ;
   switch (index) 
   {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
        break;
   } 

   return day;

}

function getMonthNameFor(index)
{
  var day ;
   switch (index) 
   {
    case 0:
        day = "Jan";
        break;
    case 1:
        day = "Feb";
        break;
    case 2:
        day = "March";
        break;
    case 3:
        day = "Apr";
        break;
    case 4:
        day = "May";
        break;
    case 5:
        day = "June";
        break;
    case 6:
        day = "July";
        break;
    case 7:
        day = "Aug";
        break;
    case 8:
        day = "Sep";
        break;
    case 9:
        day = "Oct";
        break;
    case 10:
        day = "Nov";
        break;

    case 11:
        day = "Dece";
        break;       

   } 

   return day;

}


function barChart() {
    var that = {};
  var data = null;
    var h = 500 - 80, w = 500, svg, x, y;
    that.render = function() {
        svg = d3.select('body').append('svg')
             .attr('height', '500')
             .attr('width', '500')
            .append('g')
             .attr("transform", "translate(0, 0)");

        x = d3.scale.ordinal().rangeRoundBands([0, w], .05);
        x.domain(data.map(function(d) {
          return d.date;
        }));

        y = d3.scale.linear().range([h, 0]);
        y.domain([0, d3.max(data, function(d) {
          return d.value;
        })]);

        // add bars

        var bars = svg.selectAll('.bar').data(this.getData());
        bars
            .enter().append('rect')
            .attr('class', 'bar')
            .attr("x", function(d) {
                return x(d.date);
            })
            .attr("width", x.rangeBand())
            .attr("y", function(d) {
                return y(d.value);
            })
            .attr("height", function(d) {
                return h - y(d.value);
            });


    };
      var data = null;

    that.setData = function(d) {
        data = d;
    };

    that.getData = function() {
        return data;
    }

    that.addAxis = function() {
      // add axis\
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")");

    svg.append("g")
      .attr("class", "y axis");

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

    svg.selectAll("g.x.axis")
      .call(xAxis);

    svg.selectAll("g.y.axis")
      .call(yAxis);
};


    return that;
}


function buttonClickHandler( row, data ,type )
{
   var controllerElement = document.querySelector('body');
   var $scope = angular.element(controllerElement).scope();
    //var $scope = angular.element(document.body).injector().get('$scope');
    var $location = angular.element(document.body).injector().get('$location');
    if(type == 1)
    {
      $scope.$apply(function() {
        $location.path("/CMTSDetailScreen");
      });
    
    }
    if(type == 0)
    {
      $scope.$apply(function() {
        $location.path("/modemLookupScreen");
       });
    }
  
}

