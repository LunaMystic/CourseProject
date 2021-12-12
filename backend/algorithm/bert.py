from transformers import AutoTokenizer, AutoModelForQuestionAnswering
from transformers import pipeline

class BERT():
    def __init__(self, max_ans_num = 20, acc_tolerance = 0.0001):
        model_name = "distilbert-base-cased-distilled-squad"
        self.predictor = pipeline('question-answering', model=model_name, tokenizer=model_name, top_k=max_ans_num)
        self.acc_tolerance = acc_tolerance
    
    def rank(self, query, raw_string, res_num):
        QA_input = {
            'question': query,
            'context': raw_string
        }
        
        res = []
        pred_res = self.predictor(QA_input)
        for single in pred_res:
            if single["score"] > self.acc_tolerance and len(res) < res_num:
                res.append([single["start"], single["end"]])

        return res
