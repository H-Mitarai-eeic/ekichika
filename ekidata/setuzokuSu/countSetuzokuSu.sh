#!/bin/bash
file1=(`cat ekiOnlyName.csv`)
for line1 in "${file1[@]}"; do
  echo $line1,`cat ekiOnlyName3.csv | grep ,$line1, | wc -l`
done
