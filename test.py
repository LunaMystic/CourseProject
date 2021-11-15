from Prediction.Algorithm.bm25 import BM25

query = "Bill Gates"
a = BM25(10)
print(a.rank(query, "Hello there good man! Bill Gates is a business man. How is the Bill Gates?", 2))