def compareLists(small, big):
    return all(elem in big for elem in small)
