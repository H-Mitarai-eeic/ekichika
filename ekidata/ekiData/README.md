# 乗り換え情報取得プログラム

乗り換え情報を取得するプログラムを書きました（12/5最終更新）

## 仕様

`ekiData.txt`に駅一覧が以下の様に並んでいる時，
```
東大前
後楽園
飯田橋
```

`norikaeData.csv`「,」区切りで乗り換え情報を書き込みます．
```csv
EkiFrom,EkiTo,Time,Transfer,Fare
東大前,後楽園,3,0,168
東大前,飯田橋,5,0,168
後楽園,東大前,3,0,168
後楽園,飯田橋,2,0,168
飯田橋,東大前,5,0,168
飯田橋,後楽園,2,0,168
```



## 実装

```
getNorikaeTime
├── README.md
├── ekiData.txt
├── main.py
├── main.sh
└── norikaeData.csv
```

このような構造になっています．簡単に解説します．

### main.py


`python3 hoge fuga`
でYahoo乗り換え案内に対して駅hoge,fugaに向かう際に必要な __時間，乗り換え回数，料金を返します．__

（ただし，この乗り換えコースは，候補の経路のうち，最も早く到着できる経路になっています．すなわち，もっと乗り換え回数を少なくしたり，運賃が安くなる可能性はあります．）

### main.sh

```
東大前
後楽園
飯田橋
```

の様に駅名が改行区切りで並んでいる`ekiData.txt`に対して，(自分．自分)を除く2点間に対してmain.pyを実行し，norikaeData.csvに書き込みます．

> 僕たちの実装方針的には，__「ある駅からの隣接ノードに対する検索」__ だけでよくなるはずですが，まだ駅一覧を入手していないのでとりあえずこれで実装しました．あとで変えましょう．

> A to B, B to A が重複していますが，両方あった方が何かと楽そう？．