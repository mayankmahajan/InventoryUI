app.service('TestService',function(isOffline)
{
	this.getRecords = function()
	{
		response =[{'a':'one','b':'two','c':'three'},{'a':'one','b':'two','c':'three'},{'a':'one','b':'two','c':'three'}];
//		 here call Python code
		return response;
		
//		
//		return {
//			records: function(){
//				return Restangular.all('getRecordsAPI')
//			}
//		}
	}
}
);