file1=(`cat newNoriire.csv`)
for line1 in "${file1[@]}"; do
  IFS=, ARR=(${line1})
  sed -i -e "s/,${ARR[0]},/,${ARR[0]},${ARR[1]},/g" data.csv
done
