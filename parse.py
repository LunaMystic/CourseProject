from googlesearch import search   
import requests
import bs4
from collections import Counter
import re
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from rank_bm25 import BM25Okapi


#prerequisites (subject to change)
# pip install rank_bm25
# pip install nltk
# pip install bs4
# pip install googlesearch-python
# python -m nltk.downloader stopwords              

#query, can make it take it from some argument
query = "halo"

#get links, num = how many links you want
links = []
for i in search(query, tld="com", lang='en', num=10, start = 0, stop=10, pause=2): 
    links.append(i)
print(links)

#stopwords and stemmer
stopwords = set(stopwords.words("english"))
ps = PorterStemmer()

#results holds counts for each element in links
results = []

for url in links:#change later to all links, just first 2 for testing purposes
    print(url)
    try:
        r = requests.get(url)
    except Exception as e:
        print("Error with webpage")
        continue

    soup = bs4.BeautifulSoup(r.content,"html.parser")
    text = soup.find_all(text=True)

    #elements not wanted, might need some changes
    blacklist = [
        '[document]',
        'noscript',
        'html',
        'meta',
        'head', 
        'input',
        'script',
        'style',
        'a',
    ]

    """ #backup for if counting is needed
    tmp = Counter()
    for t in text:
        if t.parent.name not in blacklist:
            clean = re.sub(r'[^\w]', ' ', t) #removing symbols
            letters = clean.split()
            if letters != []:
                ctr = Counter(letters)
                tmp.update(ctr)
    """
    tmp = []
    for t in text:
        if t.parent.name not in blacklist:
            clean = re.sub(r'[^\w]', ' ', t) #removing symbols
            letters = clean.split()
            if letters != []:
                for word in letters:
                    if word.isalpha() and word not in stopwords: #only include words that consist of a-z and are not stopwords
                        tmp.append(ps.stem(word)) #stem
    results.append(tmp)

"""
for r in results:
    print(r)
    print()
"""

#calculate bm25 scores for all documents
bm25 = BM25Okapi(results)
scores = bm25.get_scores(query.split(" "))
print(scores)

#combine scores with links and sort?
final_eval = list(zip(scores,links)) #can zip the corpus if a summary is needed
final_eval.sort(key = lambda x: x[0], reverse = True) #rank by highest  
print(final_eval)
