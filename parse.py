import requests
import bs4
import re
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

def scrape(url):
    #stopwords and stemmer
    s_words = set(stopwords.words("english"))
    ps = PorterStemmer()

    #results holds counts for each element in links
    results = []
    try:
        r = requests.get(url)
    except Exception as e:
        print("Error with webpage")
        return -1

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

    """ #backup for if counting is needed, import collections
    tmp = Counter()
    for t in text:
        if t.parent.name not in blacklist:
            clean = re.sub(r'[^\w]', ' ', t) #removing symbols
            letters = clean.split()
            if letters != []:
                ctr = Counter(letters)
                tmp.update(ctr)
    """
    for t in text:
        if t.parent.name not in blacklist:
            cleaned = re.sub(r'[^\w]', ' ', t) #removing symbols
            letters = cleaned.split()
            if letters != []:
                for word in letters:
                    if word.isalpha() and word not in s_words: #only include words that consist of a-z and are not stopwords
                        results.append(ps.stem(word)) #stem

    #print(results)
    return results
