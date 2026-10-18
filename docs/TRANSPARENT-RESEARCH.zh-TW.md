# Obsidian Transparent 對 Personal Glass 的適配評估

研究日期：2026-10-17。參考版本 Transparent 2.5.183，固定提交 `69d296218d8fb907cf12180e9d991320f95192f1`；對照 Personal Glass Theme 0.3.0。目前只做公開原始碼、文件與官方展示圖分析，沒有安裝該主題、複用它的 CSS／圖片、修改 Personal Glass 樣式或寫入 Vault。

## 結論

**適合借鏡「背景與表面分層、輕微透色、分項設定」來優化 Personal Glass。** 建議新增可選的輕透表面模式，保留平面香檳 × 鼠尾草選取；不把整個 Theme 換成 Transparent，也不重新加入選取玻璃。

你喜歡的些微透明感，可以先在 Obsidian 視窗內用柔色背景與半透明表面達成。真正透出 Windows 桌面是另一個 native-window 問題，仍由 Companion 處理。

## 值得參考的優點

| 觀察到的做法 | 對本案的價值 | 建議 |
| --- | --- | --- |
| 背景以獨立 pseudo-element 呈現，可切換漸層、圖片與純色，並分開處理亮度／染色 | 不必讓文字或整個文件容器變透明 | 高：借鏡分層原則，原創實作 |
| 明暗模式有不同的背景處理與文字／表面設定 | 同一透明度不必硬套兩種模式 | 高：明暗分別調校 |
| Style Settings 提供有分組的背景與效果控制 | 外觀可以留在 Theme 的 CSS／metadata，不必增加 runtime plugin 行為 | 高：作為選配，無該插件時仍有安全預設 |
| 對選單、設定視窗與特定插件補樣式，並區分 popout 情境 | 顯示主題完整度需要覆蓋正文以外的表面 | 中高：按我們的 adapter policy 分檔與實測 |

以上是原始碼與官方資料可支持的觀察，不是效能測試或跨平台認證。來源：[專案說明](https://github.com/Oczko24/Obsidian-transparent)、[固定版 CSS](https://github.com/Oczko24/Obsidian-transparent/blob/69d296218d8fb907cf12180e9d991320f95192f1/theme.css)、[官方桌面展示](https://github.com/Oczko24/Obsidian-transparent/blob/main/assets/preview2_computer.png)、[Style Settings](https://github.com/community-archive/obsidian-style-settings)。

## 對 Personal Glass 的建議設計

下列數值是本案的**起始調校提案**，尚未實作或量測，並非 Transparent 的原設定。

| 層 | 建議方向 |
| --- | --- |
| 視窗內背景 | 原創、低飽和柔色漸層；預設不使用遠端圖片 |
| 正文面板 | 94–98% 不透明度，閱讀優先 |
| 左右側欄 | 88–94% 不透明度，讓背景色微微透入 |
| 選單／浮層 | 96–100% 不透明度；必要時只在小面積加入 8–12px 背景模糊 |
| 文件選取 | 維持 100% 不透明雙色填色，沒有 blur、高光與陰影 |
| 文字／圖示 | 保持實色；不對文字容器套整體 opacity 或 filter |

我們已經有背景漸層、正文與側欄 alpha tokens、Focus／Glass 樣式及 system fallback，因此這是現有架構的調校，不需要重新設計整個 Theme。現有預設側欄為淺色 72%、深色 78% 不透明，Glass 模式側欄為 55%；如果目標是「些微」透明，應先以更高不透明度與背景色層次比較，而不是一路降低 alpha。實際感受也受背景及疊層影響，不能只用百分比判斷。

建議的可選控制：表面模式、正文／側欄不透明度、背景雙色、背景明暗、浮層模糊。先做最少且有用的項目，避免把大量動效與所有效果一起暴露。與 Companion 既有 attributes／inline variables 的優先順序必須明定，避免兩個設定面板互相覆蓋。

## 不適合直接搬入的部分

- **True Glass 不等於 Windows 支援證明**：參考 repo 的 True Glass 分支是 CSS 背景／模糊規則；Style Settings 的選項本身不會呼叫 Windows 原生視窗 API。Electron 的系統材質有明確平台限制，應沿用 Theme／Companion 分工。[Electron 官方文件](https://www.electronjs.org/docs/latest/api/browser-window#winsetbackgroundmaterialmaterial-windows)
- **大模糊與廣泛合成效果**：來源背景模糊預設為 80px，且有多處 backdrop-filter、will-change 與動畫。對我們只是效能待測項，不是速度更快的證據；先用小面積或已柔化的漸層，量測後再增加效果。[固定版 CSS](https://github.com/Oczko24/Obsidian-transparent/blob/69d296218d8fb907cf12180e9d991320f95192f1/theme.css#L136-L170)
- **系統偏好**：靜態解析這個固定版 CSS，未找到 prefers-reduced-motion／prefers-reduced-transparency／forced-colors media query。其手動動畫開關不能替代我們既有的系統 fallback；這也不代表 Obsidian 或其他插件完全沒有提供相關保護。[固定版 CSS](https://github.com/Oczko24/Obsidian-transparent/blob/69d296218d8fb907cf12180e9d991320f95192f1/theme.css)
- **授權與素材**：參考專案為 GPL-3.0，Personal Glass 為 MIT。此提案只參考設計原則，使用我們自己的 CSS 與背景，不將其程式或素材併入 MIT 發布。[來源授權](https://github.com/Oczko24/Obsidian-transparent/blob/69d296218d8fb907cf12180e9d991320f95192f1/LICENSE)

公開 Windows issue 曾包含 Excalidraw 與程式碼區塊的整合討論，目前兩者都已關閉。它們只提醒我們要測外掛的自有背景，不能作為現行版本仍有 bug 的證明：[issue #10](https://github.com/Oczko24/Obsidian-transparent/issues/10)、[issue #8](https://github.com/Oczko24/Obsidian-transparent/issues/8)。

## 建議落地順序與驗收

1. 先處理已知的深色選取回退對比風險，再新增本案自己的輕透模式；原平面選取維持原狀。
2. 用固定合成內容對照目前模式與輕透模式，涵蓋淺／深色、原生 Explorer、Navigator、正文、設定視窗與選單。
3. 補窄視窗、popout、system preferences、列印及 supported-plugin adapters；未安裝／停用 Companion 時必須能閱讀與操作。
4. 在真實 Obsidian 比較捲動、切換文件與多窗時的重繪／資源使用，再決定是否提供額外 blur 或本地圖片背景。

本文件是適配提案，沒有新增 runtime 行為或宣稱已驗證 Windows 桌面透明。Theme 只擁有視覺；OS 材質與生命週期留在 Companion，AI Agent 不需要參與。
