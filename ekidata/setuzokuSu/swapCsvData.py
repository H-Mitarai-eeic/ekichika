f = open("ekiCodeGroupNameIdoKeido.csv")
for line in f:
    l = line.replace("\n", "").split(",")
    print(l[0], l[1], l[2], l[4], l[5], l[3], sep=",")
