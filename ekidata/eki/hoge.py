f = open('kuEkidata.csv')
n = set()
for line in f:
    l = line.split(',')
    print(l[2], l[9], l[10])
