import { Fund, Question } from './types';

export const MOCK_FUNDS: Fund[] = [
  // --- 核心基金 (Core) ---
  { 
    code: '98639616', 
    name: 'PGIM保德信美國投資級企業債券基金-新臺幣累積型', 
    isin: 'TW00000001', 
    currency: 'TWD', 
    risk: 2, 
    type: 'Core', 
    desc: '主要投資於美國投資級債券，追求穩定的資產增值。', 
    perf: '+8.2%', perf2y: '+14.5%', perf3y: '+18.1%' 
  },
  { 
    code: '98637171', 
    name: '野村亞太複合非投資等級債券基金-累積型新臺幣計價', 
    isin: 'TW00000002', 
    currency: 'TWD', 
    risk: 3, 
    type: 'Core', 
    desc: '平衡亞太區投資等級與非投資等級債券，優化收益空間。', 
    perf: '+9.5%', perf2y: '+18.2%', perf3y: '+22.5%' 
  },
  { 
    code: '98637337', 
    name: 'PGIM保德信新興市場企業債券基金-新臺幣累積型', 
    isin: 'TW00000003', 
    currency: 'TWD', 
    risk: 3, 
    type: 'Core', 
    desc: '鎖定新興市場優質企業債券，獲取較高的債息回報。', 
    perf: '+10.1%', perf2y: '+19.4%', perf3y: '+24.8%' 
  },
  { 
    code: '98636594', 
    name: '野村全球高股息基金累積型新臺幣計價', 
    isin: 'TW00000004', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Core', 
    desc: '精選全球具備高股息發放能力之龍頭企業，平衡成長與收息。', 
    perf: '+12.5%', perf2y: '+24.1%', perf3y: '+38.2%' 
  },
  { 
    code: '98636798', 
    name: '野村亞太高股息基金累積型新臺幣計價', 
    isin: 'TW00000005', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Core', 
    desc: '聚焦亞太區優質高息股，捕捉區域成長與配息動能。', 
    perf: '+14.2%', perf2y: '+28.5%', perf3y: '+42.1%' 
  },
  { 
    code: '98638825', 
    name: '統一大東協高股息基金(新台幣)', 
    isin: 'TW00000006', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Core', 
    desc: '深耕東協市場，鎖定當地高成長潛力之高息標的。', 
    perf: '+16.8%', perf2y: '+32.4%', perf3y: '+48.5%' 
  },
  { 
    code: '98637910', 
    name: 'PGIM保德信中國好時平衡基金-新臺幣累積型', 
    isin: 'TW00000007', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Core', 
    desc: '透過股債平衡配置，降低中國市場波動並追求長期增值。', 
    perf: '+11.5%', perf2y: '+15.2%', perf3y: '+20.1%' 
  },
  { 
    code: '98638198', 
    name: '中國信託樂齡收益平衡基金-美元A', 
    isin: 'TW00000008', 
    currency: 'USD', 
    risk: 4, 
    type: 'Core', 
    desc: '鎖定全球高齡化社會商機，採多重資產配置追求收益。', 
    perf: '+9.2%', perf2y: '+16.1%', perf3y: '+22.4%' 
  },
  { 
    code: '98638199', 
    name: '中國信託樂齡收益平衡基金-美元B', 
    isin: 'TW00000009', 
    currency: 'USD', 
    risk: 4, 
    type: 'Core', 
    desc: '鎖定全球高齡化社會商機，採多重資產配置追求收益。', 
    perf: '+9.1%', perf2y: '+15.9%', perf3y: '+21.8%' 
  },
  { 
    code: 'C0109015', 
    name: 'PGIM Jennison美國成長基金A級別美元累積型', 
    isin: 'TW000T1212A5', 
    currency: 'USD', 
    risk: 4, 
    type: 'Core', 
    desc: '聚焦美國大型成長企業，追求資本長期增值的極大化。', 
    perf: '+28.4%', perf2y: '+58.2%', perf3y: '+91.4%' 
  },
  { 
    code: 'C0115008', 
    name: '法盛盧米斯賽勒斯美國成長股票基金-R/A美元級別', 
    isin: 'TW000T0606A1', 
    currency: 'USD', 
    risk: 4, 
    type: 'Core', 
    desc: '由美國投資大師領軍，挖掘具長期競爭力之價值股。', 
    perf: '+22.2%', perf2y: '+45.8%', perf3y: '+72.1%' 
  },
  { 
    code: 'C0115009', 
    name: '法盛盧米斯賽勒斯美國成長股票基金-RET/A美元級別', 
    isin: 'TW000T0606A2', 
    currency: 'USD', 
    risk: 4, 
    type: 'Core', 
    desc: '聚焦美國大型成長企業。', 
    perf: '+22.1%', perf2y: '+45.5%', perf3y: '+71.8%' 
  },
  { 
    code: '98638396', 
    name: '野村亞太新興債券基金-累積類型新臺幣計價', 
    isin: 'TW00000010', 
    currency: 'TWD', 
    risk: 3, 
    type: 'Core', 
    desc: '投資於亞太新興市場債券，平衡收益與風險。', 
    perf: '+10.5%', perf2y: '+18.8%', perf3y: '+25.2%' 
  },
  { 
    code: '98639960', 
    name: '台新新興短期非投資等級債券基金(累積型)-新臺幣', 
    isin: 'TW00000011', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Core', 
    desc: '側重短期存續期間標的，降低利率波動影響。', 
    perf: '+11.2%', perf2y: '+20.5%', perf3y: '+28.9%' 
  },
  { 
    code: '73998065', 
    name: 'PGIM保德信大中華基金-新台幣', 
    isin: 'TW00000012', 
    currency: 'TWD', 
    risk: 5, 
    type: 'Core', 
    desc: '鎖定兩岸三地最具動能之優質企業，追求超額回報。', 
    perf: '+19.5%', perf2y: '+38.4%', perf3y: '+52.1%' 
  },
  { 
    code: '98637078', 
    name: '統一大中華中小基金(新台幣)', 
    isin: 'TW00000013', 
    currency: 'TWD', 
    risk: 5, 
    type: 'Core', 
    desc: '聚焦大中華區中小型成長股，爆發力強。', 
    perf: '+21.2%', perf2y: '+42.5%', perf3y: '+60.8%' 
  },
  { 
    code: '98636611', 
    name: 'PGIM保德信全球中小基金-新臺幣', 
    isin: 'TW00000014', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Core', 
    desc: '透過全球化分散佈局中小型企業，分散單一市場風險。', 
    perf: '+17.8%', perf2y: '+32.1%', perf3y: '+48.5%' 
  },

  // --- 衛星基金 (Satellite) ---
  { 
    code: '98638042', 
    name: '野村全球短期收益基金-新臺幣計價', 
    isin: 'TW00001001', 
    currency: 'TWD', 
    risk: 2, 
    type: 'Satellite', 
    desc: '以短期資產配置為主，維持良好流動性與穩健回報。', 
    perf: '+5.5%', perf2y: '+10.2%', perf3y: '+14.5%' 
  },
  { 
    code: '98638121', 
    name: 'PGIM保德信多元收益組合基金-新台幣累積型', 
    isin: 'TW00001002', 
    currency: 'TWD', 
    risk: 3, 
    type: 'Satellite', 
    desc: '採多重資產組合策略，靈活調整以應對市場波動。', 
    perf: '+6.8%', perf2y: '+12.5%', perf3y: '+18.2%' 
  },
  { 
    code: '98638125', 
    name: '野村多元收益多重資產基金-累積類型新臺幣計價', 
    isin: 'TW00001003', 
    currency: 'TWD', 
    risk: 3, 
    type: 'Satellite', 
    desc: '涵蓋股債與另類資產，提供多元化收益來源。', 
    perf: '+7.2%', perf2y: '+13.8%', perf3y: '+19.5%' 
  },
  { 
    code: '98637745', 
    name: '野村全球高股息基金-累積類型人民幣計價', 
    isin: 'TW00001004', 
    currency: 'CNY', 
    risk: 4, 
    type: 'Satellite', 
    desc: '精選全球具備高股息發放能力之企業。', 
    perf: '+12.1%', perf2y: '+22.5%', perf3y: '+34.8%' 
  },
  { 
    code: '98637933', 
    name: '野村亞太高股息基金-累積型人民幣計價', 
    isin: 'TW00001005', 
    currency: 'CNY', 
    risk: 4, 
    type: 'Satellite', 
    desc: '聚焦亞太區優質高息股。', 
    perf: '+13.8%', perf2y: '+25.2%', perf3y: '+38.5%' 
  },
  { 
    code: '98636728', 
    name: '野村台灣高股息基金-累積類型', 
    isin: 'TW00001006', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '鎖定台股優質高息企業，參與台股除息旺季與長期成長。', 
    perf: '+18.5%', perf2y: '+35.2%', perf3y: '+52.1%' 
  },
  { 
    code: '98638350', 
    name: 'PGIM保德信策略成長ETF組合基金-新台幣', 
    isin: 'TW00001007', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '透過策略型ETF佈局全球，追求長期超額成長空間。', 
    perf: '+15.4%', perf2y: '+30.2%', perf3y: '+45.8%' 
  },
  { 
    code: '98640652', 
    name: '台新ESG環保愛地球成長基金-新臺幣', 
    isin: 'TW00001008', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '鎖定符合ESG與環保趨勢之優質成長股，參與永續紅利。', 
    perf: '+20.1%', perf2y: '+41.2%', perf3y: '+62.5%' 
  },
  { 
    code: '98640759', 
    name: '野村全球正向效應成長基金-累積類型新臺幣', 
    isin: 'TW00001009', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '投資於對社會與環境具備正向效應之企業，結合報酬與影響力。', 
    perf: '+19.2%', perf2y: '+38.5%', perf3y: '+58.1%' 
  },
  { 
    code: '98636754', 
    name: '野村全球不動產證券化基金累積型新臺幣計價', 
    isin: 'TW00001010', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '鎖定全球REITs標的，獲取租金收益與資產增值機會。', 
    perf: '+11.8%', perf2y: '+20.5%', perf3y: '+28.2%' 
  },
  { 
    code: 'C0109018', 
    name: 'PGIM全球精選不動產證券基金A美元累積型', 
    isin: 'TW000T0101A0', 
    currency: 'USD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '鎖定全球REITs標的。', 
    perf: '+11.5%', perf2y: '+19.8%', perf3y: '+27.5%' 
  },
  { 
    code: '98637741', 
    name: '野村全球不動產證券化基金-累積類型人民幣計價', 
    isin: 'TW00001011', 
    currency: 'CNY', 
    risk: 4, 
    type: 'Satellite', 
    desc: '鎖定全球REITs標的。', 
    perf: '+11.2%', perf2y: '+19.2%', perf3y: '+26.8%' 
  },

  // --- ETF 標的 ---
  { 
    code: '00772B', 
    name: '中信高評級公司債', 
    isin: 'TW00000772B', 
    currency: 'TWD', 
    risk: 2, 
    type: 'Satellite', 
    desc: '追求彭博10年期以上高評級美元公司債指數之收益。', 
    perf: '+4.5%', perf2y: '+8.2%', perf3y: '+11.5%' 
  },
  { 
    code: '0056', 
    name: '元大高股息', 
    isin: 'TW000005600', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '台股高股息經典指標，鎖定預測殖利率最高之企業。', 
    perf: '+15.2%', perf2y: '+32.4%', perf3y: '+48.5%' 
  },
  { 
    code: '006208', 
    name: '富邦台50', 
    isin: 'TW000006208', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '貼近台股市值前50大企業表現，成本低廉。', 
    perf: '+22.5%', perf2y: '+48.2%', perf3y: '+72.5%' 
  },
  { 
    code: '0050', 
    name: '元大台灣50', 
    isin: 'TW000005000', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '台灣市值最大50家上市企業縮影。', 
    perf: '+22.4%', perf2y: '+48.1%', perf3y: '+72.2%' 
  },
  { 
    code: '00646', 
    name: '元大S&P500', 
    isin: 'TW000006460', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '追蹤美股標普500指數，掌握全球最強企業動能。', 
    perf: '+25.2%', perf2y: '+52.5%', perf3y: '+80.1%' 
  },
  { 
    code: '00662', 
    name: '富邦NASDAQ', 
    isin: 'TW000006620', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '鎖定那斯達克100大科技股，追求超額報酬首選。', 
    perf: '+32.1%', perf2y: '+68.5%', perf3y: '+105.2%' 
  },
  { 
    code: '006203', 
    name: '元大MSCI台灣', 
    isin: 'TW000006203', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '追蹤MSCI台灣指數，受外資青睞之配置標的。', 
    perf: '+21.5%', perf2y: '+45.8%', perf3y: '+68.2%' 
  },
  { 
    code: '0052', 
    name: '富邦科技', 
    isin: 'TW000005200', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '聚焦台股電子權值股，掌握台灣科技產業核心優勢。', 
    perf: '+28.5%', perf2y: '+62.1%', perf3y: '+95.4%' 
  },
  { 
    code: '00692', 
    name: '富邦公司治理', 
    isin: 'TW000006920', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '選取符合公司治理指標之優質台股企業。', 
    perf: '+20.2%', perf2y: '+42.1%', perf3y: '+65.5%' 
  },
  { 
    code: '00663L', 
    name: '國泰臺灣加權正2', 
    isin: 'TW00000663L', 
    currency: 'TWD', 
    risk: 5, 
    type: 'Satellite', 
    desc: '台股加權指數單日兩倍回報，適合積極波段操作。', 
    perf: '+45.2%', perf2y: '+98.5%', perf3y: '+152.1%' 
  }
];

export const QUESTIONS: Record<string, Question[]> = {
  type2: [
    { id: 1, text: "一想到火鍋，我就想到減肥。", type: 'range' },
    { id: 2, text: "一想到品質，我就想到太貴。", type: 'range' },
    { id: 3, text: "一想到高配息，我就想到我需要。", type: 'range' },
    { id: 4, text: "一想到暴跌，我就想到加碼。", type: 'range' },
    { id: 5, text: "一想到借錢投資，我就想到加速破產。", type: 'range' },
    { id: 6, text: "一想到存股，我就覺得無聊。", type: 'range' },
    { id: 7, text: "一想到契約，我就感到被限制。", type: 'range' },
    { id: 8, text: "一想到吃Buffet，我就覺得好空虛。", type: 'range' },
    { id: 9, text: "一想到小孩教育，我就想到送出國。", type: 'range' },
    { id: 10, text: "一想到買手機，我就想到指定品牌。", type: 'range' },
  ],
  type3: [
    { id: 11, text: "我常在事後才發現，自己當下其實是情緒化決定。", type: 'range' },
    { id: 12, text: "如果沒有人提醒，我很容易忘記長期計畫。", type: 'range' },
    { id: 13, text: "比起錯過機會，我更怕做錯決定。", type: 'range' },
    { id: 14, text: "看到別人投資賺錢，我會重新檢討自己的配置。", type: 'range' },
    { id: 15, text: "看到排隊名店，我也會想去排隊嚐鮮", type: 'range' },
    { id: 16, text: "去熟悉的餐廳，我每次都點一樣的餐點", type: 'range' },
    { id: 17, text: "買新手機時，我一定會加購意外險", type: 'range' },
    { id: 18, text: "參加抽獎活動...我寧願選『100% 獲得小獎』", type: 'range' },
    { id: 19, text: "比起賺獎金，我更喜歡底薪高一點", type: 'range' },
  ],
  type4: [
    { id: 20, q: "宇宙農業部開放三個星系，你想去哪裡？", type: 'choice', options: [
      { val: 1, text: "銀河聯盟 (保守)" },
      { val: 4, text: "家鄉基地 (平衡)" },
      { val: 7, text: "蠻荒新星 (積極)" }
    ]},
    { id: 21, q: "來到宇宙樹苗交易所，你會選哪棵?", type: 'choice', options: [
      { val: 1, text: "安心麵包樹 (保守)" },
      { val: 4, text: "全能混種樹 (平衡)" },
      { val: 7, text: "傑克魔豆樹 (積極)" }
    ]},
    { id: 22, q: "持有「銀河通用幣」讓我更有安全感。", type: 'bool' },
    { id: 23, q: "豐收的金幣是用來買火箭登陸土星。", type: 'bool' },
    { id: 24, q: "我喜歡多摘果實落袋，不怕搖錢樹傷了根基。", type: 'bool' },
    { id: 25, q: "看到隔壁大豐收，我不跟風。", type: 'bool' },
    { id: 26, q: "與其求穩，我更想賭一把未來的。", type: 'bool' },
    { id: 27, q: "我放心交給機器人自動灌溉。", type: 'bool' },
    { id: 28, q: "我不急著收成，寧願養分全回流。", type: 'bool' },
    { id: 29, q: "我想在最短時間內，追求金幣自由。", type: 'bool' },
    { id: 30, q: "這棵樹是留給下一代的傳家寶。", type: 'bool' },
  ]
};