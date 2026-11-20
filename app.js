/**
 * 設計思考我最行 (Design Thinking Master) - 核心邏輯
 * 包含：範例載入、影像預覽、Hugging Face Inference API / 智慧示範引擎雙軌運作、
 * Chart.js 雷達圖連動、Web Speech 語音合成、Canvas 波形動畫、A4 列印檢核卡
 */

// ==========================================
// 1. 內建三大經典創客範例資料庫與 SVG 示意圖
// ==========================================

// 輔助函式：將 SVG 字串轉換成 Data URL
function svgToDataUrl(svgString) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString.trim());
}

// 範例 1：折疊智慧傘 SVG 原型草圖
const SVG_UMBRELLA = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#f8fafc" rx="16"/>
  <rect x="20" y="20" width="560" height="360" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" rx="12"/>
  
  <!-- 標題 -->
  <text x="40" y="55" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b">【設計思考原型草圖】折疊智慧傘 (Smart Umbrella)</text>
  <text x="40" y="75" font-family="sans-serif" font-size="12" fill="#64748b">設計者：林小晴 | 概念階段：原型測試 v2.1</text>
  <line x1="40" y1="90" x2="560" y2="90" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- 傘面幾何與奈米疏水層標註 -->
  <path d="M 120 220 Q 230 110 340 220 Z" fill="#6366f1" opacity="0.85" stroke="#4338ca" stroke-width="3"/>
  <line x1="230" y1="110" x2="230" y2="280" stroke="#334155" stroke-width="4"/>
  <circle cx="230" cy="110" r="6" fill="#f59e0b"/>

  <!-- 水珠彈跳效果 (疏水布) -->
  <circle cx="170" cy="170" r="4" fill="#38bdf8"/>
  <circle cx="190" cy="155" r="3" fill="#38bdf8"/>
  <circle cx="280" cy="170" r="5" fill="#38bdf8"/>

  <!-- 旋轉握把甩乾機構 -->
  <rect x="218" y="280" width="24" height="60" rx="6" fill="#1e293b"/>
  <path d="M 230 340 C 230 365 200 365 200 345" fill="none" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
  
  <!-- 標註指引線與文字 -->
  <!-- 1. 疏水傘布 -->
  <line x1="160" y1="160" x2="90" y2="130" stroke="#64748b" stroke-dasharray="3,3"/>
  <rect x="30" y="115" width="110" height="30" rx="4" fill="#e0e7ff"/>
  <text x="40" y="135" font-family="sans-serif" font-size="11" font-weight="bold" fill="#3730a3">奈米荷葉疏水布</text>

  <!-- 2. 藍牙蜂鳴模組 -->
  <line x1="242" y1="300" x2="330" y2="300" stroke="#64748b" stroke-dasharray="3,3"/>
  <rect x="330" y="285" width="130" height="32" rx="4" fill="#fef3c7"/>
  <text x="340" y="305" font-family="sans-serif" font-size="11" font-weight="bold" fill="#92400e">握把 BLE 藍牙防丟</text>

  <!-- 3. 離心快速收納 -->
  <line x1="230" y1="240" x2="330" y2="230" stroke="#64748b" stroke-dasharray="3,3"/>
  <rect x="330" y="215" width="130" height="32" rx="4" fill="#d1fae5"/>
  <text x="340" y="235" font-family="sans-serif" font-size="11" font-weight="bold" fill="#065f46">手搖離心甩乾機構</text>

  <!-- 評註卡片 -->
  <rect x="380" y="110" width="180" height="80" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="392" y="132" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">🎯 解決核心痛點：</text>
  <text x="392" y="152" font-family="sans-serif" font-size="10" fill="#475569">1. 室內傘套浪費與滴水</text>
  <text x="392" y="170" font-family="sans-serif" font-size="10" fill="#475569">2. 捷運與餐廳常遺忘雨傘</text>
</svg>
`);

// 範例 2：自動澆水器 SVG 原型草圖
const SVG_WATERER = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#f8fafc" rx="16"/>
  <rect x="20" y="20" width="560" height="360" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" rx="12"/>
  
  <text x="40" y="55" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b">【設計思考原型草圖】智慧盆栽自動澆水器</text>
  <text x="40" y="75" font-family="sans-serif" font-size="12" fill="#64748b">設計者：陳大偉 | 概念階段：功能樣機驗證</text>
  <line x1="40" y1="90" x2="560" y2="90" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- 植栽盆 -->
  <path d="M 280 230 L 390 230 L 370 330 L 300 330 Z" fill="#b45309" opacity="0.9"/>
  <!-- 植物 -->
  <path d="M 335 230 Q 310 180 290 190 Q 330 200 335 230 Z" fill="#22c55e"/>
  <path d="M 335 230 Q 360 170 380 180 Q 345 195 335 230 Z" fill="#16a34a"/>
  
  <!-- 土壤濕度感測器 -->
  <rect x="325" y="240" width="12" height="70" fill="#0f172a" rx="2"/>
  <line x1="331" y1="240" x2="220" y2="180" stroke="#ef4444" stroke-width="2"/>

  <!-- 回收儲水槽 (寶特瓶) -->
  <rect x="100" y="160" width="60" height="130" rx="8" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/>
  <rect x="118" y="145" width="24" height="15" fill="#0284c7" rx="2"/>
  
  <!-- 微型蠕動泵 / 輸水管 -->
  <circle cx="200" cy="240" r="18" fill="#64748b"/>
  <path d="M 130 270 Q 180 270 200 240 Q 240 200 330 225" fill="none" stroke="#0ea5e9" stroke-width="3" stroke-dasharray="4,4"/>

  <!-- 控制板與微太陽能板 -->
  <rect x="180" y="140" width="65" height="45" rx="4" fill="#065f46"/>
  <text x="188" y="166" font-family="monospace" font-size="10" fill="#a7f3d0">MCU Core</text>

  <!-- 標籤說明 -->
  <rect x="420" y="130" width="140" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="430" y="155" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">🛠️ 關鍵架構：</text>
  <text x="430" y="180" font-family="sans-serif" font-size="10" fill="#334155">• 電容式防蝕濕度計</text>
  <text x="430" y="205" font-family="sans-serif" font-size="10" fill="#334155">• 寶特瓶重力集水槽</text>
  <text x="430" y="230" font-family="sans-serif" font-size="10" fill="#334155">• 太陽能免插電供電</text>
  <text x="430" y="255" font-family="sans-serif" font-size="10" fill="#334155">• 成本控制 &lt; 150 元</text>
</svg>
`);

// 範例 3：減壓護脊書包 SVG 原型草圖
const SVG_BACKPACK = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#f8fafc" rx="16"/>
  <rect x="20" y="20" width="560" height="360" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" rx="12"/>
  
  <text x="40" y="55" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b">【設計思考原型草圖】減壓護脊懸浮書包</text>
  <text x="40" y="75" font-family="sans-serif" font-size="12" fill="#64748b">設計者：張家豪 | 概念階段：人體工學懸吊驗證</text>
  <line x1="40" y1="90" x2="560" y2="90" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- 書包主體剖面圖 -->
  <rect x="180" y="130" width="140" height="200" rx="16" fill="#3b82f6" opacity="0.9"/>
  <!-- 內部重心鎖定隔層 -->
  <line x1="225" y1="140" x2="225" y2="320" stroke="#ffffff" stroke-width="3" stroke-dasharray="6,4"/>
  <rect x="195" y="150" width="22" height="140" fill="#f59e0b" rx="3"/>
  <text x="199" y="225" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff" transform="rotate(-90 199 225)">重書貼背夾</text>

  <!-- 背部氣流導風道 -->
  <path d="M 320 150 Q 345 230 320 310" fill="none" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
  <text x="340" y="235" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0284c7">蜂巢導流風道</text>

  <!-- 氣壓懸吊減震背帶 -->
  <path d="M 190 140 C 130 170 120 270 180 310" fill="none" stroke="#1e293b" stroke-width="8" stroke-linecap="round"/>
  <!-- 減震彈簧/氣囊示意 -->
  <circle cx="135" cy="210" r="14" fill="#ef4444" opacity="0.8"/>
  <text x="127" y="214" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff">TPU</text>

  <!-- 標籤說明 -->
  <rect x="390" y="115" width="170" height="150" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="402" y="140" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">🎒 創新亮點分析：</text>
  <text x="402" y="165" font-family="sans-serif" font-size="10" fill="#334155">• 動態懸浮減震氣壓帶</text>
  <text x="402" y="190" font-family="sans-serif" font-size="10" fill="#334155">• 重心貼背力矩最優化</text>
  <text x="402" y="215" font-family="sans-serif" font-size="10" fill="#334155">• 背部蜂巢透氣不長痱</text>
  <text x="402" y="240" font-family="sans-serif" font-size="10" fill="#334155">• 震盪衝擊力實測 -35%</text>
</svg>
`);

// 三大範例結構定義
const PRESETS = {
  umbrella: {
    studentName: '林小晴',
    projectTitle: '折疊智慧傘',
    empathy: '訪談捷運通勤族與校園警衛，發現下雨天大家進入室內時，傘套常常掉落遺失，造成一次性塑膠傘袋大量浪費，且折傘收納經常弄濕背包與地面，造成滑倒隱患。此外雨天常因手忙腳亂而把雨傘遺忘在公車或餐廳。',
    pov: '通勤上班族與學生在驟雨天氣需要一種「能自動甩乾、不易遺落、隨時掌握天氣提醒」的隨身雨傘，以減少環境浪費並避免室內濕滑危險。',
    ideation: '1. 採用奈米疏水荷葉效應布料，一甩即乾。\n2. 傘柄內嵌低功耗藍牙 (BLE) 蜂鳴晶片，離開十公尺手機立即警報提醒。\n3. 手柄底部加入反向旋轉離心甩水機構，不用套塑膠袋。\n4. 傘骨末端採用微型反光邊條，提升夜雨行走安全。',
    feasibility: '3D 列印強化 ABS 製作旋轉甩水原型手柄；電子部分選用成熟的 Nordic nRF52 藍牙模組；布料採購市售高密度奈米超潑水布料，樣品成本約 220 元，具備量產與教育推廣可行性。',
    image: SVG_UMBRELLA,
    scores: {
      empathy: 92,
      pov: 88,
      ideation: 90,
      feasibility: 82
    },
    strengths: {
      empathy: '訪談族群清晰，深入探討通勤族尖峰時刻傘套掉落與地面濕滑危險，同理心相當深厚。',
      pov: '觀點陳述聚焦明確，成功串連「室內防滴水」與「出門防遺忘」兩大關鍵隱性需求。',
      ideation: '將奈米疏水布料搭配手搖離心收傘機構，跳脫傳統一次性塑膠傘套思維，深具環保與創意價值。',
      feasibility: '選材符合生活可行標準，3D 列印機構與低功耗藍牙晶片整合性佳，原型易於快速疊代。'
    },
    suggestions: {
      empathy: '可補充問卷調查或不同年齡層（如長者、學童）在開合傘時的手部施力差異數據。',
      pov: '嘗試運用「How Might We (我們如何能...)」句型將問題細分成兩至三個子挑戰。',
      ideation: '可探討在傘骨反光夜間辨識、握把人體工學掛扣上做出更多造形突破。',
      feasibility: '需留意電子零件防水等級 (建議達 IPX4 以上) 以及強風環境下的傘骨抗風壓測試。'
    },
    summary: '林小晴同學在此專題展現了非常出色的同理心，能精準洞察通勤族下雨天進室內傘套遺失與滴水問題。構想結合奈米疏水布與藍牙防丟晶片，構想新穎且具備商品化潛力。建議後續原型測試可進一步評估微型電池更換週期與機構耐用度。'
  },
  waterer: {
    studentName: '陳大偉',
    projectTitle: '智慧盆栽自動澆水器',
    empathy: '訪談公寓陽台植栽愛好者與學校園藝社志工，大家在寒暑假或長假出遊時，盆栽常因無人照料而乾枯，現有市售滴灌系統管線複雜且需插電，常引發漏電漏水擔憂。',
    pov: '喜愛綠植的忙碌都會租屋族需要一種「免插電自供電、根據土壤濕度自動補水、水量異常時主動警示」的低成本微型裝置，以確保出遠門時植物健康存活。',
    ideation: '1. 微型太陽能板蓄電供電，無需拉電源延長線。\n2. 採用電容式防腐蝕土壤濕度感測器，自適應感應需水量。\n3. 重力微動閥門與回收寶特瓶循環水箱結合。\n4. 加入缺水蜂鳴與低水位 LED 提示燈。',
    feasibility: '核心微控器採用低功耗 ATTiny85 或 ESP32，管路使用食品級矽膠管，外殼以回收 PET 塑膠 3D 列印製作，原型材料總成本低於 150 元，已成功完成連續 7 天盆栽供水測試。',
    image: SVG_WATERER,
    scores: {
      empathy: 86,
      pov: 85,
      ideation: 88,
      feasibility: 92
    },
    strengths: {
      empathy: '對都市園藝族長假外出無人顧花的痛點觀察細膩，問題貼近生活情境。',
      pov: '目標對象鎖定明確，將「免插電」與「依濕度定量補水」列為核心價值主張。',
      ideation: '運用重力落差與回收寶特瓶作為儲水容器，結合綠能與減塑思維，極具巧思。',
      feasibility: '電路與管線設計完整，成本控制優異，且已具備七天實測數據，工程落地性極高。'
    },
    suggestions: {
      empathy: '可擴大調查多肉、蕨類等不同耐旱度植物的需水週期，使同理廣度更全面。',
      pov: '可延伸探討「過度澆水導致根腐」的問題定義，避免單一維度的只補水邏輯。',
      ideation: '可加入手機藍牙或 Wi-Fi 微型回報模組，讓使用者即使在遠端也能確認水位狀態。',
      feasibility: '需評估夏季室外高溫環境下太陽能板轉換效率與蓄電池耐溫壽命。'
    },
    summary: '陳大偉同學的專案工程實踐力極強，從回收環保材料到電容防腐感測器皆展現深厚創客素養。作品不僅能有效解決陽台植物長假照護痛點，更具備商品化量產的成本優勢。'
  },
  backpack: {
    studentName: '張家豪',
    projectTitle: '減壓護脊書包',
    empathy: '實地訪談國小高年級學生與家長，並以體重計秤重，發現學童每天書包重量普遍達 6 至 8 公斤。家長極度擔心高低肩與脊椎側彎，且夏天背部悶熱容易長痱子。',
    pov: '正值發育期的中小學學童需要一種「動態懸浮減震、重心能穩定貼背、背部通風導流」的輕量化書包，以減輕肩頸與脊椎的瞬時衝擊負擔。',
    ideation: '1. 結合汽車懸吊彈簧概念的微型 TPU 氣壓減震背帶。\n2. 內部蜂巢式活動分層，將厚重教科書重心固定於背部正上方。\n3. 背部 X 型散熱通風風道，保持空氣對流。\n4. 磁吸快拆反光胸扣，方便單手開闔。',
    feasibility: '主面料使用高密度耐磨抗撕裂尼龍，減震氣閥以熱塑聚氨酯 (TPU) 進行打樣，經負重慢跑震盪測試證實可降低 35% 瞬時衝擊力。',
    image: SVG_BACKPACK,
    scores: {
      empathy: 94,
      pov: 91,
      ideation: 87,
      feasibility: 85
    },
    strengths: {
      empathy: '有量化數據支持（實際秤重 6-8kg），同理心扎實且針對人體健康痛點直指核心。',
      pov: '問題定義精確切入「動態行走時的瞬時衝擊」而非僅僅是「靜態重量」，見解深刻。',
      ideation: '懸浮氣壓背帶結合內部重心鎖定隔層，從「受力機制」與「力矩平衡」兩端同步創新。',
      feasibility: '打樣材料選擇專業，並有實際慢跑負重測試數據支撐，原型驗證扎實。'
    },
    suggestions: {
      empathy: '可諮詢骨科或物理治療專業醫師的看法，增強醫療健康層面的學理佐證。',
      pov: '可評估不同體型或身高區間學童的背長調節需求。',
      ideation: '可進一步考量書包空重控制，避免防護機構過多反而增加額外淨重。',
      feasibility: '可進行長達數千次的反覆按壓耐疲勞測試，以確保氣閥氣囊在長年使用下的氣密性。'
    },
    summary: '張家豪同學以嚴謹的量化數據定義了學童書包負重痛點，並創新性地將懸浮動態減震導入生活用品中。設計概念完整，兼顧力學平衡與健康需求，是一份極具啟發性的設計思考專案！'
  }
};

// ==========================================
// 2. 狀態管理
// ==========================================
let currentEvaluation = JSON.parse(JSON.stringify(PRESETS.umbrella));
let radarChartInstance = null;
let uploadedImageBase64 = null;
let isSpeaking = false;
let speechUtterance = null;
let animationFrameId = null;

// ==========================================
// 3. DOM 元素快取
// ==========================================
const DOM = {
  // 設定與狀態
  toggleSettingsBtn: document.getElementById('toggle-settings-btn'),
  apiConfigPanel: document.getElementById('api-config-panel'),
  modelSelect: document.getElementById('model-select'),
  customModelId: document.getElementById('custom-model-id'),
  hfTokenInput: document.getElementById('hf-token-input'),
  toggleTokenVisibility: document.getElementById('toggle-token-visibility'),
  modeStatusBadge: document.getElementById('mode-status-badge'),
  modeStatusText: document.getElementById('mode-status-text'),
  spaceRepoLink: document.getElementById('space-repo-link'),

  // 案例按鈕
  presetBtns: document.querySelectorAll('.preset-btn'),

  // 輸入欄位
  imageUploadInput: document.getElementById('image-upload-input'),
  dropZone: document.getElementById('drop-zone'),
  uploadPlaceholder: document.getElementById('upload-placeholder'),
  imagePreview: document.getElementById('image-preview'),
  clearImageBtn: document.getElementById('clear-image-btn'),
  inputStudentName: document.getElementById('input-student-name'),
  inputProjectTitle: document.getElementById('input-project-title'),
  inputEmpathy: document.getElementById('input-empathy'),
  inputPov: document.getElementById('input-pov'),
  inputIdeation: document.getElementById('input-ideation'),
  inputFeasibility: document.getElementById('input-feasibility'),
  startEvalBtn: document.getElementById('start-eval-btn'),

  // 儀表板與卡片
  currentModelBadge: document.getElementById('current-model-badge'),
  displayProjectTitle: document.getElementById('display-project-title'),
  displayStudentName: document.getElementById('display-student-name'),
  overallScoreDisplay: document.getElementById('overall-score-display'),
  overallTierBadge: document.getElementById('overall-tier-badge'),
  summaryCommentsText: document.getElementById('summary-comments-text'),

  // 滑桿與分項數值
  sliderEmpathy: document.getElementById('slider-empathy'),
  sliderPov: document.getElementById('slider-pov'),
  sliderIdeation: document.getElementById('slider-ideation'),
  sliderFeasibility: document.getElementById('slider-feasibility'),
  scoreTextEmpathy: document.getElementById('score-text-empathy'),
  scoreTextPov: document.getElementById('score-text-pov'),
  scoreTextIdeation: document.getElementById('score-text-ideation'),
  scoreTextFeasibility: document.getElementById('score-text-feasibility'),
  badgeEmpathy: document.getElementById('badge-empathy'),
  badgePov: document.getElementById('badge-pov'),
  badgeIdeation: document.getElementById('badge-ideation'),
  badgeFeasibility: document.getElementById('badge-feasibility'),

  // 質性回饋文字
  cardBadgeEmpathy: document.getElementById('card-badge-empathy'),
  cardBadgePov: document.getElementById('card-badge-pov'),
  cardBadgeIdeation: document.getElementById('card-badge-ideation'),
  cardBadgeFeasibility: document.getElementById('card-badge-feasibility'),
  textStrengthEmpathy: document.getElementById('text-strength-empathy'),
  textSuggEmpathy: document.getElementById('text-sugg-empathy'),
  textStrengthPov: document.getElementById('text-strength-pov'),
  textSuggPov: document.getElementById('text-sugg-pov'),
  textStrengthIdeation: document.getElementById('text-strength-ideation'),
  textSuggIdeation: document.getElementById('text-sugg-ideation'),
  textStrengthFeasibility: document.getElementById('text-strength-feasibility'),
  textSuggFeasibility: document.getElementById('text-sugg-feasibility'),

  // 語音與波形
  voicePlayBtn: document.getElementById('voice-play-btn'),
  voiceStopBtn: document.getElementById('voice-stop-btn'),
  waveformCanvas: document.getElementById('waveform-canvas'),
  voiceStatusCaption: document.getElementById('voice-status-caption'),
  voiceTimeIndicator: document.getElementById('voice-time-indicator'),

  // 操作按鈕
  resetDataBtn: document.getElementById('reset-data-btn'),
  printA4Btn: document.getElementById('print-a4-btn'),

  // 列印區塊欄位
  printOverallScore: document.getElementById('print-overall-score'),
  printOverallTier: document.getElementById('print-overall-tier'),
  printStudentName: document.getElementById('print-student-name'),
  printProjectTitle: document.getElementById('print-project-title'),
  printEvalDate: document.getElementById('print-eval-date'),
  printModelUsed: document.getElementById('print-model-used'),
  printScoreEmpathy: document.getElementById('print-score-empathy'),
  printTierEmpathy: document.getElementById('print-tier-empathy'),
  printStrEmpathy: document.getElementById('print-str-empathy'),
  printSugEmpathy: document.getElementById('print-sug-empathy'),
  printScorePov: document.getElementById('print-score-pov'),
  printTierPov: document.getElementById('print-tier-pov'),
  printStrPov: document.getElementById('print-str-pov'),
  printSugPov: document.getElementById('print-sug-pov'),
  printScoreIdeation: document.getElementById('print-score-ideation'),
  printTierIdeation: document.getElementById('print-tier-ideation'),
  printStrIdeation: document.getElementById('print-str-ideation'),
  printSugIdeation: document.getElementById('print-sug-ideation'),
  printScoreFeasibility: document.getElementById('print-score-feasibility'),
  printTierFeasibility: document.getElementById('print-tier-feasibility'),
  printStrFeasibility: document.getElementById('print-str-feasibility'),
  printSugFeasibility: document.getElementById('print-sug-feasibility'),
  printSummaryComment: document.getElementById('print-summary-comment')
};

// ==========================================
// 4. 初始化與事件綁定
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initRadarChart();
  initWaveformCanvas();
  loadPreset('umbrella');
  bindEvents();
  updateDateDisplay();
  restoreSessionConfig();
});

// 設定當前日期
function updateDateDisplay() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
  if (DOM.printEvalDate) DOM.printEvalDate.textContent = dateStr;
}

// 讀取暫存設定（僅 sessionStorage）
function restoreSessionConfig() {
  const savedToken = sessionStorage.getItem('dtm_hf_token');
  if (savedToken) {
    DOM.hfTokenInput.value = savedToken;
    updateModeBadge(true);
  }
}

// 事件綁定
function bindEvents() {
  // 設定面板切換
  DOM.toggleSettingsBtn.addEventListener('click', () => {
    DOM.apiConfigPanel.classList.toggle('hidden');
  });

  // Token 顯示/遮蔽
  DOM.toggleTokenVisibility.addEventListener('click', () => {
    const isPassword = DOM.hfTokenInput.type === 'password';
    DOM.hfTokenInput.type = isPassword ? 'text' : 'password';
    DOM.toggleTokenVisibility.innerHTML = isPassword
      ? '<i class="fa-regular fa-eye-slash text-xs"></i>'
      : '<i class="fa-regular fa-eye text-xs"></i>';
  });

  // Token 輸入監聽（暫存於 sessionStorage）
  DOM.hfTokenInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val) {
      sessionStorage.setItem('dtm_hf_token', val);
      updateModeBadge(true);
    } else {
      sessionStorage.removeItem('dtm_hf_token');
      updateModeBadge(false);
    }
  });

  // 模型選擇監聽
  DOM.modelSelect.addEventListener('change', (e) => {
    if (e.target.value === 'custom') {
      DOM.customModelId.classList.remove('hidden');
      DOM.customModelId.focus();
    } else {
      DOM.customModelId.classList.add('hidden');
      updateActiveModelBadge(e.target.value);
    }
  });

  DOM.customModelId.addEventListener('input', (e) => {
    updateActiveModelBadge(e.target.value.trim() || 'Custom Model');
  });

  // 經典範例按鈕點擊
  DOM.presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = btn.getAttribute('data-preset');
      loadPreset(presetKey);
    });
  });

  // 檔案上傳事件
  DOM.imageUploadInput.addEventListener('change', handleImageFileSelect);
  DOM.clearImageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clearUploadedImage();
  });

  // 拖曳上傳
  DOM.dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    DOM.dropZone.classList.add('border-indigo-500', 'bg-indigo-50/40');
  });

  DOM.dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    DOM.dropZone.classList.remove('border-indigo-500', 'bg-indigo-50/40');
  });

  DOM.dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    DOM.dropZone.classList.remove('border-indigo-500', 'bg-indigo-50/40');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  });

  // 點選預覽區亦可觸發檔案選取（當無圖時）
  DOM.dropZone.addEventListener('click', (e) => {
    if (e.target !== DOM.clearImageBtn && !DOM.clearImageBtn.contains(e.target)) {
      DOM.imageUploadInput.click();
    }
  });

  // 滑桿連動更新
  DOM.sliderEmpathy.addEventListener('input', () => handleScoreSliderChange('empathy'));
  DOM.sliderPov.addEventListener('input', () => handleScoreSliderChange('pov'));
  DOM.sliderIdeation.addEventListener('input', () => handleScoreSliderChange('ideation'));
  DOM.sliderFeasibility.addEventListener('input', () => handleScoreSliderChange('feasibility'));

  // AI 評估開始按鈕
  DOM.startEvalBtn.addEventListener('click', startEvaluation);

  // 語音按鈕
  DOM.voicePlayBtn.addEventListener('click', toggleVoicePlayback);
  DOM.voiceStopBtn.addEventListener('click', stopVoicePlayback);

  // 重設按鈕
  DOM.resetDataBtn.addEventListener('click', () => {
    loadPreset('umbrella');
    showNotification('已重設為經典範例【折疊智慧傘】', 'info');
  });

  // 一鍵列印 A4
  DOM.printA4Btn.addEventListener('click', () => {
    window.print();
  });
}

// ==========================================
// 5. 範例載入與欄位渲染
// ==========================================
function loadPreset(presetKey) {
  const data = PRESETS[presetKey];
  if (!data) return;

  currentEvaluation = JSON.parse(JSON.stringify(data));

  // 填入表單欄位
  DOM.inputStudentName.value = data.studentName;
  DOM.inputProjectTitle.value = data.projectTitle;
  DOM.inputEmpathy.value = data.empathy;
  DOM.inputPov.value = data.pov;
  DOM.inputIdeation.value = data.ideation;
  DOM.inputFeasibility.value = data.feasibility;

  // 填入滑桿
  DOM.sliderEmpathy.value = data.scores.empathy;
  DOM.sliderPov.value = data.scores.pov;
  DOM.sliderIdeation.value = data.scores.ideation;
  DOM.sliderFeasibility.value = data.scores.feasibility;

  // 設定示意圖
  setPreviewImage(data.image);

  // 重新渲染儀表板與卡片
  renderDashboard();
  showNotification(`已載入案例：【${data.projectTitle}】`, 'success');
}

// 設定圖片預覽
function setPreviewImage(src) {
  DOM.imagePreview.src = src;
  DOM.imagePreview.classList.remove('hidden');
  DOM.uploadPlaceholder.classList.add('hidden');
  DOM.clearImageBtn.classList.remove('hidden');
  uploadedImageBase64 = src;
}

// 清除圖片預覽
function clearUploadedImage() {
  DOM.imagePreview.src = '';
  DOM.imagePreview.classList.add('hidden');
  DOM.uploadPlaceholder.classList.remove('hidden');
  DOM.clearImageBtn.classList.add('hidden');
  DOM.imageUploadInput.value = '';
  uploadedImageBase64 = null;
}

// 處理選擇檔案
function handleImageFileSelect(e) {
  if (e.target.files && e.target.files[0]) {
    processImageFile(e.target.files[0]);
  }
}

function processImageFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('請上傳影像圖檔格式 (JPG, PNG, WebP)！');
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    setPreviewImage(event.target.result);
    showNotification('學習單圖片已成功載入預覽', 'success');
  };
  reader.readAsDataURL(file);
}

// ==========================================
// 6. 等級計算與儀表板渲染
// ==========================================

// 等級計算依據：>=85 卓越, 70-84 良好, <70 需引導
function calculateTier(score) {
  if (score >= 85) {
    return { name: '卓越', className: 'tier-excellent', icon: 'fa-crown', color: '#10b981' };
  } else if (score >= 70) {
    return { name: '良好', className: 'tier-good', icon: 'fa-thumbs-up', color: '#3b82f6' };
  } else {
    return { name: '需引導', className: 'tier-guidance', icon: 'fa-compass', color: '#f59e0b' };
  }
}

// 更新滑桿變更
function handleScoreSliderChange(dim) {
  const sliderMap = {
    empathy: DOM.sliderEmpathy,
    pov: DOM.sliderPov,
    ideation: DOM.sliderIdeation,
    feasibility: DOM.sliderFeasibility
  };

  const val = parseInt(sliderMap[dim].value, 10);
  currentEvaluation.scores[dim] = val;
  renderDashboard();
}

// 完整渲染儀表板與所有 DOM
function renderDashboard() {
  const { studentName, projectTitle, scores, strengths, suggestions, summary } = currentEvaluation;
  const sName = DOM.inputStudentName.value.trim() || studentName;
  const pTitle = DOM.inputProjectTitle.value.trim() || projectTitle;

  // 1. 標題與基本資訊
  DOM.displayStudentName.textContent = sName;
  DOM.displayProjectTitle.textContent = pTitle;
  if (DOM.printStudentName) DOM.printStudentName.textContent = sName;
  if (DOM.printProjectTitle) DOM.printProjectTitle.textContent = pTitle;

  // 2. 計算各向度與總分
  const avgScore = Math.round((scores.empathy + scores.pov + scores.ideation + scores.feasibility) / 4);
  const overallTier = calculateTier(avgScore);

  DOM.overallScoreDisplay.textContent = avgScore;
  DOM.overallTierBadge.className = `tier-badge ${overallTier.className} mt-0.5`;
  DOM.overallTierBadge.innerHTML = `<i class="fa-solid ${overallTier.icon} text-xs"></i> ${overallTier.name}等級`;

  if (DOM.printOverallScore) DOM.printOverallScore.textContent = `${avgScore} 分`;
  if (DOM.printOverallTier) {
    DOM.printOverallTier.textContent = `${overallTier.name}等級`;
    DOM.printOverallTier.style.color = overallTier.color;
  }

  // 3. 各項度數值與標籤更新
  const dims = ['empathy', 'pov', 'ideation', 'feasibility'];
  dims.forEach(dim => {
    const sc = scores[dim];
    const tier = calculateTier(sc);

    // 儀表板分項數值
    const scoreTextEl = DOM[`scoreText${capitalize(dim)}`];
    const badgeEl = DOM[`badge${capitalize(dim)}`];
    const cardBadgeEl = DOM[`cardBadge${capitalize(dim)}`];

    if (scoreTextEl) scoreTextEl.textContent = sc;
    if (badgeEl) {
      badgeEl.className = `tier-badge ${tier.className} text-[10px]`;
      badgeEl.textContent = tier.name;
    }
    if (cardBadgeEl) {
      cardBadgeEl.className = `tier-badge ${tier.className} text-[10px]`;
      cardBadgeEl.textContent = tier.name;
    }

    // 列印區塊數值更新
    const printScoreEl = DOM[`printScore${capitalize(dim)}`];
    const printTierEl = DOM[`printTier${capitalize(dim)}`];
    if (printScoreEl) printScoreEl.textContent = sc;
    if (printTierEl) {
      printTierEl.textContent = tier.name;
      printTierEl.style.color = tier.color;
    }
  });

  // 4. 質性文字填入
  DOM.textStrengthEmpathy.textContent = strengths.empathy;
  DOM.textSuggEmpathy.textContent = suggestions.empathy;
  DOM.textStrengthPov.textContent = strengths.pov;
  DOM.textSuggPov.textContent = suggestions.pov;
  DOM.textStrengthIdeation.textContent = strengths.ideation;
  DOM.textSuggIdeation.textContent = suggestions.ideation;
  DOM.textStrengthFeasibility.textContent = strengths.feasibility;
  DOM.textSuggFeasibility.textContent = suggestions.feasibility;

  DOM.summaryCommentsText.textContent = summary;

  // 列印區文字
  if (DOM.printStrEmpathy) DOM.printStrEmpathy.textContent = strengths.empathy;
  if (DOM.printSugEmpathy) DOM.printSugEmpathy.textContent = suggestions.empathy;
  if (DOM.printStrPov) DOM.printStrPov.textContent = strengths.pov;
  if (DOM.printSugPov) DOM.printSugPov.textContent = suggestions.pov;
  if (DOM.printStrIdeation) DOM.printStrIdeation.textContent = strengths.ideation;
  if (DOM.printSugIdeation) DOM.printSugIdeation.textContent = suggestions.ideation;
  if (DOM.printStrFeasibility) DOM.printStrFeasibility.textContent = strengths.feasibility;
  if (DOM.printSugFeasibility) DOM.printSugFeasibility.textContent = suggestions.feasibility;
  if (DOM.printSummaryComment) DOM.printSummaryComment.textContent = summary;

  // 5. 更新雷達圖
  updateRadarChartData([scores.empathy, scores.pov, scores.ideation, scores.feasibility]);
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ==========================================
// 7. Chart.js 雷達圖整合
// ==========================================
function initRadarChart() {
  const ctx = document.getElementById('radarChart').getContext('2d');
  radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        '🎯 痛點需求 (Empathy)',
        '🔍 問題定義 (POV)',
        '💡 創意發想 (Ideation)',
        '🛠️ 技術原型 (Feasibility)'
      ],
      datasets: [{
        label: '當前向度表現',
        data: [92, 88, 90, 82],
        backgroundColor: 'rgba(79, 70, 229, 0.25)',
        borderColor: '#4f46e5',
        borderWidth: 2.5,
        pointBackgroundColor: '#4f46e5',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#4f46e5',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            font: { size: 9 },
            color: '#94a3b8',
            backdropColor: 'transparent'
          },
          grid: {
            color: 'rgba(226, 232, 240, 0.8)'
          },
          angleLines: {
            color: 'rgba(203, 213, 225, 0.8)'
          },
          pointLabels: {
            font: {
              size: 11,
              weight: 'bold',
              family: "'Noto Sans TC', sans-serif"
            },
            color: '#1e293b'
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleFont: { size: 12, family: "'Noto Sans TC', sans-serif" },
          bodyFont: { size: 12 },
          padding: 8,
          cornerRadius: 6
        }
      }
    }
  });
}

function updateRadarChartData(dataArray) {
  if (radarChartInstance) {
    radarChartInstance.data.datasets[0].data = dataArray;
    radarChartInstance.update();
  }
}

// ==========================================
// 8. 狀態徽章與模型資訊
// ==========================================
function updateModeBadge(hasToken) {
  if (hasToken) {
    DOM.modeStatusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200';
    DOM.modeStatusBadge.innerHTML = '<i class="fa-solid fa-cloud text-indigo-600 text-[10px]"></i><span>HF Inference API 模式（已配置金鑰）</span>';
  } else {
    DOM.modeStatusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200';
    DOM.modeStatusBadge.innerHTML = '<span class="pulse-dot"></span><span>智慧示範評估模式（免 Token 直接用）</span>';
  }
}

function updateActiveModelBadge(modelId) {
  DOM.currentModelBadge.textContent = modelId;
  if (DOM.printModelUsed) DOM.printModelUsed.textContent = modelId.split('/')[1] || modelId;
}

function getSelectedModel() {
  const sel = DOM.modelSelect.value;
  if (sel === 'custom') {
    return DOM.customModelId.value.trim() || 'Qwen/Qwen2.5-VL-7B-Instruct';
  }
  return sel;
}

// ==========================================
// 9. AI 評量流程（雙軌機制）
// ==========================================
async function startEvaluation() {
  const token = DOM.hfTokenInput.value.trim();
  const modelId = getSelectedModel();

  // 取得使用者填寫資訊
  const sName = DOM.inputStudentName.value.trim() || '自主探究組';
  const pTitle = DOM.inputProjectTitle.value.trim() || '未命名設計專題';
  const empText = DOM.inputEmpathy.value.trim();
  const povText = DOM.inputPov.value.trim();
  const idText = DOM.inputIdeation.value.trim();
  const feText = DOM.inputFeasibility.value.trim();

  // 按鈕動畫與狀態切換
  DOM.startEvalBtn.disabled = true;
  DOM.startEvalBtn.classList.add('analyzing-active');
  DOM.startEvalBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>AI 深度多維度評估診斷中...</span>';

  try {
    let result = null;

    if (token) {
      // 嘗試呼叫 Hugging Face Inference API
      try {
        result = await callHuggingFaceAPI(token, modelId, {
          studentName: sName,
          projectTitle: pTitle,
          empathy: empText,
          pov: povText,
          ideation: idText,
          feasibility: feText,
          imageBase64: uploadedImageBase64
        });
        showNotification('已透過 Hugging Face API 完成模型即時推論！', 'success');
      } catch (apiErr) {
        console.warn('HF API 呼叫遭遇限制，無縫切換至示範引擎：', apiErr);
        showNotification(`API 限制或連線逾時（${apiErr.message || '401/429/CORS'}），已為您切換至智慧示範引擎評分`, 'warning');
        result = runSmartSimulatedEvaluation(sName, pTitle, empText, povText, idText, feText);
      }
    } else {
      // 未輸入 Token，直接執行深度示範引擎
      await new Promise(r => setTimeout(r, 600)); // 擬真微延遲
      result = runSmartSimulatedEvaluation(sName, pTitle, empText, povText, idText, feText);
      showNotification('已依據學習單內容完成智慧示範評估！', 'info');
    }

    // 將評定成果填入全域狀態
    currentEvaluation = result;
    DOM.sliderEmpathy.value = result.scores.empathy;
    DOM.sliderPov.value = result.scores.pov;
    DOM.sliderIdeation.value = result.scores.ideation;
    DOM.sliderFeasibility.value = result.scores.feasibility;

    updateActiveModelBadge(modelId);
    renderDashboard();

  } catch (err) {
    console.error(err);
    alert('評估時發生未預期狀況，請稍後重試。');
  } finally {
    DOM.startEvalBtn.disabled = false;
    DOM.startEvalBtn.classList.remove('analyzing-active');
    DOM.startEvalBtn.innerHTML = '<i class="fa-solid fa-sparkles"></i><span>開始 AI 設計思考四維度評量</span>';
  }
}

// 呼叫 Hugging Face API
async function callHuggingFaceAPI(token, modelId, payload) {
  // 建立提示詞 (Prompt) 要求嚴格 JSON
  const systemPrompt = `你是一位專業且極富同理心的教育部設計思考 (Design Thinking) 創新專題指導教授。
請審閱學生提交的專案學習單，並以繁體中文 (zh-TW) 針對「痛點需求性 (Empathy & Need)」、「問題定義準確性 (POV Definition)」、「想法創意度 (Ideation & Creativity)」、「技術可行性 (Feasibility & Prototyping)」四項指標進行 0-100 分評分，並各別給予一則「優勢肯定」與一則「進階指導建議」，以及一段總結講評。
輸出必須是純 JSON 格式，格式如下：
{
  "scores": { "empathy": 88, "pov": 85, "ideation": 90, "feasibility": 82 },
  "strengths": { "empathy": "...", "pov": "...", "ideation": "...", "feasibility": "..." },
  "suggestions": { "empathy": "...", "pov": "...", "ideation": "...", "feasibility": "..." },
  "summary": "..."
}`;

  const userContent = `專題主題：${payload.projectTitle}
學生：${payload.studentName}
1. 痛點需求：${payload.empathy}
2. POV 定義：${payload.pov}
3. 創意發想：${payload.ideation}
4. 原型可行性：${payload.feasibility}`;

  const response = await fetch(`https://api-inference.huggingface.co/models/${encodeURIComponent(modelId)}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: `${systemPrompt}\n\n學生學習單內容如下：\n${userContent}\n\n請輸出 JSON：`,
      parameters: {
        max_new_tokens: 800,
        return_full_text: false,
        temperature: 0.6
      }
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  const textOutput = Array.isArray(data) ? (data[0].generated_text || '') : (data.generated_text || JSON.stringify(data));
  
  // 嘗試從文本中解析 JSON
  const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('模型未返回有效 JSON 格式');
  }

  const parsed = JSON.parse(jsonMatch[0]);
  return {
    studentName: payload.studentName,
    projectTitle: payload.projectTitle,
    image: payload.imageBase64 || SVG_UMBRELLA,
    scores: {
      empathy: Number(parsed.scores?.empathy) || 85,
      pov: Number(parsed.scores?.pov) || 85,
      ideation: Number(parsed.scores?.ideation) || 85,
      feasibility: Number(parsed.scores?.feasibility) || 85
    },
    strengths: parsed.strengths || {
      empathy: '同理心切入深入生活細節。',
      pov: '問題描述清晰明確。',
      ideation: '提出富突破性的點子。',
      feasibility: '製作方案步驟完備。'
    },
    suggestions: parsed.suggestions || {
      empathy: '可擴大訪談母體樣本數。',
      pov: '可提煉更精確的洞見語句。',
      ideation: '可探討不同情境變形。',
      feasibility: '需補強耐用度與成本試算。'
    },
    summary: parsed.summary || '專案整體架構清晰，展現了良好的設計思考問題解決能力！'
  };
}

// 智慧示範模擬引擎（以啟發式規則分析輸入文字深度）
function runSmartSimulatedEvaluation(sName, pTitle, emp, pov, ide, fea) {
  // 計算文本豐富度
  const empScore = Math.min(96, Math.max(72, 75 + Math.floor(emp.length / 5) + (emp.includes('訪談') || emp.includes('痛點') || emp.includes('使用者') ? 8 : 0)));
  const povScore = Math.min(95, Math.max(70, 74 + Math.floor(pov.length / 5) + (pov.includes('需要') || pov.includes('因為') || pov.includes('POV') ? 9 : 0)));
  const ideScore = Math.min(98, Math.max(73, 76 + Math.floor(ide.length / 5) + (ide.includes('創新') || ide.includes('機構') || ide.includes('突破') || ide.includes('結合') ? 8 : 0)));
  const feaScore = Math.min(94, Math.max(68, 72 + Math.floor(fea.length / 5) + (fea.includes('測試') || fea.includes('材料') || fea.includes('3D') || fea.includes('成本') ? 9 : 0)));

  return {
    studentName: sName,
    projectTitle: pTitle,
    image: uploadedImageBase64 || SVG_UMBRELLA,
    scores: {
      empathy: empScore,
      pov: povScore,
      ideation: ideScore,
      feasibility: feaScore
    },
    strengths: {
      empathy: `針對【${pTitle}】的使用情境有深切體察，能指認出目標客群在操作時的隱性挫折與迫切需求。`,
      pov: `能以明確的使用者視角建構問題敘述，精確鎖定核心瓶頸，展現清晰的問題聚焦力。`,
      ideation: `發想概念打破了傳統單一思考，具備跨域整合潛力，能創造令人驚豔的實用價值。`,
      feasibility: `原型製作選材符合經濟性與取得容易性，驗證流程邏輯嚴密，可有效降低後續疊代試錯成本。`
    },
    suggestions: {
      empathy: `建議可設計簡易問卷或訪談矩陣，進一步交叉比對不同族群（如孩童、長輩、不同工作型態者）的痛點權重。`,
      pov: `可嘗試以「如果完全沒有預算限制」與「極低成本」兩種極端假設，再次審視核心觀點是否依舊穩固。`,
      ideation: `可利用 SCAMPER 奔馳法或逆向思維，在人體工學外型、色彩意象或循環永續材質上延伸更多趣味概念。`,
      feasibility: `需增列安全防護規範（如防水、防摔、防漏電等），並針對關鍵易損耗組件規劃定期維護方案。`
    },
    summary: `${sName} 同學在【${pTitle}】專題中展現出成熟且具系統性的設計思考脈絡。從痛點捕捉到技術實踐皆能環環相扣，兼顧人文關懷與工程落地。期勉團隊依據評量建議繼續深耕原型迭代，邁向更具社會影響力的成熟作品！`
  };
}

// ==========================================
// 10. Web Speech API 語音講評播報
// ==========================================
function toggleVoicePlayback() {
  if (isSpeaking) {
    stopVoicePlayback();
    return;
  }

  if (!('speechSynthesis' in window)) {
    alert('您的瀏覽器不支援 Web Speech API 語音合成功能。');
    return;
  }

  window.speechSynthesis.cancel(); // 先清空佇列

  const summary = DOM.summaryCommentsText.textContent;
  const sName = DOM.displayStudentName.textContent;
  const pTitle = DOM.displayProjectTitle.textContent;
  const avg = DOM.overallScoreDisplay.textContent;

  const speechText = `同學你好！在這次的設計思考專案【${pTitle}】中，你的綜合評核總分為 ${avg} 分。${summary}`;

  speechUtterance = new SpeechSynthesisUtterance(speechText);
  speechUtterance.lang = 'zh-TW';
  speechUtterance.rate = 1.0;
  speechUtterance.pitch = 1.05;

  // 尋找最佳繁體中文語音
  const voices = window.speechSynthesis.getVoices();
  const twVoice = voices.find(v => v.lang === 'zh-TW' || v.lang.includes('TW') || v.name.includes('Yating') || v.name.includes('Meijia') || v.name.includes('Hanhan') || v.name.includes('Taiwan'));
  if (twVoice) {
    speechUtterance.voice = twVoice;
  }

  let startTime = Date.now();
  let timerInterval = null;

  speechUtterance.onstart = () => {
    isSpeaking = true;
    DOM.voicePlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i> 暫停講評';
    DOM.voicePlayBtn.classList.replace('bg-indigo-500', 'bg-amber-500');
    DOM.voicePlayBtn.classList.replace('hover:bg-indigo-600', 'hover:bg-amber-600');
    DOM.voiceStatusCaption.innerHTML = '<span><i class="fa-solid fa-volume-high text-emerald-400 mr-1 fa-beat"></i> 正在播放 AI 導師親切講評...</span>';
    startWaveformAnimation();

    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      DOM.voiceTimeIndicator.textContent = `${mins}:${secs}`;
    }, 500);
  };

  speechUtterance.onend = () => {
    cleanUpVoice(timerInterval);
  };

  speechUtterance.onerror = (e) => {
    console.error('Speech synthesis error:', e);
    cleanUpVoice(timerInterval);
  };

  window.speechSynthesis.speak(speechUtterance);
}

function stopVoicePlayback() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  cleanUpVoice();
}

function cleanUpVoice(interval) {
  if (interval) clearInterval(interval);
  isSpeaking = false;
  DOM.voicePlayBtn.innerHTML = '<i class="fa-solid fa-play"></i> 播放講評';
  DOM.voicePlayBtn.classList.replace('bg-amber-500', 'bg-indigo-500');
  DOM.voicePlayBtn.classList.replace('hover:bg-amber-600', 'hover:bg-indigo-600');
  DOM.voiceStatusCaption.innerHTML = '<span><i class="fa-solid fa-volume-high mr-1"></i> 就緒中：支援繁體中文 (zh-TW) 語音合成</span>';
  stopWaveformAnimation();
}

// ==========================================
// 11. Canvas 動態音訊波形視覺化
// ==========================================
let waveCtx = null;
let waveWidth = 0;
let waveHeight = 0;
let wavePhase = 0;

function initWaveformCanvas() {
  const canvas = DOM.waveformCanvas;
  waveCtx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  drawIdleWave();
}

function resizeCanvas() {
  const canvas = DOM.waveformCanvas;
  canvas.width = canvas.parentElement.clientWidth || 400;
  canvas.height = 64;
  waveWidth = canvas.width;
  waveHeight = canvas.height;
  if (!isSpeaking) drawIdleWave();
}

function drawIdleWave() {
  if (!waveCtx) return;
  waveCtx.clearRect(0, 0, waveWidth, waveHeight);
  waveCtx.beginPath();
  waveCtx.moveTo(0, waveHeight / 2);
  waveCtx.lineTo(waveWidth, waveHeight / 2);
  waveCtx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
  waveCtx.lineWidth = 2;
  waveCtx.stroke();
}

function startWaveformAnimation() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  function animate() {
    if (!isSpeaking) {
      drawIdleWave();
      return;
    }

    waveCtx.clearRect(0, 0, waveWidth, waveHeight);

    // 繪製多層次律動波形 (波浪疊加效果)
    const layers = [
      { color: 'rgba(99, 102, 241, 0.4)', freq: 0.02, amp: 18, speed: 0.08 },
      { color: 'rgba(56, 189, 248, 0.6)', freq: 0.03, amp: 24, speed: 0.12 },
      { color: 'rgba(167, 139, 250, 0.9)', freq: 0.015, amp: 14, speed: 0.05 }
    ];

    layers.forEach(layer => {
      waveCtx.beginPath();
      waveCtx.strokeStyle = layer.color;
      waveCtx.lineWidth = 2.5;

      for (let x = 0; x < waveWidth; x++) {
        const y = waveHeight / 2 + Math.sin(x * layer.freq + wavePhase * layer.speed) * layer.amp * Math.sin(x / waveWidth * Math.PI);
        if (x === 0) {
          waveCtx.moveTo(x, y);
        } else {
          waveCtx.lineTo(x, y);
        }
      }
      waveCtx.stroke();
    });

    wavePhase += 1;
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

function stopWaveformAnimation() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  drawIdleWave();
}

// ==========================================
// 12. 輔助提示 Toast Notification
// ==========================================
function showNotification(msg, type = 'info') {
  const toast = document.createElement('div');
  const colors = {
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-600 text-white',
    info: 'bg-slate-800 text-white'
  };

  toast.className = `fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 transform transition-all duration-300 translate-y-10 opacity-0 ${colors[type] || colors.info}`;
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${msg}</span>`;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
