
import { Fund, Question } from './types';

export const MOCK_FUNDS: Fund[] = [
  // 核心配置 (Core) - 精選長青主動型基金
  { 
    code: '安聯台灣大壩', 
    name: '安聯台灣大壩基金-A', 
    isin: 'TW000T1212A5', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Core', 
    desc: '透過由下而上的選股策略，佈局具備長期競爭力之台灣權值與成長股，是台灣最具代表性的主動型基金之一。', 
    perf: '+22.4%', 
    perf2y: '+45.8%', 
    perf3y: '+72.1%' 
  },
  { 
    code: '野村優質', 
    name: '野村優質基金-累積', 
    isin: 'TW000T0606A1', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Core', 
    desc: '專注於尋找盈餘成長趨勢向上且評價合理之公司，佈局具成長性之龍頭企業，追求長期穩健增值。', 
    perf: '+18.2%', 
    perf2y: '+38.4%', 
    perf3y: '+62.5%' 
  },
  { 
    code: '復華人生目標', 
    name: '復華人生目標基金', 
    isin: 'TW000T0707A0', 
    currency: 'TWD', 
    risk: 3, 
    type: 'Core', 
    desc: '採均衡配置策略，隨市場狀況調整股債比例，適合追求資產長期增值與風險管控並重的投資人。', 
    perf: '+12.8%', 
    perf2y: '+25.1%', 
    perf3y: '+38.8%' 
  },
  
  // 衛星配置 (Satellite) - 精選具備爆發力或主題性之標的
  { 
    code: '統一全台贏家', 
    name: '統一全台贏家基金', 
    isin: 'TW000T0808A9', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '靈活調配具備轉機與成長動能之標的，專注於挖掘具備產業領導地位之潛力股，追求超額回報。', 
    perf: '+28.4%', 
    perf2y: '+52.1%', 
    perf3y: '+88.5%' 
  },
  { 
    code: '摩根台灣金磚', 
    name: '摩根台灣金磚基金', 
    isin: 'TW000T0909A8', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '聚焦於具備「金磚」特質的台灣企業，特別是具備全球競爭優勢、高市佔率與創新能力之標的。', 
    perf: '+20.5%', 
    perf2y: '+35.4%', 
    perf3y: '+52.1%' 
  },
  { 
    code: '國泰小龍', 
    name: '國泰小龍基金', 
    isin: 'TW000T1010A7', 
    currency: 'TWD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '鎖定具備高成長潛力之中小型企業，透過深度的產業研究，捕捉企業成長爆發期的投資機會。', 
    perf: '+24.1%', 
    perf2y: '+42.8%', 
    perf3y: '+65.2%' 
  },
  { 
    code: '00891', 
    name: '中信關鍵半導體 ETF', 
    isin: 'TW0000089108', 
    currency: 'TWD', 
    risk: 5, 
    type: 'Satellite', 
    desc: '口袋投顧精選定期定額標的。聚焦台灣半導體產業龍頭，包含 IC 設計、製造與封測，掌握全球科技進步之核心動能。', 
    perf: '+32.5%', 
    perf2y: '+58.2%', 
    perf3y: '+91.4%' 
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
    { id: 15, text: "看到排隊名店，我也會想去排隊嚐鮮。", type: 'range' },
    { id: 16, text: "去熟悉的餐廳，我每次都點一樣的餐點。", type: 'range' },
    { id: 17, text: "買新手機時，我一定會加購意外險。", type: 'range' },
    { id: 18, text: "參加抽獎活動...我寧願選『100% 獲得小獎』。", type: 'range' },
    { id: 19, text: "比起賺獎金，我更喜歡底薪高一點。", type: 'range' },
  ],
  type4: [
    { id: 20, q: "比起搖錢樹長大，我更要每月掉金幣直接花。", type: 'bool' },
    { id: 21, q: "我不急著收成，寧願養分全回流...", type: 'bool' },
    { id: 22, q: "持有「銀河通用幣」讓我更有安全感。", type: 'bool' },
    { id: 23, q: "看到隔壁大豐收我不跟風。", type: 'bool' },
    { id: 24, q: "與其求穩，我更想賭一把未來的...", type: 'bool' },
    { id: 25, q: "交給機器人自動灌溉。", type: 'bool' },
    { id: 26, q: "這棵樹是留給下一代的傳家寶。", type: 'bool' },
    { id: 27, q: "追求金幣自由，是為了徹底退休...", type: 'bool' },
    { id: 28, q: "豐收的金幣是用來買火箭登陸土星...", type: 'bool' },
    { id: 29, q: "來到宇宙樹苗交易所...你會選哪棵?", type: 'choice', options: [
      { val: 1, text: "安心麵包樹 (保守)" },
      { val: 4, text: "全能混種樹 (平衡)" },
      { val: 7, text: "傑克魔豆樹 (積極)" }
    ]},
    { id: 30, q: "宇宙農業部開放三個星系...你想去哪裡？", type: 'choice', options: [
      { val: 1, text: "銀河聯盟 (保守)" },
      { val: 4, text: "家鄉基地 (平衡)" },
      { val: 7, text: "蠻荒新星 (積極)" }
    ]},
  ]
};
