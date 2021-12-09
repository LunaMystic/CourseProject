const axios = require('axios')
var data = {
  "model_name" : "BM25",
  "doc": "Gates wrote his first software program at the age of 13. In high school he helped form a group of programmers who computerized their school’s payroll system and founded Traf-O-Data, a company that sold traffic-counting systems to local governments. In 1975 Gates, then a sophomore at Harvard University, joined his hometown friend Paul G. Allen to develop software for the first microcomputers. They began by adapting BASIC, a popular programming language used on large computers, for use on microcomputers. With the success of this project, Gates left Harvard during his junior year and, with Allen, formed Microsoft. Sam is a student.",
  "query": "who is Bill Gates",
  "res_num": 2,
  "min_len_recoganizedAs_doc" : 100};

axios
  .post('http://localhost:8000/pred', data)
  .then(res => {
    console.log(res.data)
  })
  .catch(error => {
    console.error(error)
  })