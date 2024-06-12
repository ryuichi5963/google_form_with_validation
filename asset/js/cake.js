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

//
// offsetHeightが480px未満のとき
// .inner_star01のmarginを変化させる
//
function setClassValue() {
  let windowOffsetHeight = document.documentElement.clientHeight;
  let windowOffsetWidth = document.documentElement.offsetWidth;

  const header = document.querySelector("header");
  const scroll = document.querySelector(".scroll");

  // PC表示で高さが768px未満で幅が768pxを超える
  if (windowOffsetHeight < 768 && windowOffsetWidth > 768) {
    header.style.height = "1064px";
    scroll.style.transform = "translate(0, calc(-560%))";
    scroll.style.filter = "drop-shadow(2px 4px 1px var(--font-base))";
  } else if (windowOffsetWidth <= 768) {
    header.style.height = "1000px";
    scroll.style.transform = "translate(0, -100%)";
    scroll.style.filter = "none";
  } else {
    header.style.height = "min(100vh,1064px)";
    scroll.style.transform = "translate(0, -100%)";
    scroll.style.filter = "none";
  }
}

// ウィンドウのリサイズイベントを監視
window.addEventListener("resize", setClassValue);

// 初期設定を呼び出し
setClassValue();
