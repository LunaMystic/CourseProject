from sanic import Sanic, response
from sanic.response import json, text

app = Sanic(name="project")

#localhost:8000
@app.route("/")
async def home(request):
   return response.text("testing")
   #return json({ "hello": "world" })

@app.route('/post')
async def post_handler(request):
    return text('POST request - {}'.format(request.json))

@app.route('/get')
async def get_handler(request):
    print("TESTING")
    return text('GET request - {}'.format(request.args))

@app.route("/json")
def post_json(request):
    return json({ "received": True, "message": request.json })

if __name__ == '__main__':
   app.run(host='0.0.0.0', port=8000, debug=True)