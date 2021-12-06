# %%
# Pandas読み込み
import pandas as pd
# csvのファイル名
csv_path = 'tokyoEkidata.csv'
# データフレーム読込
df_titanic = pd.read_csv(csv_path, header=0)
# ageで昇順ソート
df_titanic.sort_values(by=["sort"], ascending=True)

# print(df_titanic)
df_titanic
# %%
