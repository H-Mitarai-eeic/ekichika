#!/bin/bash
echo EkiFrom,EkiTo,Time,Transfer,Fare > norikaeData.csv
file1=(`cat ekiData.txt`)
file2=(`cat ekiData.txt`)
for line1 in "${file1[@]}"; do
  for line2 in "${file2[@]}"; do
    python3 main.py $line1 $line2 >> norikaeData.csv
  done
done
