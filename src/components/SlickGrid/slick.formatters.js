/***
 * Contains basic SlickGrid formatters.
 * 
 * NOTE:  These are merely examples.  You will most likely need to implement something more
 *        robust/extensible/localizable/etc. for your use!
 * 
 * @module Formatters
 * @namespace Slick
 */

(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Formatters": {
        "PercentComplete": PercentCompleteFormatter,
        "PercentCompleteBarMulti": PercentCompleteBarFormatterMulti,
        "PercentCompleteBar": PercentCompleteBarFormatter,
        "YesNo": YesNoFormatter,
        "BoolFormatter": BoolFormatterFunc,
        "Checkmark": CheckmarkFormatter,
        "CMTSButtonRenderer": CMTSButtonRenderer,
        "ModemButtonRenderer": ModemButtonRenderer
      }
    }
  });

  function PercentCompleteFormatter(row, cell, value, columnDef, dataContext) {
    if (value == null || value === "") {
      return "-";
    } else if (value < 50) {
      return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
    } else {
      return "<span style='color:green'>" + value + "%</span>";
    }
  }

  function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
    if (value == null || value === "") {
      return "";
    }

    var color;

    if (value < 30) {
      color = "red";
    } else if (value < 70) {
      color = "silver";
    } else {
      color = "green";
    }

    return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
  }

  function PercentCompleteBarFormatterMulti(row, cell, value, columnDef, dataContext) {
   //console.log(row+ " - "+ value + "  -  "+dataContext.effortDriven);
    if (value == null || value === "") {
      return "";
    }

    var total = Math.round((dataContext[columnDef.field]));//dataContext.percentA + dataContext.percentB + dataContext.percentC + dataContext.percentD + dataContext.percentE;
    var str = "<span style='display:inline-block;width:4%;text-align:right'>"+total+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='percent-complete-barMulti' style='background:#1557bf;width:" + Math.round(Math.random()*20) + "%'></span>"
       + "<span class='percent-complete-barMulti' style='background:#96c0ec;width:" + Math.round(Math.random()*20) + "%'></span>"
       + "<span class='percent-complete-barMulti' style='background:#e6e6ff;width:" + Math.round(Math.random()*20) + "%'></span>"
       + "<span class='percent-complete-barMulti' style='background:#ff8cca;width:" + Math.round(Math.random()*20) + "%'></span>"
       + "<span class='percent-complete-barMulti' style='background:#d4002b;width:" + Math.round(Math.random()*20) + "%'></span>";
    return str;
  }

  function YesNoFormatter(row, cell, value, columnDef, dataContext) {
    return value ? "Yes" : "No";
  }

  function BoolFormatterFunc(row, cell, value, columnDef, dataContext) {
    var cls;
    var vartext;
    
    var val = dataContext.magnitude

    if( val <= 20)
    {
      cls = '#d4002b';
      vartext = 'Highly Over';
     
    }
    else if(val > 20 && val <= 40 )
    {
      cls = '#ff8cca';
      vartext = 'Over';
    }
    else if(val > 40 && val <= 60 )
    {
       cls = '#e6e6ff';
       vartext = 'Minimal';

    } else if(val > 60 && val <= 80 )
    {
       cls = '#96c0ec';
       vartext = 'Under';
    } else if(val > 80 && val <= 100 )
    {
       cls = '#1557bf';
       vartext = 'Highly Under';
    }

    var cicle= '<svg height="15" width="15"><circle cx="10" cy="10" r="5" fill='+cls+' /></svg>'
  
    var lbl= "<span style='display:inline-block;width:85%;text-align:left padding-left:10px;'>"+vartext+"</span>";

    return lbl +"&nbsp;&nbsp;"+cicle;
  }
 function CheckmarkFormatter(row, cell, value, columnDef, dataContext) {
    return value ? "<img src='../images/tick.png'>" : "";
  } 


 function ModemButtonRenderer(row, cell, value, columnDef, dataContext) {
   var type = 0;
    var str= "<Button id='btn' onclick='buttonClickHandler("+row+", "+dataContext.percentB+", "+type+")'>Modem Details</Button>";
    return str;
  }

  function CMTSButtonRenderer(row, cell, value, columnDef, dataContext) {
      var type = 1;
    var str= "<Button id='btn' onclick='buttonClickHandler("+row+", "+dataContext.percentB+", "+type+")'>CMTS Details</Button>";
    return str;
  }


})(jQuery);

 