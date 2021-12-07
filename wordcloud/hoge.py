f = open("join.csv")
for line in f:
    l = line.split(",")
    print(l[2], l[5])
