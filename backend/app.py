from sanic import Sanic, response
from sanic.response import json, text
import json

from algorithm.bert import BERT
from algorithm.bm25 import BM25

app = Sanic(name="project")

#localhost:8000
@app.route("/")
async def home(request):
   return response.text("Home")

@app.route('/pred', methods=["POST"])
def get_image(request):
    model_requested = None
    request_body = request.json
    
    if type(request_body) == str:
        request_body = json.loads(request_body)
    # print(request_body)
    if request_body["model_name"] == "bert":
        model_requested = BERT()
    else:
        model_requested = BM25(int(request_body["min_len_recoganizedAs_doc"]))

    doc = request_body["doc"]
    query = request_body["query"]
    res_num = request_body["res_num"]

    ret_raw = model_requested.rank(query, doc, res_num)
    ret = json.dumps(ret_raw)
    # print(ret)
    # for single in ret_raw:
    #     print(single[0], single[1])
    #     print(doc[single[0]:single[1]])
    return response.json(ret)
        
if __name__ == '__main__':
   app.run(host='0.0.0.0', port=8000, debug=True)