# 導覽狀態與回退 · 0.4.1

新增 `/states` 合成頁，呈現 Explorer、Companion Navigator 與 Notebook Navigator 的原創最小結構。按鈕只更新 fixture 狀態，不操作 Vault 或載入外掛。選取保持不透明雙色填色；移動鍵盤焦點不會移除原選取。

## 外觀設定與維護

Style Settings 新增明暗各自的選取起色、終色、文字色及 0–20px 圓角設定。只控制色彩與幾何，不會恢復選取透明、blur 或陰影。既有 Companion inline 選取參數仍遵循正常 cascade；同一項色彩建議由單一面板管理。

五個 adapter 已分檔，新增 `--pg-row-hover`、`--pg-focus-color`、`--pg-focus-width` 視覺 tokens。Notebook Navigator 已依固定來源 commit 檢查色彩 token、失焦文字及多選圓角契約，未宣稱完成其 runtime 驗證。

## 回退修正

- 列印：移除 `personal-cards` 較高優先權的陰影；白底深字優先於正常 inline 色彩；長程式碼換行、寬表格固定欄寬及長單字斷行。
- 減少透明度：面板與浮層透明度歸零，浮層 blur 為 0；深色選取預設淺色文字。
- 減少動態：Theme 動態時間覆蓋正常 inline 偏好。
- 強制色彩：浮層、焦點與 hover 使用系統色彩，保留選取的 Highlight／HighlightText 回退。

## 驗證紀錄

11 個單元／CSS 結構測試通過。另以瀏覽器檢視合成明暗畫面、滑鼠選取後以 Tab 移動至不同文件、選取失焦仍保留填色。深色 Companion 焦點輪廓 computed style 為 2px solid。

`/media-preview.css?mode=…` 只將建置 CSS 中指定的 media 分支改成 `all`，其餘規則與 cascade 不變；不安裝插件、不修改 OS。此工具能檢查規則被啟用時的外觀，不能驗證 media query 偵測、作業系統色盤、讀屏或真實列印分頁。`print` 預覽只啟用 Theme 的列印規則；fixture 導覽仍保留方便切換。

已在瀏覽器確認列印分支的 Callout `box-shadow:none`、長程式碼 `white-space:pre-wrap`；減少透明度分支的面板／側欄為 100%，深色選取字色為 `rgb(241,244,239)`。

預覽截圖：[深色狀態](screenshots/states-dark.jpg)、[列印規則](screenshots/print-branch.jpg)。這是人工檢視證據，尚非使用者核准基準或自動像素回歸。

待實機：三個元件共存、真實外掛 hover／focus／失焦矩陣、真實高對比及其他系統偏好、列印 PDF／紙張分頁、Windows DPI／多螢幕與效能。
