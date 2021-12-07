f = open("join.csv")
for line in f:
    l = line.replace("\n", "").split(",")
    print(l[-2]+","+l[-1])
