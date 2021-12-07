f = open('line20210312free.csv')
print("ekicode", "name", sep=",")
for line in f:
  l = line.split(',')
  print(l[0], l[4], sep=",")
