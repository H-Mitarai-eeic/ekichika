f = open('join.csv')
# print("ekicode", "name", sep=",")
for line in f:
  line = line.replace('\n', '')
  l = line.split(',')
  print(l[1], l[2], "L" + l[0], sep=",")
