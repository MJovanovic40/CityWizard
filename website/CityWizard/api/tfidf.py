import nltk
# nltk.download('punkt')
import numpy as np
import os
import math
import sys
from nltk.stem import SnowballStemmer
from nltk.tokenize import word_tokenize, sent_tokenize

stemmer = SnowballStemmer('english')
stems = {}


def __input_addresses():
    # corpus_address = input()
    # file_address = input()
    corpus_address = "corpus"
    file_address = "corpus/Lorem Ipsum.txt"
    return corpus_address, file_address


def __output_result(tf_idf, summary, city_name):
    output_length = 10
    if len(tf_idf) < 10:
        output_length = len(tf_idf)

    output_words = tf_idf[0][0]
    for i in range(1, output_length):
        output_words += ", " + tf_idf[i][0]

    output_dir = "api/summaries"
    output_file = output_dir + "/" + city_name + ".txt"
    # output_file = city_name + ".txt"
    # print(output_words)
    # print(output_file)
    # print(*summary)

    with open(output_file, "w+", encoding="utf-8") as f:
        for row in summary:
            f.write(row)

    return


def __read_data(file_address):
    with open(file_address, encoding="UTF-8") as document:
        doc_text = document.read()
        return doc_text


def __stem_words(doc_text):
    words = word_tokenize(doc_text)

    stemmed_words = []
    for i in range(len(words)):
        x = stemmer.stem(words[i])
        if x not in stemmed_words and x.isalnum():
            stemmed_words.append(x)

    return stemmed_words


def __get_tfs_from_text(doc_text):
    words = word_tokenize(doc_text)

    stemmed_words = []
    for i in range(len(words)):
        x = stemmer.stem(words[i])
        if x.isalnum():
            stemmed_words.append(x)

    tfs = {}
    for i in stemmed_words:
        if i not in tfs:
            tfs[i] = 1
        else:
            tfs[i] += 1

    return tfs


def __calculate_idfs(filename):
    idfs = {}
    k = {}
    n = len(stems.keys())
    target_file = stems[filename]
    for word in target_file:
        for i in stems:
            if word in stems[i] and word not in k:
                k[word] = 1
            elif word in stems[i]:
                k[word] += 1

        idfs[word] = math.log(n / k[word])
    return idfs


def __setup_stems_from_files(path):
    for filename in os.listdir(path):
        if ".txt" not in filename:
            __setup_stems_from_files(path + "/" + filename)
        else:
            if filename not in stems:
                # print(path + "/" + filename)
                data = __read_data(path + "/" + filename)
                stems[filename] = __stem_words(data)


def __make_summary(tf_idf, file_path):
    sentences = sent_tokenize(__read_data(file_path))
    relevance = []
    for sentence in sentences:
        words = word_tokenize(sentence)
        stemmed_words = []
        for i in range(len(words)):
            x = stemmer.stem(words[i])
            if x.isalnum():
                stemmed_words.append(x)

        score = 0
        counted_words = 0
        for i in range(len(tf_idf)):
            for word in stemmed_words:
                if word == tf_idf[i][0]:
                    score += tf_idf[i][1]
                    counted_words += 1
                    if counted_words == 10:
                        break
            if counted_words == 10:
                break

        relevance.append(score)

    top_5_idx_2 = []
    top_5_val_2 = []
    for j in range(5):
        max_val = -1
        index = -1
        for i in range(len(relevance)):
            if relevance[i] > max_val and i not in top_5_idx_2:
                max_val = relevance[i]
                index = i
        top_5_idx_2.append(index)
        top_5_val_2.append(relevance[index])
    top_5_idx_2.sort()

    # top_5_idx = np.argsort(relevance)[-5:]
    # top_5_idx.sort()

    # print(top_5_idx_2)

    summary = []
    for i in top_5_idx_2:
        summary.append(sentences[i])
    return summary


def __main(corpus_path, file_path, city_name):
    # corpus_path, file_path = input_addresses()

    path, filename = os.path.split(file_path)
    tfs = __get_tfs_from_text(__read_data(file_path))

    __setup_stems_from_files(corpus_path)
    idfs = __calculate_idfs(filename)

    tf_idf = []
    for word in tfs:
        tf_idf.append([word, tfs[word] * idfs[word]])

    tf_idf.sort(key=lambda x: x[0])
    tf_idf.reverse()
    tf_idf.sort(key=lambda x: x[1])
    tf_idf.reverse()

    summary = __make_summary(tf_idf, file_path)

    sys.stdout.reconfigure(encoding='utf-8')
    __output_result(tf_idf, summary, city_name)


def Summary(city_name):
    article_dir = "api/articles"
    file = article_dir + "/" + city_name + ".txt"
    __main(article_dir, file, city_name)
