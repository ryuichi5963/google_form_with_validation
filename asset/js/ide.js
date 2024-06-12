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
// PC表示でoffsetWidthが1019px以下のとき
// .about-textにwidthを与える
//
function setClassValue() {
  let windowOffsetWidth = document.documentElement.offsetWidth;

  const target = document.querySelector(".about-text");
  const targetSpan = target.querySelectorAll("span");

  if (windowOffsetWidth > 768 && windowOffsetWidth <= 1019) {
    targetSpan[1].style.width = "190px";
  } else {
    targetSpan[1].style.width = "auto";
  }
}

// ウィンドウのリサイズイベントを監視
window.addEventListener("resize", setClassValue);

// 初期設定を呼び出し
setClassValue();

//
// SP表示でoffsetWidthが特定の横幅以上のとき
// text-align centerを与える
//
function setClassValue2() {
  let windowOffsetWidth = document.documentElement.offsetWidth;

  const target = document.querySelectorAll(".pickup-content");
  const target_0_P = target[0].querySelectorAll("p");
  const target_1_P = target[1].querySelectorAll("p");
  const target_2_P = target[2].querySelectorAll("p");

  if (windowOffsetWidth == 768) {
    target_0_P[1].style.textAlign = "center";
  } else {
    target_0_P[1].style.textAlign = "left";
  }

  if (windowOffsetWidth >= 641 && windowOffsetWidth <= 768) {
    target_1_P[1].style.textAlign = "center";
  } else {
    target_1_P[1].style.textAlign = "left";
  }

  if (windowOffsetWidth >= 529 && windowOffsetWidth <= 768) {
    target_2_P[1].style.textAlign = "center";
  } else {
    target_2_P[1].style.textAlign = "left";
  }
}

// ウィンドウのリサイズイベントを監視
window.addEventListener("resize", setClassValue2);

// 初期設定を呼び出し
setClassValue2();
