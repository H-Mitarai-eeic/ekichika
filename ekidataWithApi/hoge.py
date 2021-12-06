f = open('tokyoEkidata.csv')
n = set()
for line in f:
    l = line.split(',')
    n.add(l[2])

for i in n:
    print(i)
