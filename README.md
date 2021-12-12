# Better Search Box Chrome Extension

## Overview of Functions
Better Search Box is a chrome extension, designed to match a user query with relevant text within a webpage. Chrome has similar built in functionality in the form of Control+F, however that only searches for exact strings. Better Search Box will find relevant text on the webpage, and highlight them.

## Implementation Documentation
Better Search Box is written with a JavaScript frontend and Python backend. The frontend creates a user interface in the form of a popup, and handles most of the work except for the text ranking. We use multiple Chrome APIs such as tabs in the project. The frontend functions much like a standard Chrome Extension, using messaging to accomplish communication between the extension and the browser. Once the query is created, the query and text are sent to the Python backend based on Sanic. 

The backend will handle both data preprocessing and prediction tasks. The prediction module includes Okapi BM25 and Distilbert algorithms. The BM25 part will separate the single input document into multiple sub-documents following specific strategies and feed them to the algorithm with the query to get the most relevant segments. In the Bert part, we finally choose to use Distilbert for the shorter response time due to all the computations running locally.

The prediction results then will be sent back to the frontend. The webpage is then highlighted by adjusting the HTML of the webpage with the relevant sentences.

## Usage Documentation
For a mac or linux user, simply run [sh setup.sh] to install dependencies and run the server

Otherwise, install the prerequisites manually:
```
Use Python 3.7 and pip
pip install sanic
pip install transformers
pip install rank_bm25
pip install pipeline
```

A windows user can probably run it using the same commands in a command prompt, provided they have python and pip installed, however it is not recommended/tested. We suggest using WSL or a VM.

### To install the extension:
Open Chrome
Go to page chrome://extensions/
Activate 'Developer Mode' in the top right
Click 'Load Unpacked' in the top left
Redirect to folder CourseProject/extension and hit 'Select Folder'

### To run the server:
make sure prerequisites are fullfilled and run python backend/app.py

### To use the extension:
Google search a subject and click on a link, which will automatically highlight text. Otherwise, manually query by clicking the extension in the top right, enter your query, and click run.

Features:
* Auto fetch the query entered during google search page
* Auto perform similarity search when navigate out from google
* Perform similarity search based on user specific query
* Perform simple BERT based on user specific query
* Highlighting

Tips:
* Try to type your query in manually and click the "BERT" button if you have specific questions like "What's the birth date of Bill Gates?" and the default setting doesn't give you the desired results.
* When you use our extension with the default setting, a set of keywords will be preferred. However, when you use the "BERT" function to search for the answers, enter a complete sentence to get more accurate answers. 

Shortcut:
<kbd>Ctrl (⌘ for Mac) + Shift + Z</kbd>
Video tutorial here: https://www.youtube.com/watch?v=Xmho9pgFnyc

### Future Work:
We have implemented everything covered in proposal. However as this idea is pretty interesting and practical we have some idea of future works 
* Supporting highlight more ambigious html element
* Prettify the popup window
* Add support to more methods besides BM25
* Future implementation of BERT to answer qustion with specific answer that includes in the web page (such as "Who is CEO of Tesla" in Tesla web page)
* Currently, the BM25 will give a high score to the reference list on the page. We have noticed this problem and plan to resolve it in the future by either letting the users choose the number of prediction results shown on the page or adding more rules in the algorithm to filter out these references.