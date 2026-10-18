# Personal Glass Theme 交接

本 Chat 只負責 Theme。主要程式在 src/styles/，manifest.json 是 Theme manifest，不能加入 plugin id。維護共用 tokens、選取底色與第三方外掛 adapter；行為需求交給 Companion 或 Agent repo。

保留已選定的平面香檳 × 鼠尾草選取，勿重新加入選取玻璃效果。現有 SVG Skill 留在 Theme 視覺工具範圍。

下一步：在測試庫確認獨立 Theme、搭配 Companion、搭配 Agent，以及三者一起使用的視覺；補強常用第三方插件的 adapter 測試矩陣。

## 共同規則

先讀 AGENTS.md、README.md、INTEGRATION-CONTRACT.md 與 REPOSITORY-SPLIT.md。各 repo 各自 npm ci / npm run check / npm run package、獨立版號與 Release。不要把拆開的元件重新綁在同一個 build 或安裝器。個人 Vault、密鑰、筆記、設定、計畫與交易紀錄不可上傳。此次拆分沒有寫入 Vault；新 Chat 不代表已授權部署或整理筆記。
