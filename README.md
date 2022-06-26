# 爸爸的私房錢-專案練習

使用 Node.js + Express 來記錄消費支出的網頁應用，可以註冊擁有自己的帳號，透過登入自己的帳號來紀錄自己的消費，達到CRUD的功能(如新增、修改、刪除餐廳資料等功能)，同時可依照消費的類型來篩選資料，並且查看消費總額。

## Features - 產品功能

1. 註冊之後，可以登入/登出
  - 只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁
2. 在首頁一次瀏覽所有支出的清單
  - 使用者只能看到自己建立的資料
3. 在首頁看到所有支出清單的總金額
4. 新增一筆支出 (資料屬性參見下方規格說明)
5. 編輯支出的屬性 (一次只能編輯一筆)
6. 刪除任何一筆支出 (一次只能刪除一筆)
7. 根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/Doug0849/expense-tracker.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd expense-tracker
```

3. 安裝 npm 套件

```
在 Terminal 輸入 npm install 指令
```

4. 安裝 nodemon 套件 (若已再globle安裝則不須重新安裝)

```
在 Terminal 輸入 npm install -g nodemon 指令
```

5. 修改.env檔
```
將.env.sample檔的副檔名拿掉改為.env檔
```

6. 匯入種子檔案

```
執行 npm run seed 匯入初始種子資料
```

當 terminal 出現以下字樣，即表示種子資料已新增完成

```
mongodb connected
Category seed is created.
mongodb connected
所有使用者與消費資料創建完成
```

7. 執行npm腳本，啟動伺服器

```
在 Terminal 輸入 npm run dev 指令
```

8. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
Server is started on http://localhost:3000 ...
mongodb connected
```

9. 現在可以開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始使用美食網頁清單2.0囉！

10. 可以使用種子帳號來做測試：
  email: user1@example.com 密碼:12345678
  email: user2@example.com 密碼:12345678

## doug0849 - 專案開發練習人員
> [Doug](https://github.com/doug0849)
