f = open('tokyoEkidata.csv')
print("ekicode", "groupid", "name", sep=",")
for line in f:
  l = line.split(',')
  print(l[0], l[1], l[2], sep=",")
