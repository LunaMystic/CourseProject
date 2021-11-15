import re
import metapy

class DataProcessor():
    def __init__(self):
        self.metapy_tokenizer = metapy.analyzers.ICUTokenizer(suppress_tags=True)
        self.delimiter = '([;.-?!,])'

    def naive_split_in_sentences(self, raw_str):
        return re.split(self.delimiter, raw_str)

    def process_query(self, query):
        self.metapy_tokenizer.set_content(query)
        return [token for token in self.metapy_tokenizer]

    def build_corpus_for_bm25(self, raw_str, min_length):
        str_list = self.naive_split_in_sentences(raw_str)
        pos_list = []

        str_accumulartor = ""
        doc_list = []
        start = 0
        end = 0

        for i in range(len(str_list)):
            if (str_list[i].replace(" ", "").isalnum()):
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
            self.metapy_tokenizer.set_content(doc)
            tokenized_corpus.append([token for token in self.metapy_tokenizer])
        return tokenized_corpus, doc_list, pos_list