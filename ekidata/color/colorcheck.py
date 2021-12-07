f = open("color.csv")
for line in f:
    l = line.replace("\n", "").split(",")

    print(f"l[1]:\033[l[2];l[3];l[4];0;255m●ABC\033[0m")
