import json
from django.http import HttpResponse

def getRecordsAPI(request):
    
    response =[{'a':'one','b':'two','c':'three'},{'a':'one','b':'two','c':'three'},{'a':'one','b':'two','c':'three'}]
    return HttpResponse(
        json.dumps(response),
        content_type = 'application/json'
    )