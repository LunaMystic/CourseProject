from algorithm.bm25 import BM25
from algorithm.bert import BERT
doc = "Gates wrote his first software program at the age of 13. In high school he helped form a group of programmers who computerized their school’s payroll system and founded Traf-O-Data, a company that sold traffic-counting systems to local governments. In 1975 Gates, then a sophomore at Harvard University, joined his hometown friend Paul G. Allen to develop software for the first microcomputers. They began by adapting BASIC, a popular programming language used on large computers, for use on microcomputers. With the success of this project, Gates left Harvard during his junior year and, with Allen, formed Microsoft. Sam is a student."
query = "who is Bill Gates"
a = BM25(100)
res = a.rank(query, doc, 2)
print(res)
print(doc[res[0][0]:res[0][1]])

b = BERT()
res = b.rank(query, doc, 2)
print(res)
print(doc[res[0][0]:res[0][1]])