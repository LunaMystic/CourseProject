from algorithm.bm25 import BM25
from algorithm.bert import BERT
doc = "Gates wrote his first software program at the age of 13. In high school he helped form a group of programmers who computerized their school’s payroll system and founded Traf-O-Data, a company that sold traffic-counting systems to local governments. In 1975 Gates, then a sophomore at Harvard University, joined his hometown friend Paul G. Allen to develop software for the first microcomputers. They began by adapting BASIC, a popular programming language used on large computers, for use on microcomputers. With the success of this project, Gates left Harvard during his junior year and, with Allen, formed Microsoft. Sam is a student."
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