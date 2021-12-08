file1=(`cat setuzokuSu.csv`)
for line1 in "${file1[@]}"; do
  IFS=, ARR=(${line1})
  sed -i -e "s/,${ARR[2]},/,${ARR[2]},${ARR[3]},/g" ekiCodeGroupNameIdoKeido.csv
done
