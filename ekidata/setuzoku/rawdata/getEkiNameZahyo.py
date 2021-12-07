f = open("tokyoEkidata.csv")
for line in f:
    l = line.split(",")
    print(l[0], l[1], l[2], l[9], l[10], sep=",")
