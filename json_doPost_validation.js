// function doGet(e) {
//   return doAction(e);
// }

function doPost(e) {
  return doAction(e);
}

// Web呼び出しへの応答
function doAction(e, debug) {
  // 応答データ作成
  let json = {};

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const nameRegex = /^[\u30a0-\u30ff\u3040-\u309f\u3005\u3006\u4e00-\u9fcf\u3000]+$/;
  const hankakuRegex = /[\u0020-\u007E\uFF61-\uFF9F]/;
  const inquiryRegex = /^[\u30a0-\u30ff\u3040-\u309f\u3005\u3006\u4e00-\u9fcf\u3000Ａ-Ｚａ-ｚ０-９！”＃＄％＆’（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝～]+$/;
  let countRegex = 0;

  if (e.parameter.error) {
    throw new Error(e.parameter.error);
  } else {
    let keys = Object.keys(e.parameter);
    for (let i = 0; i < keys.length; i++) {
      json[keys[i]] = e.parameter[keys[i]];
    }

    // 名前のバリデーション
    if (!nameRegex.test(json.name)) {
      json.name = "全角の漢字、ひらがな、カタカナ、全角スペースを使用して入力してください";
      countRegex++;
    }

    // emailのバリデーション
    console.log(emailRegex.test(json.email));
    if (!emailRegex.test(json.email)) {
      json.email = "正しいメールアドレス形式で入力してください";
      countRegex++;
    }

    // 問い合わせのバリデーション
    if (!inquiryRegex.test(json.inquiry)) {
      json.inquiry = "全角文字で入力してください";
      countRegex++;
    }
  }

  // 戻り値作成
  let out = null;
  if (e.parameter.callback && countRegex > 0) {
    Logger.log("JSONP");
    var text = e.parameter.callback + "(" + (debug ? JSON.stringify(json, null, 2) : JSON.stringify(json)) + ")";
    out = ContentService.createTextOutput(text);
    out.setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    Logger.log(json);
    out = ContentService.createTextOutput(debug ? JSON.stringify(json, null, 2) : JSON.stringify(json));
    out.setMimeType(ContentService.MimeType.JSON);
  }
  return out;
}

// アクション呼び出し用テスト関数
function doTest() {
  var e = {
    parameter: {
      a: "abc",
      //error: 'xyz'            // コメントアウトで成功・失敗を分岐
    },
  };
  var out = doAction(e, true);
  Logger.log("MimeType: " + out.getMimeType());
  Logger.log("Content: \n" + out.getContent());
}
