f = open("tmp.csv")
ido = 0
keido = 0
groupid = ""
name = ""
num = 1
noriire = 0
for line in f:
    l = line.replace("\n", "").split(',')
    if (l[2] == name):
        ido += float(l[3])
        keido += float(l[4])
        num += 1
    else:
        print(groupid, name, ido/num, keido/num, noriire)
        groupid = l[1]
        name = l[2]
        ido = float(l[3])
        keido = float(l[4])
        noriire = l[5]
        num = 1
