---
title: 設計思考我最行 (Design Thinking Master)
emoji: 💡
colorFrom: indigo
colorTo: blue
sdk: static
pinned: false
---

# 💡 設計思考我最行 (Design Thinking Master)
> 第二個 Hugging Face Space 作業：結合多模態 AI 與設計思考四度評量的純前端智慧教學輔助 Web App

🔗 **專案連結**：
- **GitHub 專案倉庫**：[https://github.com/huanegg/design-thinking-static](https://github.com/huanegg/design-thinking-static)
- **Hugging Face Space 線上體驗**：[https://huggingface.co/spaces/huanegg/Design-thinking-evaluator](https://huggingface.co/spaces/huanegg/Design-thinking-evaluator)

「設計思考我最行」是一款專為設計思考（Design Thinking）創新專題課程量身打造的智慧學習單評量與回饋系統。支援學習單拍照/圖片上傳、一鍵載入經典創客案例、多模態大模型智能分析、四向度雷達圖視覺化、擬真人聲語音講評，以及教師微調與 A4 學習檢核卡匯出列印。

---

## 🌟 核心特色與五大功能規格

1. **學習單上傳與經典範例快速體驗**
   - 支援拖曳、本機圖片選取、手機相機拍照預覽。
   - 內建三組完整經典創客設計思考案例（「折疊智慧傘」、「自動澆水器」、「減壓護脊書包」），點選即自動填入情境並呈現學生手繪原型概念圖。

2. **設計思考四大維度智能評量（0-100 分與等級標籤）**
   - 🎯 **痛點需求性 (Empathy & Need)**：同理心深度、受眾與生活痛點洞察。
   - 🔍 **問題定義準確性 (POV Definition)**：使用者視角、觀點陳述與痛點聚焦。
   - 💡 **想法創意度 (Ideation & Creativity)**：發散思維、創新突破性與獨特性。
   - 🛠️ **技術可行性 (Feasibility & Prototyping)**：原型落地可能、材料選擇與功能驗證。
   - 等級標籤：**卓越 (85-100)**、**良好 (70-84)**、**需引導 (<70)**。
   - 每一維度皆獨立提供**「優勢肯定」**與**「進階指導建議」**。

3. **動態數據儀表板 (Chart.js CDN)**
   - 4 向度能力雷達圖，直觀呈現學生設計思維強弱項。
   - 各維度動態進度條與等級徽章。
   - 即時顯示當前推論模型標籤（支援 `Qwen/Qwen2.5-VL-7B-Instruct` 等多模態模型）。

4. **親切語音講評與動態波形播報 (Web Speech API)**
   - 採用瀏覽器原生語音合成技術（`speechSynthesis` 臺灣繁體中文 `zh-TW`）。
   - 播放時搭配 HTML5 Canvas 即時動態音訊波形視覺動畫，提供沉浸式評語回饋體驗。

5. **教師微調與 A4 學生學習檢核卡列印**
   - 教師可手動滑動調節各指標分數與評語，雷達圖與綜合等級同步即時刷新。
   - 一鍵開啟符合教育部/課綱標準的 **A4 學生學習檢核卡**，支援 `@media print` 專屬樣式，列印或存為 PDF 排版整齊清晰。

6. **彈性模型與雙軌運作機制**
   - **HF Inference API 模式**：輸入個人 Hugging Face Token，直接呼叫最新多模態視覺模型進行即時推論。
   - **智慧示範模擬模式**：未輸入金鑰或遇網路/配額限制時，自動無縫切換至示範引擎，確保本機雙擊開啟或線上展示 100% 順暢運作。

---

## 🚀 本機執行方式

### 方式一：直接雙擊開啟
1. 下載或 Clone 本專案資料夾。
2. 直接在檔案總管中雙擊 `index.html`，即可於 Chrome / Edge / Safari 瀏覽器中執行。

### 方式二：使用本機 HTTP 伺服器（推薦）
使用 Python 內建伺服器：
```bash
# 在專案目錄下執行
python -m http.server 8080
```
開啟瀏覽器訪問：`http://localhost:8080`

或使用 Node.js `npx serve`：
```bash
npx serve .
```

---

## 📤 部署至 Hugging Face Space (Static SDK)

本專案採用純前端靜態架構，符合 Hugging Face **Static** Space 規範：

1. 在 Hugging Face 建立新的 Space：
   - **Space SDK** 選擇：`Static`
   - **Space Name** 例如：`design-thinking-master`
2. 將本地專案關聯並推送到 Hugging Face Space：
```bash
# 初始化 git（若尚未初始化）
git init
git add .
git commit -m "feat: initial commit for Design Thinking Master Web App"

# 關聯至您的 Hugging Face Space
git remote add origin https://huggingface.co/spaces/<YOUR_USERNAME>/<YOUR_SPACE_NAME>

# 推送至 Space
git branch -M main
git push -u origin main
```
推送完成後，Hugging Face 將在數秒內自動完成靜態網站建置並上線！

---

## 🛠️ 技術架構
- **架構**：純靜態 Web (HTML5 / Vanilla JavaScript ES6+ / CSS3)
- **視覺框架**：Tailwind CSS (CDN) + FontAwesome 6 + Google Noto Sans TC
- **圖表渲染**：Chart.js (v4.4+)
- **語音與動畫**：Web Speech API (`speechSynthesis`) + HTML5 Canvas
- **AI 模型推論**：Hugging Face Inference API (`Qwen/Qwen2.5-VL-7B-Instruct` 等) + 本地智慧語意示範分析引擎
- **列印樣式**：標準 A4 版面 CSS (`@page`, `@media print`)
