#!/bin/bash
file1=(`cat join.csv`)
for line1 in "${file1[@]}"; do
  IFS=, ARR=(${line1})
  time=`python3 main.py ${ARR[2]} ${ARR[5]}`
  echo ${ARR[0]},${ARR[1]},${ARR[2]},${ARR[3]},${ARR[4]},${ARR[5]},$time,${ARR[6]},${ARR[7]}
done
