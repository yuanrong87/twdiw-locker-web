# TWDIW Smart Locker — 專案說明

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 簡介

TWDIW Smart Locker 為前端單頁應用（Quasar + Vue 3 + Pinia），用於「行動憑證置物櫃」操作（寄物 / 取物 流程）。前端透過 Axios 與後端 API 溝通，UI 使用 Quasar 元件與路由。

## 快速開始

前置：

- Node.js (推薦 LTS, v18+)
- yarn 或 npm
- Quasar CLI（開發時建議安裝 global）: `npm i -g @quasar/cli`

安裝套件

```bash
# 使用 yarn
yarn

# 或使用 npm
npm install
```

開發伺服器（本機）

```bash
# 啟動 Quasar 開發伺服器
quasar dev
```

建置（Production）

```bash
quasar build
```

## 專案結構（重點）

- package.json
- quasar.config.js
- src/
  - App.vue
  - layouts/
    - MainLayout.vue
  - router/
    - index.js
    - routes.js
  - boot/
    - axios.js (Axios 實例)
    - pinia.js (Pinia 註冊)
  - stores/
    - userInfo.js (useUserInfoStore：fetchLocker、getQrcode、getQrcodeValidate、sendUserInfo、pickdUserInfo)
  - utils/
    - plugin.js (useNotify、useDialog)
  - pages/
    - IndexPage.vue
    - SendStepper.vue
    - PickupStepper.vue
    - LockerSelection.vue
    - ShowVPQrcode.vue
    - StoreItemInfo.vue
    - ComfirmInfo.vue
    - PaymentPage.vue
  - components/
    - EssentialLink.vue
  - css/
    - app.scss
    - quasar.variables.scss

## 主要功能與資料流

- Axios
  - 全域 Axios 實例在 `src/boot/axios.js` 建立，並被 boot 系統注入。
  - 建議以環境變數覆寫 baseURL（範例 `VITE_API_BASE_URL`）。
- 狀態管理
  - 使用 Pinia 管理流程資料（lockers、選中櫃號、QR code、位置等）。
  - store 負責呼叫後端 API 以取得櫃位、QR code 與送出使用者資料。
- 使用者流程
  - 寄物（/send）與取物（/pickup）由 Stepper 組成，各步驟分散在不同 page/component。
  - QR 驗證、付款與確認頁面負責與 store 互動並顯示回應與錯誤。

## 建議與注意事項

- 將 Axios baseURL 改為讀取環境變數（例如 `VITE_API_BASE_URL`）以方便在不同環境部署。
- 在 Axios 中加入攔截器處理 token/授權與全域錯誤（401、500 等）。
- Store 的錯誤處理建議統一使用 `useNotify` 顯示錯誤訊息，並加入重試機制或更精細的錯誤分類。
- 若需單元測試，建議加入 Vitest（或 Jest）並撰寫針對 store、utils 與關鍵邏輯的測試。

## 環境變數（建議）

在專案根目錄建立 `.env` 或 `.env.production`，常見變數：

- VITE_API_BASE_URL
  - 用途：覆寫 Axios baseURL
  - 範例：VITE_API_BASE_URL=https://api.example.com/api

- VUE_ROUTER_MODE
  - 用途：router 模式（history 或 hash）
  - 範例：VUE_ROUTER_MODE=history

- VUE_ROUTER_BASE
  - 用途：router basePath（若部署在子目錄）
  - 範例：VUE_ROUTER_BASE=/my-app/

- NODE_ENV
  - 用途：環境（development/production）

.env 範例

```
VITE_API_BASE_URL=http://localhost:8080/api
VUE_ROUTER_MODE=history
VUE_ROUTER_BASE=/
```

## 常用 Scripts（package.json）

- quasar dev — 啟動開發伺服器
- quasar build — 建置生產檔
- lint / format — ESLint / Prettier（視 package.json 定義）

## 在 macOS 下執行範例

- 安裝依賴
  - yarn: `yarn`
  - npm: `npm install`
- 開發
  - `quasar dev`
- 建置
  - `quasar build`

## 快速檢查點

- 檢查 `src/boot/axios.js` 是否使用 process.env.VITE_API_BASE_URL，若沒有建議修改：
  - baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
- 檢查 `src/stores/userInfo.js` 的錯誤處理與 notify 呼叫位置。
- 檢查 `quasar.config.js` 是否依賴 VUE_ROUTER_MODE / VUE_ROUTER_BASE。

## 部署建議

- 在 CI/CD pipeline 中設定對應環境變數（VITE_API_BASE_URL、VUE_ROUTER_BASE 等）。
- 前端建置後部署至靜態伺服器或 CDN（例如 Netlify、Vercel、S3 + CloudFront）。
- 若使用 history mode，確保後端或靜態服務器做 fallback（將所有 path 重導至 index.html）。

## 開發流程與貢獻

- 建議流程：Fork → feature branch → PR → code review → merge
- 如新增 API 或改變 contract，請同時更新 store 的呼叫與錯誤處理邏輯。

## 參考與重要檔案

- quasar.config.js
- src/boot/axios.js
- src/stores/userInfo.js
- src/utils/plugin.js
- src/router/index.js / src/router/routes.js
- src/pages/\*（流程頁面）

## 授權

此 README 為專案內部說明文件。實際授權請參考專案根目錄的 LICENSE 檔（若有）。

若需我直接把此檔寫入專案（覆寫 README.md），或根據專案內容調整文本（例如加入更完整的 API 範例、環境變數與範本），回覆「覆寫並寫入」或說明要補充的段落。
