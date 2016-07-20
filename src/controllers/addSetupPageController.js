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
				if (keys[i] == '$$hashkey' || keys[i] == '$$hashKey'){
					continue;
				}
				qp = qp.concat(keys[i]+"="+row[keys[i]]+"&");
			}
			
			if (row['project_name'] != "" && row['vm'] != "" && row['setup_name'] != "" && row['base_os_ip'] != "" && row['base_os_username'] != "" && row['base_os_password'] != "")
			{
					$scope.httpRequest($scope.updateRecordsURL.concat(qp));
			}
			
//			$scope.getSearchQueryParameters();
		}
		
		$scope.deleteRow = function(row){
//			Save Request to Python
			qp = 'api=delete_hardware&';
			keys = Object.keys(row);
			
			for (var i=0; i<keys.length; i++){
				if (keys[i] == '$$hashkey' || keys[i] == '$$hashKey'){
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
			$scope.processedProjectDetails = [];
			$scope.getProjects();
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
		$scope.disableSaveButton = true;
		$scope.hideSetupDiv = true;
		
		$scope.onProjectChange = function(project,hardwareDetail)
		{
			if (project['project_name'] == hardwareDetail[0]['project_name'])
				{
				$scope.disable = false;
				$scope.disableSaveButton = false;
				
				if (hardwareDetail[0]['vm'] && hardwareDetail[0]['setup_name'] && hardwareDetail[0]['base_os_ip'] && hardwareDetail[0]['base_os_username'] && hardwareDetail[0]['base_os_password'])
					{
				
				
				$scope.getSetupDetails('serial_number',hardwareDetail[0]['serial_number'])
				$scope.hideSetupDiv = false;
				if ($scope.processedSetupDetails == undefined)
					{
					$scope.processedSetupDetails = [];
					}
				object = {comments: "",cores: hardwareDetail[0]['cores'],created_by: "",hard_disk: hardwareDetail[0]['hard_disk'],project_name: hardwareDetail[0]['project_name'],ram: hardwareDetail[0]['ram'],role: "",serial_number: hardwareDetail[0]['serial_number'],setup_ip: hardwareDetail[0]['base_os_ip'],storage_initiator_name: "",storage_ip: "",storage_size: "",storage_target_ip: "",vip: "",vm_id: 0}
				
				$scope.processedSetupDetails.push(object);
				return true;
				}}
			else
				{
				$scope.disable = true;
				$scope.disableSaveButton = true;
				alert("Project not matching");
//				$scope.processedSetupDetails = [];
//				
//				object = {comments: "",cores: hardwareDetail[0]['cores'],created_by: "",hard_disk: hardwareDetail[0]['hard_disk'],project_name: hardwareDetail[0]['project_name'],ram: hardwareDetail[0]['ram'],role: "",serial_number: hardwareDetail[0]['serial_number'],setup_ip: hardwareDetail[0]['base_os_ip'],storage_initiator_name: "",storage_ip: "",storage_size: "",storage_target_ip: "",vip: "",vm_id: 0}
//				
//				$scope.processedSetupDetails.push(object);
				$scope.hideSetupDiv = true;
				return false;
				}
		}
		$scope.vm = '';
		$scope.getSetupDetails = function (){
//			$scope.vm = vm;
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
//						$scope.processedSetupDetails = [];
						
						
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
			$scope.vm = rawData.data[0]['vm']
			
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
			$scope.processedSetupDetails = []
//			if ($scope.vm == "Y")
//			{
			$scope.processedSetupDetails = rawData.data;
//			}
//			
			
//			 Creating blank row
			object = {};
//			keys = Object.keys(rawData.data);
//			for (var i=0; i<keys;i++){
//				object[keys[i]] =''
//			}
			
			object = {comments: "",cores: $scope.processedSetupDetails[0]['cores'],created_by: "",hard_disk: $scope.processedSetupDetails[0]['hard_disk'],project_name: $scope.processedSetupDetails[0]['project_name'],ram: $scope.processedSetupDetails[0]['ram'],role: "",serial_number: $scope.processedSetupDetails[0]['serial_number'],setup_ip: $scope.processedSetupDetails[0]['base_os_ip'],storage_initiator_name: "",storage_ip: "",storage_size: "",storage_target_ip: "",vip: "",vm_id: 0};
//			
			$scope.processedSetupDetails.push(object);
			
			return $scope.processedSetupDetails;
		}
		
		$scope.saveSetupRow = function(row){
//			Save Request to Python
//			qp = 'api=insert&';
			qp = 'api=update_setup&';
			keys = Object.keys(row);

			for (var i=0; i<keys.length; i++){
				if (keys[i] == '$$hashkey' || keys[i] == '$$hashKey'){
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
				if (keys[i] == '$$hashkey' || keys[i] == '$$hashKey'){
					continue;
				}
				qp = qp.concat(keys[i]+"="+row[keys[i]]+"&");
			}
			
			$scope.fetchSetupDetails($scope.updateSetupRecordsURL.concat(qp));
		
//			$scope.getSearchQueryParameters();
		}
		
  
  
}
]);