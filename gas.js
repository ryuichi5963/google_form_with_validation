function ReplyEmail(e) {
  //回答を取得
  const name = e.namedValues["氏名"][0];
  const address = e.namedValues["住所"][0];
  const gender = e.namedValues["性別"][0];
  const birthday = e.namedValues["生年月日"][0];
  const email = e.namedValues["メールアドレス"][0];
  const inquiry = e.namedValues["問い合わせ内容"][0];

  //問い合わせ番号を取得 (スプレッドシートに既に書き込まれた後の処理)
  // const sheet = SpreadsheetApp.getActiveSheet();

  // スプレッドシートのIDを指定
  const spreadsheetId = "1KRSjVKGvvc2HQR-p4ghXRRAwY0SrlT72otVwTLBeHAo";

  // シート名を指定
  const sheetName = "フォームの回答 5";

  // 特定のスプレッドシートを取得
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  // スプレッドシート内の特定のシートを取得
  const sheet = spreadsheet.getSheetByName(sheetName);

  // gidを指定したいが、spreadsheet.getSheetByIdというメソッドはないため、上記のようにシート名を指定する
  // const sheetId = '1917744377';
  // const sheet = spreadsheet.getSheetById(sheetId);

  // ここでsheetを使用して作業を行う
  const number = sheet.getLastRow();

  //メールの件名
  const subject = "[問い合わせ番号：" + number + "] お問い合わせを受け付けました";

  //メールの本文
  const body = name + " 様。お問い合わせいただき、ありがとうございました。\n" + "以下の内容で受け付けました。\n" + "\n" + "----------------------------------\n" + "氏名：" + name + "\n" + "住所：" + address + "\n" + "性別：" + gender + "\n" + "生年月日：" + birthday + "\n" + "メールアドレス：" + email + "\n" + "お問い合わせ内容：" + inquiry + "\n" + "----------------------------------\n" + "\n" + "回答まで、２・３営業日かかる場合がございます。ご了承ください。\n" + "\n";

  //メールを送信する
  GmailApp.sendEmail(email, subject, body, {
    name: "Ryuichi mineo",
    from: "znnc59038@mineo.jp",
  });

  //管理者あてにメールを送信する
  MailApp.sendEmail({
    to: "niemand235@herb.ocn.ne.jp",
    subject: "【管理者宛】問い合わせがありました",
    body: "[問い合わせ番号：" + number + "] \n" + "問い合わせがありましたので、下記の内容でメールを自動送信しました\n" + "\n" + body,
  });
}
