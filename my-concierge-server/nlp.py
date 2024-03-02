'''
Sources:
https://realpython.com/nltk-nlp-python/
https://realpython.com/python-nltk-sentiment-analysis/
https://www.youtube.com/watch?v=M7SWr5xObkA&t=12s

'''

import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
import spacy
import torch

nlp = spacy.load("en_core_web_trf")
doc = nlp("Here is some text to encode.")

class Category:
  BOOKS = "BOOKS"
  BANK = "BANK"

train_x = ["good characters and plot progression", "check out the book", "good story. would recommend", "novel recommendation", "need to make a deposit to the bank", "balance inquiry savings", "save money"]
train_y = [Category.BOOKS, Category.BOOKS, Category.BOOKS, Category.BOOKS, Category.BANK, Category.BANK, Category.BANK]

from sklearn import svm

docs = [nlp(text) for text in train_x]
train_x_vectors = [doc.vector for doc in docs]
clf_svm = svm.SVC(kernel='linear')

print(docs)
print(train_x_vectors)

clf_svm.fit(train_x_vectors, train_y)

test_x = ["check this story out"]
docs = [nlp(text) for text in test_x]
test_x_vectors = [doc.vector for doc in docs]

clf_svm.predict(test_x_vectors)

'''
# Download everything that nltk will need
#nltk.download('all')

# Data to be used for nlp analysis
example_text = """
Muad'Dib learned rapidly because his first training was in how to learn.
And the first lesson of all was the basic trust that he could learn.
It's shocking to find how many people do not believe they can learn,
and how many more believe learning to be difficult."""

sentences = sent_tokenize(example_text)

print(sentences)

# Obtain the tokens from the input data
tokens = nltk.word_tokenize(example_sentence)

# Finds the different parts of speech from the tokenized text
tagged = nltk.pos_tag(tokens)

print(tagged)
'''
