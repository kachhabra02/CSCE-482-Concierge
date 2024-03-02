'''
Sources:
https://realpython.com/nltk-nlp-python/
https://realpython.com/python-nltk-sentiment-analysis/

'''

import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

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

'''
# Obtain the tokens from the input data
tokens = nltk.word_tokenize(example_sentence)

# Finds the different parts of speech from the tokenized text
tagged = nltk.pos_tag(tokens)

print(tagged)
'''
