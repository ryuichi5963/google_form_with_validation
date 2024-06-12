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
// PC表示でoffsetHeightが660px未満のとき
// scrollのbottomを変化させる
//
// SP表示でoffsetHeightが680px未満のとき
// scrollを右横に
//
function setClassValue() {
  let windowOffsetHeight = document.documentElement.clientHeight;
  let windowOffsetWidth = document.documentElement.offsetWidth;

  const caption = document.querySelector(".caption");
  const captionContainer = caption.querySelector(".hd-container");
  const captionContainerP = caption.querySelector(".hd-container p");
  const scroll = document.querySelector(".scroll");

  // PC表示のscrollの調整
  if (windowOffsetWidth > 768) {
    if (windowOffsetHeight < 660) {
      scroll.style.bottom = "3px";
    } else {
      scroll.style.bottom = "0";
    }
  }

  // SP表示のcaptionの調整
  if (windowOffsetWidth <= 768) {
    if (windowOffsetHeight < 660) {
      scroll.style.right = "33px";
      captionContainer.style.alignItems = "center";
      captionContainerP.style.marginTop = "0";
    } else {
      scroll.style.right = "50%";
      captionContainer.style.alignItems = "flex-start";
      captionContainerP.style.marginTop = "calc(1.2 * clamp(var(--fs-15px), 26vh/10.53, var(--fs-26px)))";
    }
  }

  // SP->PC表示切り替えした時のcaptionの調整
  if (windowOffsetWidth > 768) {
    scroll.style.right = "33px";
    captionContainer.style.alignItems = "center";
    captionContainerP.style.marginTop = "0";
    captionContainerP.style.lineHeight = "";
  }
}

// ウィンドウのリサイズイベントを監視
window.addEventListener("resize", setClassValue);

// 初期設定を呼び出し
setClassValue();
