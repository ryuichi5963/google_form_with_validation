//
// DOM操作
//
function setClassValue() {
  let windowOffsetHeight = document.documentElement.clientHeight;
  let windowOffsetWidth = document.documentElement.offsetWidth;

  // PC表示でoffsetWidthが1024px以下のとき
  // 各見出しにpaddin-leftを設定
  const h1 = document.querySelector("h1");
  const h3 = document.querySelectorAll("h3");
  if (windowOffsetWidth <= 1024 && windowOffsetWidth >= 769) {
    // H1
    h1.style.paddingLeft = "10px";

    // H3 ３か所
    h3[0].style.paddingLeft = "10px";
    h3[1].style.paddingLeft = "10px";
    h3[3].style.paddingLeft = "10px";
  } else {
    // H1
    h1.removeAttribute("style");

    // H3 ３か所
    h3[0].removeAttribute("style");
    h3[1].removeAttribute("style");
    h3[3].removeAttribute("style");
  }

  // PC表示でoffseHigtが735px未満のとき
  // scroll位置の調整
  const scroll = document.querySelector(".scroll");
  if (windowOffsetHeight < 735 && windowOffsetWidth >= 769) {
    scroll.style.transform = "translate(300px,-22px)";
  } else {
    scroll.removeAttribute("style");
  }

  // PC表示でoffseHeigtが595px未満と465px未満のとき
  // titleとcaptionの位置の調整
  const title = document.querySelector(".title");
  const caption = document.querySelector(".caption");
  if (windowOffsetHeight < 465 && windowOffsetWidth >= 769) {
    title.style.top = "15%";
    caption.style.top = "15%";
    caption.style.transform = "translate(-9px,63%)";
  } else if (windowOffsetHeight < 595 && windowOffsetWidth >= 769) {
    title.style.top = "25%";
    caption.style.top = "18%";
    caption.style.transform = "translate(-9px,100%)";
  } else {
    title.removeAttribute("style");
    caption.removeAttribute("style");
  }

  // SP表示のとき.pickup .bottom-boxの
  // 高さとbottomを変更する
  const pickupBottomBox = document.querySelectorAll("#pickup .bottom-box");
  if (windowOffsetWidth <= 768) {
    pickupBottomBox[0].style.height = "66px";
    pickupBottomBox[0].style.bottom = "-65.4px";
  }

  // SP表示でoffsetWidthが580以上でoffsetHeigtが580px未満のとき
  // scroll位置の調整
  if (windowOffsetHeight < 580 && windowOffsetWidth <= 768 && windowOffsetWidth >= 580) {
    scroll.style.transform = "translate(240px,-30px)";
  } else if (windowOffsetWidth <= 768) {
    scroll.removeAttribute("style");
  }

  // PC表示でoffseHeigtが668px未満と450px未満のとき
  // titleとcaptionの位置の調整
  if (windowOffsetHeight < 450 && windowOffsetWidth <= 768) {
    title.style.top = "15%";
    caption.style.top = "15%";
    caption.style.transform = "translate(-9px,63%)";
  } else if (windowOffsetHeight < 668 && windowOffsetWidth <= 768) {
    title.style.top = "30%";
    caption.style.top = "30%";
    caption.style.transform = "translate(-9px,100%)";
  } else if (windowOffsetWidth <= 768) {
    title.removeAttribute("style");
    caption.removeAttribute("style");
  }

  // SP表示でSP表示でoffsetWidthが580未満で
  // offseHeightが585px未満のとき
  // headerの高さを585pxとする
  // それ以外はoffseHeigtが360px未満のとき
  // headerの高さを360pxとする
  const header = document.querySelector("header");
  if (windowOffsetHeight < 585 && windowOffsetWidth < 580 && windowOffsetWidth <= 768) {
    header.style.height = "585px";
  } else if (windowOffsetHeight < 360) {
    header.style.height = "360px";
  } else {
    header.removeAttribute("style");
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
