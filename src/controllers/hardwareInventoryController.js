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

		for (var i=0; i<keys.length; i++){
			if (keys[i] == '$$hashkey'){
				continue;
			}
			qp = qp.concat(keys[i]+"="+row[keys[i]]+"&");
		}
		
		$scope.httpRequest($scope.updateRecordsURL.concat(qp));
		
//		$scope.getSearchQueryParameters();
	}
	
	$scope.deleteRow = function(row){
//		Save Request to Python
		qp = 'api=delete&';
		keys = Object.keys(row);
		
		for (var i=0; i<keys.length; i++){
			if (keys[i] == '$$hashkey'){
				continue;
			}
			qp = qp.concat(keys[i]+"="+row[keys[i]]+"&");
		}
		
		$scope.httpRequest($scope.updateRecordsURL.concat(qp));
	
//		$scope.getSearchQueryParameters();
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
		$http.get(qp).then(function(response){
			if (typeof(response.data) == 'string'){
				if (response.data == " "){
					alert("Error");
				}
				else{
					if(!alert(response.data)){
						window.location = 'http://192.168.162.9/inventory_management/home.html';
					}
					
				}
			}
				
			rawData = response;
			return rawData;
		}).then(function(rawData){
			parseData = $scope.parseHardwareDetails(rawData);
			return parseData;
		}).then(function(rawData){
			
		});
	}
	
	$scope.parseHardwareDetails = function(rawData)
	{
		$scope.processedHardwareDetails = rawData.data;
		
		// Creating blank row
		object = {};
		keys = Object.keys($scope.processedHardwareDetails);
		for (var i=0; i<keys;i++){
			object[keys[i]] =''
		}
		$scope.processedHardwareDetails.push(object);
		
		return $scope.processedHardwareDetails;
	}
  
}
]);