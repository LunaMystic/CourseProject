import requests
import json

url = 'http://localhost:8000/'
payload = {'some': 'data'}
header = {'content-type': 'application/json'}

#response = requests.post(url, data=json.dumps(payload), headers=header)
response = requests.get(url, params = {"a":"b"})
print(response.status_code)
print(response.text)
print(response.url)
