#!/bin/bash
cp join_backup.csv join.csv
python3 lineToName.py > lineToNameTmp.csv
mv lineToNameTmp.csv join.csv
file1=(`cat ekiToName.csv`)
for line1 in "${file1[@]}"; do
  IFS=, ARR=(${line1})
  sed -i -e "s/${ARR[0]}/[${ARR[0]},${ARR[1]},${ARR[2]}]/g" join.csv
done

cat join.csv | grep "\],\[" > joinOnlyTokyo.csv
mv joinOnlyTokyo.csv join.csv


cat lineToName.csv | while read line
do
  col1=`echo ${line} | cut -d ',' -f 1`
  col2=`echo $col1 | cut -d ' ' -f 2`
  col1=`echo $col1 | cut -d ' ' -f 1`
  #  echo "Column1: ${col1} Column2: ${col2}"
  sed -i -e "s/L${col1}/${col1},${col2}/g" join.csv
done
sed "s/\[//g" join.csv | sed "s/\]//g" > joinnew.csv
mv joinnew.csv join.csv
