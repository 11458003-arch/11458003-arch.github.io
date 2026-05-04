# Dr.Her 聊天室 | 施丞彥作品集

支援 **ntfy.sh Server-Sent Events (SSE)** 即時推播的全功能聊天介面。可自訂話題、發送訊息、實時接收訊息。

## 功能特色

✨ **即時 SSE 推播** — EventSource API 支援 ntfy.sh 實時訊息流  
💬 **完整聊天室** — 用戶名、時間戳、訊息計數、對話歷史  
🎨 **現代深色 UI** — 漸層設計、流暢動畫、類似 Yi Chun 風格  
📱 **完全響應式** — 桌面、平板、手機無縫適配  
🔧 **零依賴** — 純 HTML/CSS/JavaScript，無需 Node.js 或打包工具  
🌐 **跨平台相容** — 支援所有現代瀏覽器  

## 快速開始

### 方式 1：本地打開
1. Clone 或下載本倉庫
2. 開啟 `index.html`
3. 預設連接到 `drher` 頻道，即時接收訊息

### 方式 2：GitHub Pages 部署
1. Fork 本倉庫
2. 在 Settings → Pages 中啟用 GitHub Pages
3. 訪問 `https://your-username.github.io/11458003-arch.github.io/458019/5/`

## 使用指南

### UI 佈局

**左側邊欄**
- Logo 與標題
- Topic 輸入欄與連線按鈕
- 用戶名設定
- 連線狀態面板
- 清空對話按鈕

**主聊天區**
- 頂部：聊天標題 + 連線狀態指示器
- 中央：訊息展示區（自動滾動）
- 底部：訊息輸入框 + 發送按鈕

### 聊天流程

```
1. 配置頻道 (STEP 1)
   └─ 輸入 ntfy.sh 話題名稱
   └─ 預設：drher

2. 設定用戶名 (STEP 2)
   └─ 輸入你的名字或匿名
   └─ 顯示在聊天訊息中

3. 點擊「連線」(STEP 3)
   └─ 建立 SSE 連接
   └─ 狀態點變綠色 ✓

4. 發送訊息 (STEP 4)
   └─ 在下方輸入框輸入內容
   └─ 按 Enter 發送
   └─ Shift+Enter 換行
   └─ 訊息立即廣播到 ntfy.sh

5. 實時接收訊息 (CONTINUOUS)
   └─ 自動監聽 SSE 流
   └─ 訊息帶時間戳和發送者名稱
   └─ 自動滾動到最新訊息
```

### ntfy.sh 頻道管理

**JavaScript 發送範例**（本應用內部使用）
```javascript
fetch('https://ntfy.sh/drher', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Title': 'Your Name'
  },
  body: 'Your message here'
});
```

**cURL 命令行**
```bash
# 簡單訊息
curl -d "Hello from CLI" https://ntfy.sh/drher

# 帶標題
curl -H "Title: MyBot" -d "automated message" https://ntfy.sh/drher

# 設定優先級
curl -H "Priority: high" -d "urgent" https://ntfy.sh/drher
```

**Python 腳本**
```python
import requests

def send_to_ntfy(topic="drher", message="", title=""):
    requests.post(
        f"https://ntfy.sh/{topic}",
        headers={"Title": title} if title else {},
        data=message
    )

send_to_ntfy("drher", "訊息內容", "YourName")
```

**PowerShell 腳本**
```powershell
$topic = "drher"
$message = "Your message"
$title = "Your Name"

$params = @{
    Uri = "https://ntfy.sh/$topic"
    Method = "POST"
    Headers = @{"Title" = $title}
    Body = $message
}

Invoke-WebRequest @params
```

## 技術架構

### 前端技術

| 技術 | 目的 |
|------|------|
| EventSource API | SSE 實時連接 |
| Fetch API | HTTP POST 發送訊息 |
| CSS Grid/Flexbox | 響應式佈局 |
| CSS Animations | 過渡動畫效果 |

### SSE 連接流程

```
1. 建立 EventSource 連接
   ├─ 監聽 https://ntfy.sh/{topic}/sse
   └─ 持續監聽新訊息

2. 解析訊息
   ├─ 提取 message（訊息內容）
   ├─ 提取 title（發送者名稱）
   └─ 自動時間戳

3. 實時更新
   ├─ UI 動畫插入新訊息
   ├─ 訊息計數 +1
   └─ 自動滾動到底部
```

## 部署選項

### 選項 A：GitHub Pages（推薦 ⭐）
```bash
# 1. Fork 倉庫
# 2. 啟用 GitHub Pages
# 3. 訪問 https://your-username.github.io/11458003-arch.github.io/458019/5/
```
✅ 零成本 | ✅ 自動 HTTPS | ✅ 無需維護

### 選項 B：Vercel/Netlify
```bash
# 直接連接 GitHub 倉庫
# 自動部署每次推送
```
✅ 全球 CDN | ✅ 自動預覽 | ✅ 快速部署

### 選項 C：自有服務器
```bash
# 複製文件到 web root
cp 458019/5/index.html /var/www/html/chat/
# 或使用 S3、GCS 等靜態託管
```
✅ 完全控制 | ✅ 自訂配置 | ✅ 高度可擴展

## 瀏覽器相容性

| 瀏覽器 | SSE 支援 | 狀態 |
|--------|---------|------|
| Chrome/Edge | ✅ | 完全支援 |
| Firefox | ✅ | 完全支援 |
| Safari | ✅ | 完全支援 |
| iOS Safari | ✅ | 完全支援 |

## 文件結構

```
458019/5/
├── index.html      (完整聊天應用，2700+ 行)
├── README.md       (此文檔)
└── LICENSE         (MIT 開源協議)
```

## 許可證

MIT License — 自由使用、修改、分發、商用  
詳見 [LICENSE](LICENSE) 文件

---

**建議者** | 施丞彥 (Yi Chun)  
**完成日期** | 2024  
**部署狀態** | ✅ 已上線  
**ntfy.sh 頻道** | https://ntfy.sh/drher