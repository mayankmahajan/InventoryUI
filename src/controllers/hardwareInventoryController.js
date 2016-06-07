app.controller('hardwareInventoryController',['$scope','$http','TestService', function($scope,$http,TestService)
{
	
	$scope.fetchRecordsURL = 'sqllite/searchRecords.php?'
	$scope.updateRecordsURL = 'sqllite/updateRecords.php?'
	
	$scope.processedData = []
	
	
	$scope.saveRow = function(row){
//		Save Request to Python
//		qp = 'api=insert&';
		qp = 'api=update&';
		keys = Object.keys(row);
//		keys = angular.fromJson(angular.toJson(k1));
//		keys = angular.copy(k1)
		
		for (var i=0; i<keys.length; i++){
			if (keys[i] == '$$hashkey'){
				continue;
			}
			qp = qp.concat(keys[i]+"="+row[keys[i]]+"&");
		}
		
		$scope.httpRequest($scope.updateRecordsURL.concat(qp));
		
		if (!window.alert('Success'))
		{
			$scope.getSearchQueryParameters();
		}
		
	}
	
	$scope.deleteRow = function(row){
//		Save Request to Python
		qp = 'api=delete&';
		keys = Object.keys(row);
//		keys = angular.fromJson(angular.toJson(k1));
//		keys = angular.copy(k1)
		
		for (var i=0; i<keys.length; i++){
			if (keys[i] == '$$hashkey'){
				continue;
			}
			qp = qp.concat(keys[i]+"="+row[keys[i]]+"&");
		}
		
		$scope.httpRequest($scope.updateRecordsURL.concat(qp));
		if (!window.alert('Success'))
		{
			$scope.getSearchQueryParameters();
		}
	}
	
	
	
	
	$scope.getSearchQueryParameters = function (){
		qp = 'api=select&';
		for (var i = 0; i < arguments.length; i=i+2) {
			if (arguments[i+1] == undefined)
				{
				arguments[i+1] = ''
				}
				
			qp = qp.concat(arguments[i]+"="+arguments[i+1]+"&");
		}
		$scope.httpRequest($scope.fetchRecordsURL.concat(qp));
		
	}
	
	
	
	$scope.httpRequest = function(qp)
	{
//		qp = $scope.getQueryParameters()
		$http.get(qp).then(function(response){
			rawData = response;
			return rawData;
		}).then(function(rawData){
//			parseData = $scope.parseHardwareDetails(rawData);
			parseData = $scope.parseHardwareDetails(rawData);
			return parseData;
		}).then(function(rawData){
			
//			alert('Please Search Again');
//			
		});
//		records =  TestService.getRecords().then(function(response){
//			$scope.GRIDresponsehandler(rawData);
//		});
		
	}
	
	$scope.parseSetupDetails = function(rawData)
	{
		$scope.processedSetupDetails = rawData.data;
		$scope.keys = Object.keys($scope.processedSetupDetails[0])
		return $scope.processedSetupDetails
	}
	
	$scope.parseHardwareDetails = function(rawData)
	{
//		this.processedData = [];
//		
//		this.processedData = [rawData.data[0]];
		$scope.processedHardwareDetails = rawData.data;
//		x = {Bare_Metal_IP: "192.168.151.90",
//			Project: "STEM1",
//			Role: "NN",
//			Setup_IP: "192.168.151.9",
//			Setup_Name: "Functional",
//			Storage_IP: "xx.11.xx.34",
//			Storage_Size: "109 G",
//			Storage_initiator_name: "intenale",
//			Storage_target_ip: "1.13.1.4",
//			VIP: "xxx.xxx.xxx.vip",
//			VM: "Y"}
//		$scope.processedData.push(x);
		return $scope.processedHardwareDetails;
		
	}
	
	$scope.addNewRow = function(){
		
		x = {Bare_Metal_IP: "192.168.151.90",
				Project: "STEM1",
				Role: "NN",
				Setup_IP: "192.168.151.9",
				Setup_Name: "Functional",
				Storage_IP: "xx.11.xx.34",
				Storage_Size: "109 G",
				Storage_initiator_name: "intenale",
				Storage_target_ip: "1.13.1.4",
				VIP: "xxx.xxx.xxx.vip",
				VM: "Y"}
		$scope.processedData.push(x);
		return $scope.processedData;
		
	}
	
	$scope.editRow = function(row){
//		UI side handling only
		return row
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// Drawing Table
	$scope.gridID='myGrid';
	$scope.viewID='chartBodyID';
	
	var windowWidth = document.body.offsetWidth -50 ;
	$scope.columns = function(_wd)
	{
	    var eachcolWd= _wd/3; 
//	    var columns = 
//	     [
//	      {id: "a", name: "a", field: "a", width: eachcolWd,sortable:true},
//	      {id: "b", name: "b", field: "b", width: eachcolWd,sortable:true},
//	      {id: "c", name: "c", field: "c", width: eachcolWd,sortable:true}
//	     ];
	    var columns = 
	        [
	         {id: Object.keys(this.processedData[0])[0], name: Object.keys(this.processedData[0])[0], field: Object.keys(this.processedData[0])[0], width: windowWidth/4,sortable:true},
	         {id: Object.keys(this.processedData[0])[1], name: Object.keys(this.processedData[0])[1], field: Object.keys(this.processedData[0])[1], width: windowWidth/4,sortable:true},
	         {id: Object.keys(this.processedData[0])[2], name: Object.keys(this.processedData[0])[2], field: Object.keys(this.processedData[0])[2], width: windowWidth/4,sortable:true},
	         {id: Object.keys(this.processedData[0])[3], name: Object.keys(this.processedData[0])[3], field: Object.keys(this.processedData[0])[3], width: windowWidth/4,sortable:true},
	         {id: Object.keys(this.processedData[0])[3], name: Object.keys(this.processedData[0])[4], field: Object.keys(this.processedData[0])[4], width: windowWidth/4,sortable:true},
	         {id: Object.keys(this.processedData[0])[3], name: Object.keys(this.processedData[0])[5], field: Object.keys(this.processedData[0])[5], width: windowWidth/4,sortable:true}
	         
	         
	         // {id: "sessionCount", name: "sessionCount", field: "sessionCount", width: 200,sortable:true}
	        ];
	    return columns;
	};
	
	$scope.loadGrid = function (dp,wd,ht,divId)
    {
		var scope = angular.element($("#"+divId)).scope();
		var columns = $scope.columns(wd)
		createGridView(scope.gridID,dp,wd,ht,columns,scope.getGridOption);
    };
  
    
    $scope.GRIDresponsehandler = function(rawData)
    {
    	$scope.griddp = rawData;
    	$scope.loadGrid($scope.griddp,windowWidth,150,$scope.viewID);
    }
  
  
  
  
}
]);