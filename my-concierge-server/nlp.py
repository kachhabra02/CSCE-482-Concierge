import nltk

# Download everything that nltk will need
nltk.download('all')

# Data to be used for nlp analysis
example_sentence = "At eight o'clock on Thursday morning Arthur didn't feel very good."

# Obtain the tokens from the input data
tokens = nltk.word_tokenize(example_sentence)

# Finds the different parts of speech from the tokenized text
tagged = nltk.pos_tag(tokens)

print(tagged)