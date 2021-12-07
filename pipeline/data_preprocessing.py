import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.tokenize import PunktSentenceTokenizer

class DataProcessor():
    def __init__(self):
        nltk.download('punkt')
        nltk.download('stopwords')
        self.pst = PunktSentenceTokenizer()

        self.stop_words = set(stopwords.words('english'))

    def process_query(self, query):
        return [w.lower() for w in word_tokenize(query) if w.isalnum() and w not in self.stop_words]

    def build_corpus_for_bm25(self, raw_str, min_length):
        tokens_obj = self.pst.span_tokenize(raw_str)
        tokens_idx = [[start, end] for start, end in tokens_obj]
        str_list = []

        for i in range(len(tokens_idx)):
            if i != len(tokens_idx) - 1:
                str_list.append(raw_str[tokens_idx[i][0]:tokens_idx[i+1][0]])
            else:
                str_list.append(raw_str[tokens_idx[i][0]:tokens_idx[i][1]])

        # print(str_list)
        pos_list = []

        str_accumulartor = ""
        doc_list = []
        start = 0
        end = 0

        for i in range(len(str_list)):
            if len(str_accumulartor) < min_length:
                str_accumulartor += str_list[i]
            else:
                doc_list.append(str_accumulartor)
                str_accumulartor = str_list[i]
                pos_list.append([start, end])
                start = end

            end += len(str_list[i])

            if i == len(str_list) - 1 and len(str_accumulartor) != 0:
                doc_list.append(str_accumulartor)
                end = len(raw_str)
                pos_list.append([start, end])

        tokenized_corpus = []
        for doc in doc_list:
            tokenized_doc = [w.lower() for w in word_tokenize(doc) if w.isalnum()]
            tokenized_corpus.append(tokenized_doc)

        # print(pos_list)
        return tokenized_corpus, doc_list, pos_list