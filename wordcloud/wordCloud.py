import matplotlib.pyplot as plt
from wordcloud import WordCloud
import MeCab
f = open("ekiOnlyName.csv")
text = f.read()
f.close()
fpath = "/Library/Fonts/ヒラギノ角ゴシック W3.ttc"
basecloud = WordCloud(background_color="rgb(1,22,39)", font_path=fpath,
                      width=600, height=400, min_font_size=15).generate(text)
# wordcloud = WordCloud(background_color="white", font_path=fpath,
# width=600, height=400, min_font_size=15)
# wordcloud.generate(word)
plt.imshow(basecloud)
plt.axis('off')
plt.show()
