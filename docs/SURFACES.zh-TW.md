# 輕透表面 · 0.4.0

採原創 CSS，借鑑背景與面板分層的設計方向，未複製 Transparent 的 CSS 或素材。預設編輯區 96%、側欄 92%、浮層 98% 不透明度；文字及圖示保持完整色彩，選取維持不透明雙色平面漸層。

## 設定

可選用 Style Settings，開啟 Personal Glass 設定：編輯區 90–100%、側欄 85–100%、明暗各自的兩個背景色、浮層模糊 0–12px，以及不透明專注模式。預設模糊為 0；只有小型 menu／suggestion 可啟用模糊，沒有編輯區模糊。未安裝此插件時依然使用 Theme 預設值。

設定 metadata 依據 [Style Settings 原始文件](https://github.com/community-archive/obsidian-style-settings/blob/main/README.md)。目前確認 CSS 渲染與設定對應的 class／變數，尚未在真實 Style Settings 面板操作驗收。

優先順序：系統減少透明度／強制色彩回退，以及明確的專注模式，優先於透明滑桿。Companion 的 `glass` 屬性改為較保守的 94%／88%；其餘明確的外觀變數以正常 CSS cascade 決定，inline 優先於一般樣式。Style Settings 的色彩覆寫可優先於 Companion palette。避免同時由兩個面板管理同一變數。

這是應用內背景的輕透，不會單靠 CSS 在 Windows 顯示桌面材質。Native 材質仍屬 Companion。

## 已驗證與待驗證

- `npm run check`：8 個測試；新增深色 reduced-transparency 分支與對比測試、專注覆寫與無全元素透明／濾鏡檢查。
- 真實瀏覽器合成頁：明暗畫面、96% computed background、專注模式覆蓋 inline slider 為 100%、Callout 展開；720px 下 document scrollWidth 705px，寬表格與程式碼在內部捲動。
- 圖片：[淺色](screenshots/subtle-light.jpg)、[深色](screenshots/subtle-dark.jpg)、[窄版](screenshots/subtle-narrow.jpg)。這些是初次檢視記錄，尚非自動像素回歸或使用者核准基準。
- 待驗證：系統 media 偏好實際切換、列印、真實 Obsidian Live Preview、三元件共存、第三方版本、Windows DPI／多螢幕與效能。測試不代表 runtime 驗證。

本輪未部署到 Vault，未啟用插件，未改動筆記。
