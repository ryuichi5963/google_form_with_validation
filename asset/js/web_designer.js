//
// スクロールバーが表示されているときの
// スクロールダウンの位置決め
//
const setScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  // カスタムプロパティの値を更新する
  document.documentElement.style.setProperty("--scrollbar", `${scrollbarWidth}px`);
};

// 表示されたとき
window.addEventListener("load", setScrollbarWidth);
// リサイズしたとき
window.addEventListener("resize", setScrollbarWidth);

//
// DOM操作
//
function setClassValue() {
  let windowOffsetHeight = document.documentElement.clientHeight;
  let windowOffsetWidth = document.documentElement.offsetWidth;

  // PC表示でoffsetWidthが906px未満のとき
  // captionのbottomを変化させる
  const caption = document.querySelectorAll(".caption");
  if (windowOffsetWidth < 906 && windowOffsetWidth >= 769) {
    caption[0].style.top = "56%";
  } else {
    caption[0].style.top = "";
  }

  //
  // PC表示のheaderの調整
  // windowOffsetHeightが765未満の時
  //
  const titleH2 = document.querySelectorAll(".title h2");
  const titleP = document.querySelectorAll(".title p");
  const captionP = caption[0].querySelectorAll("p");
  if (windowOffsetWidth >= 769 && windowOffsetHeight < 765) {
    titleH2[0].style.fontSize = "calc(80vw/14.4)";
    titleP[0].style.fontSize = "calc(45vw/14.4)";
    titleP[1].style.fontSize = "calc(24vw/14.4)";
    captionP[0].style.fontSize = "calc(24vw/14.4)";
    caption[0].style.transform = "translate(50%,60%)";
    caption[0].style.height = "calc(145vw/14.4)";
    caption[0].style.width = "calc(568vw/14.4)";
  } else {
    titleH2[0].removeAttribute("style");
    titleP[0].removeAttribute("style");
    titleP[1].removeAttribute("style");
    captionP[0].removeAttribute("style");
    caption[0].style.transform = "";
    caption[0].style.height = "";
    caption[0].style.width = "";
  }

  // SP表示でOffsetHeightが560px未満のとき
  //
  if (windowOffsetHeight < 560 && windowOffsetWidth <= 768) {
    titleH2[0].style.fontSize = "calc(80vw/14.4)";
    titleP[0].style.fontSize = "calc(45vw/14.4)";
    titleP[1].style.fontSize = "max(12px,calc(24vw/14.4))";
    captionP[0].style.fontSize = "max(12px,calc(24vw/14.4))";
    caption[0].style.transform = "translate(50%,60%)";
    caption[0].style.height = "calc(145vw/14.4)";
    caption[0].style.width = "calc(568vw/14.4)";
  } else if (windowOffsetWidth <= 768) {
    titleH2[0].removeAttribute("style");
    titleP[0].removeAttribute("style");
    titleP[1].removeAttribute("style");
    captionP[0].removeAttribute("style");
    caption[0].style.transform = "";
    caption[0].style.height = "";
    caption[0].style.width = "";
  }

  // PC表示でoffsetWidthが1080px未満のとき
  // scrollのrightを変化させる
  const scroll = document.querySelectorAll(".scroll");
  if (windowOffsetWidth < 1080 && windowOffsetWidth >= 769) {
    scroll[0].style.right = "40px";
  } else {
    scroll[0].removeAttribute("style");
  }

  // PC表示でoffsetWidthが1040px未満のとき
  // detail top-boxのrightを変化させる
  // 各見出しに右paddingを付与
  const detailTopbox = document.querySelectorAll(".detail .top-box");
  const h1 = document.querySelectorAll("h1");
  const detailH3 = document.querySelectorAll(".detail h3");
  const informationH3 = document.querySelectorAll(".information h3");
  if (windowOffsetWidth < 1040 && windowOffsetWidth >= 769) {
    detailTopbox[0].style.right = "20px";
    h1[0].style.paddingLeft = "10px";
    detailH3[0].style.paddingLeft = "10px";
    informationH3[0].style.paddingLeft = "10px";
  } else {
    detailTopbox[0].removeAttribute("style");
    h1[0].removeAttribute("style");
    detailH3[0].removeAttribute("style");
    informationH3[0].removeAttribute("style");
  }

  // SP表示でOffsetHeightが700px未満のとき
  // captionの幅とscroll位置を変化させる
  if (windowOffsetHeight < 700 && windowOffsetWidth <= 768) {
    caption[0].style.width = "300px";
    scroll[0].style.right = "30px";
  } else if (windowOffsetWidth <= 768) {
    caption[0].removeAttribute("style");
    scroll[0].removeAttribute("style");
  }

  // SP表示のとき.pickup .bottom-boxの
  // 高さとbottomを変更する
  const pickupBottomBox = document.querySelectorAll("#pickup ");
  console.log(pickupBottomBox);
  if (windowOffsetWidth <= 768) {
    pickupBottomBox[0].style.height = "66px";
    pickupBottomBox[0].style.bottom = "-65.4px";
  }

  // offsetWidthが961px未満のとき
  // processのh3 span のクラスを変化させる
  const processH3Span = document.querySelectorAll(".process h3 span");
  if (windowOffsetWidth < 961) {
    console.log(processH3Span);
    processH3Span[0].classList.remove("long");
    processH3Span[0].classList.add("short");
  } else {
    processH3Span[0].classList.remove("short");
    processH3Span[0].classList.add("long");
  }
}

// ウィンドウのリサイズイベントを監視
window.addEventListener("resize", setClassValue);

// 初期設定を呼び出し
setClassValue();

//
// スムーススクロール
//
// 初期のheaderHeightを計算する関数
function calculateHeaderHeight() {
  return document.querySelector("header").offsetHeight;
}

// ウィンドウのリサイズ時にheaderHeightを更新する関数
function updateHeaderHeight() {
  headerHeight = calculateHeaderHeight();
}

// 初期のheaderHeightを計算
let headerHeight = calculateHeaderHeight();

// ウィンドウのリサイズ時にheaderHeightを更新
window.addEventListener("resize", updateHeaderHeight);

// querySelectorAllメソッドを使用してページ内のhref属性が#で始まるものを選択
// forEachメソッドを使って、各アンカータグにクリックされた時の処理
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // クリックされたときのデフォルトの挙動を防ぐ
    e.preventDefault();

    // スクロール位置がheaderHeightの下になるように調整
    const targetPosition = headerHeight;

    // window.scrollTo()を呼び出して、スクロール位置を設定
    // behaviorオプションをsmoothに設定
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});
