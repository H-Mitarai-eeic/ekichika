# 重要なデータ

## join.csv

都内の隣接駅について,区切りで

`fromID,fromGroupID,fromName,toID,toGroupID,toName,time,routeID,routeName`



が入っています．

都内の接続情報が入っていますが，A->Bが入っている場合B->Aは入っていないことに注意してください．


## daihyoEkiData.csv

都内の全ての，駅の名前について,区切りで

`groupcode,name,ido,keido,noriire`
が入っています．

ekiCodeGroupNameIdoKeidoNoriire.csvは同名でも全ての駅を別の駅として扱っているのに対し，，(例えば井の頭線渋谷駅と山手線渋谷駅を別の駅)，こちらは一つの駅として扱っています．

また，緯度経度は同名の駅全ての重心になっています．

※こちらを表示に使う予定です．


## ekiCodeGroupNameIdoKeidoNoriire.csv

都内の全ての駅について,区切りで
`ekicode,groupcode,name,ido,keido,noriire`
が入っています．

最初の読み込み時に駅データを取り込んで，その構造体に接続情報をjoin.csvから付加するイメージです．

## color.csv

都内の路線について，Wikipediaに載っている情報を元に，色をrgbで記載しています.
