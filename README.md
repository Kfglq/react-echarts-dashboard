# React Dashboard

這是一個 React 、TypeScript 與 ECharts 開發的即時數據監控儀表板練習。

## 技術

- **Frontend:** React 19 (TypeScript Strict Mode)
- **State Management:** Redux (Redux-Saga / Reselect)
- **Visualization:** Apache ECharts
- **Styling:** Ant Design (Antd) / SCSS
- **Utils:** Lodash / Moment.js

## 核心功能

### 1. 嚴格模式 TypeScript 與 Redux 封裝
- 採用 TypeScript 嚴格模式，確保資料流（Data Flow）的型別安全。
- 統一封裝 **Reducer** 與 **Actions**，標準化各個數據模組的處理邏輯，降低維護成本。

### 2. Saga 模擬高頻 Socket 數據流
- 使用 **Redux-Saga** 模擬真實 WebSocket 的數據推送。
- **數據清洗:** Saga 負責數據清洗，僅保留最近 60 秒的有效數據，防止內存洩漏。
- **淺拷貝:** 確保每次更新僅變動必要的物件引用。

### 3. Selector 精準數據分發 (Atomic Selection)
- **Reselect 快取機制:** 使用 `createSelector` 建立記憶化（Memoized）選擇器。
- **按需選取:** 每個圖表組件透過自定義的 `makeSelectDataByPerson` 選擇器，**只取得該圖表所需的數據點**。
- **阻斷無效渲染:** 當總數據更新但該圖表對應的人員數據未變動時，Selector 會回傳相同的引用，配合 `React.memo` 阻斷不必要的組件重繪。

### 4. ECharts 渲染效能優化
- **Silent Mode:** 關閉圖表滑動偵測與互動計算。
- **SVG / Canvas 優化:** 針對多實例場景調整渲染器配置。

## 安裝與執行

```bash
# 安裝依賴
npm install

# 啟動dev
npm start

# 打包
npm run build
```