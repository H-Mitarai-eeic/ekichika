import re
import requests
from bs4 import BeautifulSoup
import sys
args = sys.argv

ekiFrom = args[1]
ekiTo = args[2]

if (ekiTo == ekiFrom):
  exit(0)


def getTime(data):
  data = str(data)
  data = set((re.sub('[^0-9,:]', ',', data)).split(","))
  ans = 0
  for str_d in data:
    if (0 < len(str_d) < 3):
      ans = str_d
  return ans


def getTransfer(data):
  data = str(data)
  # return data.split('分')[0]
  data = set((re.sub('[^0-9,px]', ',', data)).split(","))

  ans = 0
  for str_d in data:
    if (0 < len(str_d) < 3):
      ans = str_d
  return ans


def getFare(data):
  data = str(data)
  # return data.split('分')[0]
  return re.sub('[^0-9]', '', data)


url = "https://transit.yahoo.co.jp/search/result?from=" + ekiFrom + "&to=" + ekiTo + "&fromgid=&togid=&flatlon=&tlatlon=&via=&viacode=&y=2021&m=12&d=06&hh=12&m1=0&m2=0&type=1&ticket=ic&expkind=1&userpass=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1&"
# url = "https://transit.yahoo.co.jp/search/result?from=%E6%9D%B1%E5%A4%A7%E5%89%8D&to=%E5%BE%8C%E6%A5%BD%E5%9C%92&fromgid=&togid=&flatlon=&tlatlon=&via=&viacode=&y=2021&m=12&d=06&hh=12&m1=0&m2=0&type=1&ticket=ic&expkind=1&userpass=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1&"
res = requests.get(url)
# print(res.text)
soup = BeautifulSoup(res.text, "html.parser")

# elems = soup.select("#rsltlst > li:nth-child(1) > dl > dd")
time = soup.find('li', 'time')
fare = soup.find('li', 'fare')
transfer = soup.find('li', 'transfer')

print(ekiFrom, ekiTo, getTime(time), getTransfer(transfer), getFare(fare), sep=',')
# print(getTransfer(transfer))
# print(getFare(fare))