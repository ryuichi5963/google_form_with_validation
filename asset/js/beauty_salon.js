// Splide
document.addEventListener("DOMContentLoaded", () => {
  const splide = new Splide("#slider", {
    type: "loop", // 無限ループ
    perPage: 3,
    perMove: 1,
    gap: "min(calc(22vw/7.68),40px)",
    focus: "center",
    breakpoints: {
      768: {
        perPage: 1,
      },
    },
    autoplay: true, // 自動再生を有効化 true or false
    interval: 2000, // 自動再生間隔（ミリ秒単位）
  });
  splide.mount();
});

//
// スムーススクロール
//
// 初期のheaderHeightを計算する関数
function calculateHeaderHeight() {
  return document.querySelector("header").offsetHeight + document.querySelector(".mv-container").offsetHeight - 68;
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
//
// PCでスクロール位置に応じてCSS変数を更新する関数
function updateScrollAdjustPc() {
  const scrollY = window.scrollY;
  const ScrollPosition = document.querySelector(".scroll");
  if (scrollY <= 534) {
    const newValue = `calc(min(calc(100vh - 70px) + ${scrollY}px, 534px) - 115px)`;
    ScrollPosition.style.setProperty("--scroll-adjust-pc", newValue);
  }
}

// ウィンドウのスクロールイベントを監視
window.addEventListener("scroll", () => {
  requestAnimationFrame(updateScrollAdjustPc);
});

//
//
// SPでスクロール位置に応じてCSS変数を更新する関数
function updateScrollAdjustSp() {
  const scrollY = window.scrollY;
  if (scrollY <= 620) {
    const newValue = `calc(min(calc(100vh - 70px) + ${scrollY}px, 620px) - 115px)`;
    document.documentElement.style.setProperty("--scroll-adjust-sp", newValue);
  }
}

// ウィンドウのスクロールイベントを監視
window.addEventListener("scroll", () => {
  requestAnimationFrame(updateScrollAdjustSp);
});
