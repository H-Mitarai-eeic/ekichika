ESC=$(printf '\033')
file1=(`cat color.csv`)
for line1 in "${file1[@]}"; do
  IFS=, ARR=(${line1})
  echo -n "${ESC}[48;2;${ARR[2]};${ARR[3]};${ARR[4]}m${ARR[1]}${ESC}[m"
done
