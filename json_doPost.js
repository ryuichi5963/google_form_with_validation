// function doGet(e) {
//   return doAction(e);
// }

function doPost(e) {
  return doAction(e);
}

// Web呼び出しへの応答
function doAction(e, debug) {
  // 応答データ作成
  var json = {};
  if (e.parameter.error) {
    throw new Error(e.parameter.error);
  } else {
    json = { v: 1 };
    var keys = Object.keys(e.parameter);
    for (var i = 0; i < keys.length; i++) {
      json[keys[i]] = e.parameter[keys[i]];
    }
  }

  // 戻り値作成
  var out = null;
  if (e.parameter.callback) {
    Logger.log("JSONP");
    var text = e.parameter.callback + "(" + (debug ? JSON.stringify(json, null, 2) : JSON.stringify(json)) + ")";
    out = ContentService.createTextOutput(text);
    out.setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    Logger.log(JSON.stringify(json, null, 2));
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
