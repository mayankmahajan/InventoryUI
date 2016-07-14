app.controller('addSetupPageController',['$scope','$http','TestService', function($scope,$http,TestService)
{
	
		$scope.fetchRecordsURL = 'sqllite/searchRecords.php?'
		$scope.updateRecordsURL = 'sqllite/updateRecords.php?'
		$scope.fetchSetupRecordsURL = 'sqllite/searchSetupRecords.php?'
		$scope.updateSetupRecordsURL = 'sqllite/updateSetupRecords.php?'
		
		$scope.processedData = []
		
		
		$scope.saveRow = function(row){
//			Save Request to Python
//			qp = 'api=insert&';
			qp = 'api=update_hardware&';
			keys = Object.keys(row);

			for (var i=0; i<keys.length; i++){
				if (keys[i] == '$$hashkey'){
					continue;
				}
				qp = qp.concat(keys[i]+"="+row[keys[i]]+"&");
			}
			
			$scope.httpRequest($scope.updateRecordsURL.concat(qp));
			
//			$scope.getSearchQueryParameters();
		}
		
		$scope.deleteRow = function(row){
//			Save Request to Python
			qp = 'api=delete_hardware&';
			keys = Object.keys(row);
			
			for (var i=0; i<keys.length; i++){
				if (keys[i] == '$$hashkey'){
					continue;
				}
				qp = qp.concat(keys[i]+"="+row[keys[i]]+"&");
			}
			
			$scope.httpRequest($scope.updateRecordsURL.concat(qp));
		
//			$scope.getSearchQueryParameters();
		}
		
		$scope.getSearchQueryParameters = function (){
			qp = 'api=select_hardware&';
			for (var i = 0; i < arguments.length; i=i+2) {
				if (arguments[i+1] == undefined)
					{
					arguments[i+1] = ''
					}
					
				qp = qp.concat(arguments[i]+"="+arguments[i+1]+"&");
			}
			$scope.httpRequest($scope.fetchRecordsURL.concat(qp));
		}
		
		$scope.getProjects = function (){
			qp = 'api=projects&';
			for (var i = 0; i < arguments.length; i=i+2) {
				if (arguments[i+1] == undefined)
					{
					arguments[i+1] = ''
					}
					
				qp = qp.concat(arguments[i]+"="+arguments[i+1]+"&");
			}
			$scope.fetchProjects($scope.fetchRecordsURL.concat(qp));
		}
		$scope.fetchProjects = function(qp)
		{
			$http.get(qp).then(function(response){
				if (typeof(response.data) == 'string'){
					if (response.data == " "){
						alert("Error");
					}
					else{
						if(!alert(response.data)){
//							window.location = 'http://192.168.162.9/inventory_management/home.html';
						}
						
					}
				}
					
				rawData = response;
				return rawData;
			}).then(function(rawData){
				parseData = $scope.parseProjectDetails(rawData);
				return parseData;
			}).then(function(rawData){
				
			});
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
//							window.location = 'http://192.168.162.9/inventory_management/home.html';
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
		
		$scope.disable = true;
		
		$scope.onProjectChange = function(project,hardwareDetail)
		{
			if (project['project_name'] == hardwareDetail[0]['project_name'])
				{
				$scope.disable = false;
				return true;
				}
			else
				{
				$scope.disable = true;
				alert("Project not matching");
				return false;
				}
		}
		$scope.vm = '';
		$scope.getSetupDetails = function (vm){
			$scope.vm = vm;
			qp = 'api=select_setup&';
			for (var i = 0; i < arguments.length; i=i+2) {
				if (arguments[i+1] == undefined)
					{
					arguments[i+1] = ''
					}
					
				qp = qp.concat(arguments[i]+"="+arguments[i+1]+"&");
			}
			$scope.fetchSetupDetails($scope.fetchSetupRecordsURL.concat(qp));
		}
		$scope.fetchSetupDetails = function(qp)
		{
			$http.get(qp).then(function(response){
				if (typeof(response.data) == 'string'){
					if (response.data == " "){
						alert("Error");
					}
					else{
						if(!alert(response.data)){
//							window.location = 'http://192.168.162.9/inventory_management/home.html';
						}
						
					}
				}
					
				rawData = response;
				return rawData;
			}).then(function(rawData){
				parseData = $scope.parseSetupDetails(rawData);
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
		$scope.parseProjectDetails = function(rawData)
		{
			$scope.processedProjectDetails = rawData.data;
//			
			
//			// Creating blank row
//			object = {};
//			keys = Object.keys($scope.processedHardwareDetails);
//			for (var i=0; i<keys;i++){
//				object[keys[i]] =''
//			}
//			$scope.processedHardwareDetails.push(object);
			
			return $scope.processedProjectDetails;
		}
		$scope.parseSetupDetails = function(rawData)
		{
			if ($scope.vm == Y)
			{
			$scope.processedProjectDetails = rawData.data;
			}
//			
			
			// Creating blank row
			object = {};
			keys = Object.keys($scope.processedSetupDetails);
			for (var i=0; i<keys;i++){
				object[keys[i]] =''
			}
			$scope.processedHardwareDetails.push(object);
			
			return $scope.processedProjectDetails;
		}
		
		$scope.saveSetupRow = function(row){
//			Save Request to Python
//			qp = 'api=insert&';
			qp = 'api=update_setup&';
			keys = Object.keys(row);

			for (var i=0; i<keys.length; i++){
				if (keys[i] == '$$hashkey'){
					continue;
				}
				qp = qp.concat(keys[i]+"="+row[keys[i]]+"&");
			}
			
			$scope.fetchSetupDetails($scope.updateSetupRecordsURL.concat(qp));
			
//			$scope.getSearchQueryParameters();
		}
		
		$scope.deleteSetupRow = function(row){
//			Save Request to Python
			qp = 'api=delete_setup&';
			keys = Object.keys(row);
			
			for (var i=0; i<keys.length; i++){
				if (keys[i] == '$$hashkey'){
					continue;
				}
				qp = qp.concat(keys[i]+"="+row[keys[i]]+"&");
			}
			
			$scope.fetchSetupDetails($scope.updateSetupRecordsURL.concat(qp));
		
//			$scope.getSearchQueryParameters();
		}
		
  
  
}
]);