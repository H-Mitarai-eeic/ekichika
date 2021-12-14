function clickBtn1() {
  let str = "";
  const color1 = document.form1.color1;

  for (let i = 0; i < color1.length; i++) {
    if (color1[i].checked) {//(color1[i].checked === true)と同じ
      str = color1[i].value;
      break;
    }
  }
  document.getElementById("span1").textContent = str;
}