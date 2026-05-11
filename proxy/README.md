簡易 ntfy proxy

啟動：

```powershell
cd proxy
npm install
npm start
```

用法（在瀏覽器端）：
- 發送 POST 到 `http://localhost:3000/send/<topic>`，body 為訊息內容，headers 可加 `Title: 何帥`。

如果需要，我也可以把 `458020/5/index.html` 的發送 URL 改為使用此 proxy。