app.controller('addSetupPageController',['$scope','$http','TestService', function($scope,$http,TestService)
{
	
	$scope.fetchRecordsURL = 'sqllite/createRecords.php'
	
	$scope.processedData = []
	$scope.showRecords = function()
	{
		$http.get($scope.fetchRecordsURL).then(function(response){
			rawData = response;
			return rawData;
		}).then(function(rawData){
//			parseData = $scope.parseHardwareDetails(rawData);
			parseData = $scope.parseSetupDetails(rawData);
			return parseData;
		}).then(function(rawData){
		});
//		records =  TestService.getRecords().then(function(response){
//			$scope.GRIDresponsehandler(rawData);
//		});
		
	}
	
	$scope.parseSetupDetails = function(rawData)
	{
		$scope.processedSetupDetails = rawData.data;
		return $scope.processedSetupDetails
	}
	
	$scope.parseHardwareDetails = function(rawData)
	{
//		this.processedData = [];
//		
//		this.processedData = [rawData.data[0]];
		$scope.processedHardwareDetails = rawData.data[0];
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
	
	$scope.saveRow = function(row){
//		Save Request to Python
		return row
	}
	
	$scope.deleteRow = function(row){
//		Delete request to Python
		return $scope.processedData.pop()
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