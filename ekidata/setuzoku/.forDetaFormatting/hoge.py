f = open('tokyoEkidata.csv')
print("ekicode", "group_id", "name", "rosencode", "ido", "keido", sep=",")
n = set()
for line in f:
    l = line.split(',')
    print(l[0], l[1], l[2], l[5], l[9], l[10], sep=",")
