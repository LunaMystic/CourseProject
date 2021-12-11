from algorithm.bm25 import BM25
from algorithm.bert import BERT
doc = ""
query = "who is Bill Gates"
'''
This algorithm will split doc in multiple documents
During initialization:
parameters:
min_len_recoganizedAs_doc : So you need to specify the minimun document length
acc_tolerance (optional): Also, you can also specify the minmun score of the prediction that can be accepeted and outputed.
'''
a = BM25(100) 
'''
During ranking:
parameters:
query: string
doc: string
res_num: max number of result returned. acc_tolerance has higer priority.
'''
res = a.rank(query, doc, 2)
'''
The output will be a list of span locations represented by start and end index.
'''
print(res)
print(doc[res[0][0]:res[0][1]])

'''
This algorithm will split doc in multiple documents
During initialization:
parameters:
max_ans_num (optional): The number of model's result will be cached.
acc_tolerance (optional): Also, you can also specify the minmun score of the prediction that can be accepeted and outputed.
'''
b = BERT()
'''
During ranking:
parameters:
query: string
doc: string
res_num: max number of result returned. acc_tolerance has higer priority.
         note： res_num <= max_ans_num
'''
res = b.rank(query, doc, 2)
'''
The output will be a list of span locations represented by start and end index.
'''
print(res)
print(doc[res[0][0]:res[0][1]])