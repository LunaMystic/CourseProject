from rank_bm25 import BM25Okapi
from pipeline.data_preprocessing import DataProcessor

class BM25:
    def __init__(self, min_len_recoganizedAs_doc, acc_tolerance=0.0001):
        self.DataProcessor = DataProcessor()
        self.min_len_recoganizedAs_doc = min_len_recoganizedAs_doc
        self.acc_tolerance = acc_tolerance


    def rank(self, query, raw_string, res_num):
        corpus, _, pos_list = self.DataProcessor.build_corpus_for_bm25(raw_string, self.min_len_recoganizedAs_doc)
        query = self.DataProcessor.process_query(query)

        if len(query) == 0 or len(corpus) == 0:
            return []
            
        bm25 = BM25Okapi(corpus)
        doc_scores = bm25.get_scores(query)
        check_dict = {}
        for i in range(len(doc_scores)):
            check_dict[i] = doc_scores[i]

        res_idx = sorted(check_dict, key=check_dict.get, reverse=True)

        res = []
        for i in range(res_num):
            if i < len(res_idx):
                if(doc_scores[res_idx[i]] > self.acc_tolerance):
                    res.append(pos_list[res_idx[i]])
            else:
                break

        return res
        