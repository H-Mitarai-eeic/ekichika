#!/bin/bash
cp backup.csv join.csv
file1=(`cat tokyoEkidata.csv`)
for line1 in "${file1[@]}"; do
  IFS=, ARR=(${line1})
  sed -i -e "s/${ARR[0]},${ARR[1]},${ARR[2]},/${ARR[0]},${ARR[1]},${ARR[2]},${ARR[9]},${ARR[10]},/g" join.csv
done