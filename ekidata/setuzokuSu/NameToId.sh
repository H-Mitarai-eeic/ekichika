file1=(`cat ekiToName.csv`)
for line1 in "${file1[@]}"; do
  IFS=, ARR=(${line1})
  sed -i -e "s/^${ARR[2]},/${ARR[0]},${ARR[1]},${ARR[2]},/g" setuzokuSu.csv
done
