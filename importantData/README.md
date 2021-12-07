# 重要なデータ

## join.csv

都内の隣接駅について,区切りで

`fromID,fromGroupID,fromName,toID,toGroupID,toName,time,routeID,routeName`



が入っています．

都内の接続情報が入っていますが，A->Bが入っている場合B->Aは入っていないことに注意してください．


## ekiCodeGroupNameIdoKeidoNoriire.csv

都内の全ての駅について,区切りで
`ekicode,groupcode,name,ido,keido,noriire`
が入っています．

最初の読み込み時に駅データを取り込んで，その構造体に接続情報をjoin.csvから付加するイメージです．
