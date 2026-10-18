# Personal Glass Theme roadmap

- [x] 獨立 repository、manifest、build、installer、CI 與 release pipeline。
- [x] 從公開來源保留 Git 歷史與跨 repo 交接／樣式接口文件。
- [x] 原有 Theme、平面選取、視覺 adapters、SVG Skill 與預覽。
- [x] P0：修正 Theme 單獨使用時，深色＋減少透明度的選取文字回退；加入兩端色彩對比與 CSS 分支回歸測試。
- [ ] P0：在真實 Obsidian／系統減少透明度偏好下確認上述回退。
- [ ] P0：Theme 單獨／搭配 Companion／搭配 Agent／三元件共存的 Obsidian 視覺驗證。
- [ ] P0：原生 Explorer／Navigator／Notebook Navigator 的 hover、目前文件、focus 與失焦選取矩陣。
- [x] P0：新增三種導覽結構的合成狀態頁，檢視選取／焦點分離與失焦保留填色；真實外掛矩陣仍待測。
- [ ] P1：第三方外掛 adapters 的版本相容性矩陣。
- [x] P1：記錄 Notebook Navigator 3.4.3 固定來源契約，修正色彩 token／文字及多選圓角；runtime 相容認證仍待補。
- [ ] P1：中英混合、寬表格、長程式碼、圖片及折疊 Callout 的閱讀／編輯外觀。
- [ ] P1：無障礙、列印與已審閱的合成視覺回歸基準。
- [ ] P2：配合 Companion 驗證真實 Windows 材質、DPI、多螢幕及回退外觀。
- [ ] P2：語意 tokens／adapter 分檔、純外觀設定與 CSS 重繪成本優化。
- [x] P2：五個 adapter 分檔、共用 hover／focus tokens、Theme 選取色彩／圓角設定；重繪成本量測待補。
- [x] P1：修正列印陰影覆蓋、長程式碼／寬表格換行、動態與浮層回退；加入 CSS 分支合成檢查。
- [x] P1：原創輕透表面、Theme 自有 Style Settings、專注模式優先權；保留不透明平面選取。
- [x] P1：合成頁面的明暗、720px 窄版、中英混合、寬表格、長程式碼、圖片及折疊 Callout 初次瀏覽器檢視。
- [ ] P1：輕透表面的真實 Obsidian 視覺驗收、Style Settings 實際面板驗證與效能量測。

目前未對個人 Vault 執行部署或知識整理。舊 monolith 測試不代表拆分後的 runtime 驗證。

詳細成果、驗收方式、程式觀察與可優化項目見 [工作進度](PROGRESS.zh-TW.md)。

輕透表面的實作與驗證邊界見 [輕透表面](SURFACES.zh-TW.md)；原始研究見 [Transparent 適配研究](TRANSPARENT-RESEARCH.zh-TW.md)。
