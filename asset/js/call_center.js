//
// PC表示でoffsetWidthが1142px未満のとき
// scrollのrightを変化させる
//
function setClassValue() {
  let windowOffsetHeight = document.documentElement.clientHeight;
  let windowOffsetWidth = document.documentElement.offsetWidth;

  const headerPosition = document.querySelector("header");
  const hdcontainer = document.querySelectorAll(".hd-container");
  const scroll = document.querySelectorAll(".scroll");
  const spDisp = document.querySelector(".inner h2 .sp-disp");

  // PC表示のscrollの調整
  if (windowOffsetWidth < 1142) {
    scroll[0].style.right = "10px";
  } else {
    scroll[0].removeAttribute("style");
  }

  // PC表示のheaderの調整
  if (windowOffsetWidth >= 769 && windowOffsetHeight < 760) {
    headerPosition.style.position = "relative";
    headerPosition.style.height = "950px";
    headerPosition.style.padding = "50px 0 0 0";
    hdcontainer[1].style.height = "523px";
    hdcontainer[2].style.height = "358px";
  } else {
    headerPosition.removeAttribute("style");
    hdcontainer[1].removeAttribute("style");
    hdcontainer[2].removeAttribute("style");
  }

  // SP表示のscrollの調整(cssでinline-blockしているため)と改行非表示
  if (windowOffsetHeight < 564 && windowOffsetWidth < 769) {
    scroll[1].style.right = "10px";
    spDisp.style.display = "none";
  } else {
    scroll[1].removeAttribute("style");
    spDisp.removeAttribute("style");
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
