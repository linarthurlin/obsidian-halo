# 元件實作 · Theme 0.5.0

依 22 類物件提案與四則 review 修訂建立正式元件樣式；狀態是「CSS／變數契約已實作，合成瀏覽器已檢視」，不代表各外掛及所有狀態已通過 Obsidian runtime 驗收。

## 覆蓋範圍

| 編號 | 物件 | 正式實作 | 待實機驗證 |
| --- | --- | --- | --- |
| 01 | Tags | 膠囊、原生 tag 變數、Reading 標籤 hover | inline／Properties／sidebar 全狀態 |
| 02 | Properties | 資料列、hover／focus、標籤值、原生輸入變數與圓角 checkbox | 所有屬性類型、編輯／空值／長值 |
| 03 | 表格 | 表頭、分隔線、hover、密度／斑馬紋開關、Reading／CM table padding、選取變數 | Live Preview 儲存格編輯、拖曳／多選 |
| 04 | 任務 | 原生 checkbox 變數、一般二元任務的 Tabler 勾號、完成文字 | 真實 CodeMirror DOM／Tasks 狀態 |
| 05 | 清單 | marker 色、間距、移除巢狀直線與 indentation guide 變數 | 編輯／折疊／RTL |
| 06 | 連結 | 內外連結、未建立連結虛線、hover／focus | 原生連結語法與長網址 |
| 07 | Callout | 原生語義色、圓角、標題與正文層次；標題色混入正文色改善對比 | 自訂類型／巢狀／實際折疊 |
| 08 | 命令／補全 | 選取漸層、結果／路徑／匹配／快捷鍵 | 不同原生 popup DOM 與鍵盤狀態 |
| 09–10 | Bases | 官方表格／卡片與嵌入變數 | 真實 Bases 表格／卡片／清單／看板，版本差異 |
| 11 | 嵌入 | 來源文字、3px 左框、細外框與間距 | 巢狀與不同嵌入結構 |
| 12 | 圖片／附件 | 比例保留、圓角、file-embed 資料卡；PDF mask 圖示 | PDF inline viewer、影音外殼與附件不同 DOM；不保證 iframe 內部 |
| 13 | 程式碼 | 原生語法 token、淡底與行內格式；保留原生複製功能 | 各語言 token、複製控制與長行 |
| 14 | 文字層次 | H1–H6 原生變數、粗體／斜體保持原生語義、Highlight | 中英混排及所有編輯層級 |
| 15 | 腳註 | 分隔、字級、來源與返回連結 | 多段引用、焦點、真實列印分頁 |
| 16 | 公式／圖表 | 容器、留白、尺寸／捲動 | MathJax／Mermaid 引擎；fixture 只用 MathML／既有 SVG |
| 17 | 分頁／路徑／狀態列 | 原生分頁狀態變數、活躍底色、次要資訊 | 失焦、stacked tabs、popout、長檔名 |
| 18 | Outline／Backlinks／搜尋 | 縮排淡底子項、無直線、目前標題漸層、匹配片段與 backlink 邊框 | 真實樹狀 DOM／折疊／搜尋狀態 |
| 19 | 表單 | 原生 input 變數、設定／Properties 輸入框、invalid／disabled／focus | toggle／slider 的完整原生互動及不同平台 |
| 20 | Canvas | 節點底色／圓角、選取外框、群組標題 | 縮放、連線、不同節點與效能 |
| 21 | 外掛 | Dataview 原生表格、Tasks 原生元件繼承、Kanban 已對照選擇器；可選 `.pg-plugin-card/lane` | 固定外掛版本 runtime 與自訂任務 marker |
| 22 | 訊息狀態 | Notice、Tooltip、原生搜尋空白狀態；輸入錯誤色 | 真實通知／長文／不同插件錯誤 DOM |

## 設定與隔離

Style Settings 新增 `Compact document tables` 與 `Alternating document table rows`，預設關閉。不安裝 Style Settings 時使用標準密度。表格設定只控制樣式，不建立資料庫、移動筆記或修改 Markdown。

正式來源：`document-objects.css`、`workspace-objects.css`、`adapters/bases.css`、`adapters/content-plugins.css` 與既有模組。Outline 規則限制在 `data-type='outline'`，不修改 Explorer 的 folder tree。自訂 checkbox 選擇器不會命中 switch 容器，也避開 `?` 等自訂任務狀態；這些保留外掛 marker。

PDF 圖示只替換符合 PDF src 的 file-embed 圖示外殼；不替換 PDF 頁面／viewer。新圖示以 data URI 內嵌，維持只安裝 theme.css／manifest.json，不新增 Vault 資產或外掛。Tabler MIT 原文隨 CSS 發布，詳見 [第三方聲明](../THIRD-PARTY-NOTICES.md)。

## 來源契約

- Obsidian 官方文件固定 commit：[c56c7e770ba25dd0ea392aacf4588f9425970d36](https://github.com/obsidianmd/obsidian-developer-docs/tree/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Reference/CSS%20variables)：Tag、Properties、Table、List、Bases、Checkbox、Link 等原生變數。以公開變數為主，補充 DOM 選擇器仍需實機驗收。
- Kanban 2.0.51 固定來源：[5134c05ad9a7861f551cd15d57cf50db8394901a](https://github.com/mgmeyers/obsidian-kanban/blob/5134c05ad9a7861f551cd15d57cf50db8394901a/src/styles.less)：只檢查 board／lane／item 選擇器，未複製插件實作、未載入插件程式。

## 驗證紀錄

- 14 個測試通過，包括特殊任務／switch 不命中、自包含圖示與授權、Reading／table widget 密度契約；另有既有安裝／打包／無障礙檢查。
- `/implementation` 只載入建置 `theme.css`，完全不載入 review 的 `objects.css`。外層布局為合成 shell；Bases 範例明確模擬變數消費，不宣稱是原生 Bases DOM。
- 22 組正式元件的明暗合成頁分六組檢視，圖片在 `docs/screenshots/components/`。鍵盤 Space 勾選、focus、密度切換另有 computed style 確認。表格 padding 從 9.75px／13.5px 變為 5.25px／9.75px（15px fixture 字級）。
- 三個 fixture Callout 標題／底色對比：淺色 6.51／5.90／6.43，深色 4.73／5.08／4.74。只代表該三個色彩樣例，不是任意自訂 Callout 的保證。
- 強制色彩／列印使用已存在的 CSS 分支預覽工具；仍不是 OS 模擬或列印引擎驗證。

未部署 Vault，未啟用插件，未更動另兩個 repo。完整 Obsidian 共存、第三方版本相容、所有輸入狀態、原生平台材質、DPI／多螢幕與效能仍保留待辦。
