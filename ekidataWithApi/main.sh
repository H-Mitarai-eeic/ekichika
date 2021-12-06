file=(`cat ekiNameList.txt`)
for line in "${file[@]}"; do
  data=`curl "http://express.heartrails.com/api/json?method=getStations&name=$line"`
  echo $line,$data
done
