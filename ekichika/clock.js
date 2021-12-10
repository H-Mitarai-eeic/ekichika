// setInterval(
function setClock(x, y) {

  var clk = document.getElementById('scale');
  var rect = clk.getBoundingClientRect();  // 画面左上を基準とする位置

  // document（ページ左上）からの絶対座標
  var x1 = clk.clientWidth / 2;
  var y1 = clk.clientHeight / 2;

  // console.log(x1, y1);

  var deg = Math.atan2((x - x1), -(y - y1)) * 360 / (2 * Math.PI);

  if (deg <= 0) {
    deg += 360;
  }
  var time = Math.round(deg / 6);
  // console.log(time);
  // 時間を取得
  var now = new Date();

  // 針の角度
  var deg_h = now.getHours() * (360 / 12) + now.getMinutes() * (360 / 12 / 60);
  // var deg_m = now.getMinutes() * (360 / 60);
  var deg_m = deg;
  var deg_s = now.getSeconds() * (360 / 60);
  document.getElementById("setTime").innerHTML = time + "分";
  // それぞれの針に角度を設定
  document.querySelector(".hour").style.transform = `rotate(${deg_h}deg)`;
  document.querySelector(".min").style.transform = `rotate(${deg_m}deg)`;
  // document.querySelector(".sec").style.transform = `rotate(${deg_s}deg)`;
};
// , 100);



window.onload = function () {
  // メモリを追加
  for (let i = 1; i <= 12; i++) {
    // scaleクラスの要素の最後にdiv要素を追加
    let scaleElem = document.querySelector(".scale");
    let addElem = document.createElement("div");
    scaleElem.appendChild(addElem);

    // 角度をつける
    document.querySelector(".scale div:nth-child(" + i + ")").style.transform = `rotate(${i * 30}deg)`;
  }
}

function muuXY(e, that) {
  if (!e) e = window.event;
  var x, y;
  if (e.targetTouches) {
    x = e.targetTouches[0].pageX - e.target.offsetLeft;
    y = e.targetTouches[0].pageY - e.target.offsetTop;
  } else if (that) {
    x = e.pageX - that.offsetLeft;
    y = e.pageY - that.offsetTop;
  }
  return [x, y];
}

document.getElementById('clock').onmousemove = function (e) {
  var xy = muuXY(e, this);
  // console.log('Xの座標は' + xy[0] + 'Yの座標は' + xy[1]);
  setClock(xy[0], xy[1]);
}