# 0.4.1 本輪增量

五個視覺 adapter 分檔完成；加入 hover／focus 語意 tokens 與 Theme 自有選取起色、終色、文字色、圓角設定。Notebook Navigator 3.4.3 固定來源契約已檢查，未宣稱 runtime 認證。修正列印卡片陰影、長程式碼／寬表格換行與無障礙覆寫；11 個測試及打包校驗通過，新增三種導覽結構與 CSS media 分支的瀏覽器合成檢查。

詳細證據與剩餘實機測試見 [導覽狀態與回退](STATES.zh-TW.md)。未部署 Vault、未修改筆記或另外兩個 Plugin repo。

# 0.4.0 前輪增量

原創輕透表面與可選 Style Settings 已實作：編輯區／側欄透明控制、明暗雙背景色、預設關閉的浮層模糊及不透明專注模式。平面選取保持不透明；深色減少透明度文字回退已修正。8 個測試與打包驗證通過，瀏覽器合成明暗／720px 窄版及專注覆寫已檢視。新增版本相容性證據矩陣，未知第三方版本未宣稱已支援。

此段取代下文較早版本對這些項目的狀態描述。其餘真實 Obsidian、外掛共存、系統偏好、列印、Windows 材質／DPI／多螢幕及效能仍待驗證。詳見 [輕透表面](SURFACES.zh-TW.md) 與 [roadmap](ROADMAP.md)。未部署 Vault 或修改筆記。

# Personal Glass Theme 工作進度

整理日期：2026-10-17。依據 Theme 0.3.0、拆分提交 `bad1043` 與目前程式／測試文件。這份整理沒有修改主題樣式、部署檔或 Vault。

目前定位：**可獨立建置、安裝及發布的預覽版；下一階段是拆分後的 Obsidian 整合驗證與可讀性修整。** 不以完成百分比代替實測證據。

## 已完成

| 項目 | 目前成果 | 驗證邊界 |
| --- | --- | --- |
| 架構拆分 | Theme 專屬 repo、manifest、依賴、build、installer、CI／Release；保留原 Git 歷史 | Theme 不包含 Companion／Agent runtime；三元件實際共存待測 |
| 配色與視覺系統 | Warm／Mineral／Rose 各有明暗模式；共用字體、間距、圓角、內容寬度及表面 tokens | Focus／Glass／Portable 樣式由 Theme 提供，互動切換與原生材質操作屬 Companion |
| 文件選取 | 香檳 × 鼠尾草的不透明雙色填色、圓角；沒有選取 blur、高光或陰影 | 已檢查合成瀏覽器預覽；拆分後各 Explorer 的 Obsidian 實測待補 |
| Markdown 外觀 | 標題、引用、Callout、圖片、程式碼、表格及常用 Live Preview 元件樣式 | 即時編輯由 Obsidian 提供，命令由 Companion 提供；Theme 不更改輸入語法 |
| 外掛視覺接口 | `--pg-surface/text/muted/accent/radius/selection-background` 與跨 repo 契約 | 接口已存在，不代表所有外掛都已驗證或都能被 CSS 美化 |
| 外掛 adapters | Companion Navigator、原生 Explorer 選取、Notebook Navigator、Crisp Craft、Canvas／表格，以及 Agent workbench tokens | 現有 adapter 程式已遷移；歷史整合測試不能視為拆分後認證 |
| SVG 視覺工具 | 離線 Skill、三組明暗 SVG 範例、結構／離線資源檢查 | 不屬於 AI 知識整理引擎 |
| 無障礙與輸出基礎 | Reduced motion／transparency、forced colors、鍵盤焦點與列印 CSS | CSS 已實作，讀屏、實際列印及完整對比驗證尚未完成 |
| 工程驗證 | 六項 Theme 測試、CSS／manifest 檢查、ZIP 邊界與 SHA-256 校驗；0.3.0 的 Windows／Linux CI 與發布成功 | 這是 Theme 測試，不含已移出的 plugin／Agent 測試；也不等於視覺回歸 |

## 未完成項目與驗收方式

| 優先級 | 工作 | 完成條件 |
| --- | --- | --- |
| P0 | 深色減少透明度的選取可讀性 | Theme 單獨使用、沒有 Companion inline variables 時仍有可讀的前景色；再測明暗、custom colors 與 forced colors |
| P0 | 拆分後 Obsidian 整合矩陣 | 在合成測試庫驗證 Theme 單獨、Theme＋Companion、Theme＋Agent、三者共存；記錄版本、截圖、問題與限制 |
| P0 | 選取狀態一致性 | 原生 Explorer／Navigator／Notebook Navigator 都清楚區分 hover、目前文件及鍵盤焦點；失焦仍保留目前文件標示 |
| P1 | 第三方相容性矩陣 | 每個 adapter 記錄外掛版本、tokens／selectors、明暗模式、窄側欄、停用與未安裝情境；行為問題交給對應 plugin Chat |
| P1 | 閱讀／編輯細節 | 長中文標題、混合語言、寬表格、長程式碼、數學式、圖片尺寸及折疊 Callout 沒有裁切或難讀狀態 |
| P1 | 無障礙與列印 | 鍵盤焦點、對比、系統偏好、讀屏中的視覺輔助，以及 PDF／紙本輸出實測有紀錄 |
| P1 | 視覺回歸流程 | 固定合成內容、viewport、字體條件與明暗模式，建立已審閱截圖基準及差異檢查；避免把抗鋸齒差異當成功能退步 |
| P2 | Windows／多螢幕 | 配合 Companion 驗證材質啟用與回退時 Theme 的呈現，涵蓋失焦、DPI、縮放、桌布與多螢幕；Theme 不新增 OS 操作程式 |
| P2 | 大型畫面與 CSS 成本 | 在測試庫檢查大量可見項目、複雜文件的滾動與重繪；區分 CSS 成本與 plugin 搜尋／索引成本 |

### 本次閱讀程式發現的具體待查項

`src/styles/selection.css` 的減少透明度 media query，在深色模式使用 `var(--pg-selection-dark-opaque-text, #252b25)`。Theme 單獨使用時沒有 Companion 注入前者，會回退到深色文字，而目前深色選取端點為 `#514a39`／`#354c41`。這是從 CSS 推得的對比風險，尚未完成相應 Obsidian 實測；應優先修正並驗證，不能標記為已完成。

## 可優化項目

1. **整理 tokens**：選取圓角目前固定為 14px，適合改成語意 token；已停用的玻璃相關變數先標記為相容性保留，確認 Companion 契約後才移除。
2. **拆開 adapters**：現在部分外掛樣式散在 components／integrations／selection。可逐步依外掛拆檔，保留獨立維護與版本註記，避免廣泛選擇器影響其他外掛。
3. **增加純外觀設定**：目前 Style Settings metadata 只提供內容寬度；可評估加入圓角、文字行高、清單密度及預設配色。這些是 CSS／metadata 工作；需要程式或持久化的互動仍交給 Companion。
4. **補視覺樣本庫**：把窄側欄、長檔名、無摘要、附件、空狀態與選取／focus 狀態納入合成預覽，減少每次只看漂亮的正常畫面。
5. **改善發布說明**：保留 Theme／Companion 各自下載與舊 BRAT repo 遷移說明；之後評估是否申請 Obsidian 主題目錄，目前不宣稱已收錄。

## 建議執行順序

先處理深色選取可讀性，再完成拆分後的 Obsidian／Explorer 整合矩陣；以此建立視覺基準後，才擴充外掛 adapters、外觀設定與效能調整。

## 不屬於本 Chat

- Companion：導覽功能、Markdown 命令、設定控制 UI、native bridge 及行為生命週期。
- Knowledge Agent：模型、憑證、corpus、索引、搜尋／整理、審核、筆記更新與回復。
- Theme 可美化上述外掛，但不在這個 repo 實作它們的行為，也不假設能穿透所有 Canvas、iframe 或隔離樣式。

相關文件：[ROADMAP](ROADMAP.md)、[測試](TESTING.md)、[外掛適配規則](PLUGIN-ADAPTERS.md)、[整合契約](INTEGRATION-CONTRACT.md)。
