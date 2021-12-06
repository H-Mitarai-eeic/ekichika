#!/bin/bash
file1=(`cat join.csv`)
for line1 in "${file1[@]}"; do
  IFS=, ARR=(${line1})
  echo ${ARR[2]} ${ARR[5]}
done
