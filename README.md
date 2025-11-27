# TWDIW Smart Locker — 專案說明

簡介

- 前端：Quasar + Vue 3 + Pinia
- 功能：寄物 / 取物 流程，透過 Axios 呼叫後端 API

快速開始

- 安裝相依套件：
  - yarn: `yarn`
  - npm: `npm install`

編譯 / 啟動

- 安裝 Quasar CLI（可選）
  - `npm i -g @quasar/cli`
- 開發（熱重載）
  - `quasar dev`
- 建置（Production）
  - `quasar build`
  - 產出目錄通常為 `dist/spa`（視 quasar.config.js 設定）
- 在本機預覽已建置的檔案
  - 使用 serve（若未安裝可透過 npx）
    - `npx serve dist/spa`
    - 或 `npx http-server dist/spa`

主要檔案

- src/boot/axios.js — Axios instance
- src/stores/userInfo.js — Pinia store
- src/utils/plugin.js — Notify / Dialog
- src/pages/_、src/layouts/_、src/router/\* — 頁面與路由
