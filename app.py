from sanic import Sanic, response
from sanic.response import json, text
import json

from algorithm.bert import BERT
from algorithm.bm25 import BM25

app = Sanic(name="project")

#localhost:8000
@app.route("/")
async def home(request):
   return response.text("testing")
   #return json({ "hello": "world" })

# @app.route('/post')
# async def post_handler(request):
#     return text('POST request - {}'.format(request.json))

# @app.route('/get')
# async def get_handler(request):
#     print("TESTING")
#     return text('GET request - {}'.format(request.args))

# @app.route("/json")
# def post_json(request):
#     return json({ "received": True, "message": request.json })

@app.route('/pred', methods=["POST"])
def get_image(request):
    model_requested = None
    request_body = request.json
    
    if type(request_body) == str:
        request_body = json.loads(request_body)

    if request_body["model_name"] == "bert":
        model_requested = BERT()
    else:
        model_requested = BM25(int(request_body["min_len_recoganizedAs_doc"]))

    doc = request_body["doc"]
    query = request_body["query"]
    res_num = request_body["res_num"]

    ret = json.dumps(model_requested.rank(query, doc, res_num))
    return response.json(ret)
        
if __name__ == '__main__':
   app.run(host='0.0.0.0', port=8000, debug=True)