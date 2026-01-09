
import { Fund, Question } from './types';

export const MOCK_FUNDS: Fund[] = [
  // 核心配置 (Core) - 精選穩定成長型標的
  { 
    code: 'C0109015', 
    name: 'PGIM Jennison美國成長基金A級別美元累積型', 
    isin: 'TW000T1212A5', 
    currency: 'USD', 
    risk: 4, 
    type: 'Core', 
    desc: '專注於具備強大獲利成長動能之美國大型企業，透過深入研究發掘具產業領導地位之標的，追求長期資本增值。', 
    perf: '+28.4%', 
    perf2y: '+52.1%', 
    perf3y: '+78.5%' 
  },
  { 
    code: 'C0115008', 
    name: '法盛盧米斯賽勒斯美國成長股票基金-R/A美元級別', 
    isin: 'TW000T0606A1', 
    currency: 'USD', 
    risk: 4, 
    type: 'Core', 
    desc: '聚焦於具備可持續競爭優勢之美國成長股，採集中持股策略，旨在捕捉企業長期價值成長之紅利。', 
    perf: '+22.2%', 
    perf2y: '+44.4%', 
    perf3y: '+65.5%' 
  },
  { 
    code: 'C0109004', 
    name: 'PGIM美國公司債基金T級別美元累積型', 
    isin: 'TW000T0707A0', 
    currency: 'USD', 
    risk: 3, 
    type: 'Core', 
    desc: '投資於美國投資等級公司債券，旨在市場波動中提供穩定的現金流與資本保全，是核心配置中的穩壓器。', 
    perf: '+8.8%', 
    perf2y: '+15.1%', 
    perf3y: '+22.8%' 
  },
  
  // 衛星配置 (Satellite) - 精選主題性與趨勢性標的
  { 
    code: 'C0115024', 
    name: '法盛AI及機器人基金-R/A美元級別', 
    isin: 'TW000T0808A9', 
    currency: 'USD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '鎖定全球人工智慧與機器人產業鏈，涵蓋硬體製造與軟體服務，精準捕捉未來科技革命之投資機會。', 
    perf: '+34.4%', 
    perf2y: '+62.1%', 
    perf3y: '+98.5%' 
  },
  { 
    code: 'C0115019', 
    name: '法盛訂閱經濟基金-R/A美元級別', 
    isin: 'TW000T0909A8', 
    currency: 'USD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '聚焦於商業模式轉型為訂閱制之企業，透過穩定的經常性收入來源，降低業績波動並追求穩定成長回報。', 
    perf: '+20.5%', 
    perf2y: '+38.4%', 
    perf3y: '+55.1%' 
  },
  { 
    code: 'C0115011', 
    name: '法盛智慧安保基金-R/A美元級別', 
    isin: 'TW000T1010A7', 
    currency: 'USD', 
    risk: 4, 
    type: 'Satellite', 
    desc: '投資於實體與數位安全相關領域，包含網路安全、電子支付與關鍵基礎建設防護，掌握數位化趨勢下的鋼性需求。', 
    perf: '+18.1%', 
    perf2y: '+32.8%', 
    perf3y: '+48.2%' 
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
    { id: 10, text: "一想到買手機，我就想到指定 brand。", type: 'range' },
  ],
  type3: [
    { id: 11, text: "我常在事後才發現，自己當下其實是情緒化決定。", type: 'range' },
    { id: 12, text: "如果沒有人提醒，我很容易忘記長期計畫。", type: 'range' },
    { id: 13, text: "比起錯過機會，我更怕做錯決定。", type: 'range' },
    { id: 14, text: "看到別人投資賺錢，我會重新檢討自己的配置。", type: 'range' },
    { id: 15, text: "看到排隊名店，我也會想去排隊嚐鮮。", type: 'range' },
    { id: 16, text: "去熟悉的餐廳，我每次都點一樣的餐點。", type: 'range' },
    { id: 17, text: "買新手機時，我一定會加購意外險。", type: 'range' },
    { id: 18, text: "參加抽獎活動，我寧願選『100% 獲得小獎』。", type: 'range' },
    { id: 19, text: "比起賺獎金，我更喜歡底薪高一點。", type: 'range' },
  ],
  type4: [
    { id: 20, q: "比起搖錢樹長大，我更要每月掉金幣直接花。", type: 'bool' },
    { id: 21, q: "我不急著收成，寧願養分全回流。", type: 'bool' },
    { id: 22, q: "持有「銀河通用幣」讓我更有安全感", type: 'bool' },
    { id: 23, q: "看到隔壁大豐收我不跟風", type: 'bool' },
    { id: 24, q: "與其求穩，我更想賭一把未來的。", type: 'bool' },
    { id: 25, q: "交給機器人自動灌溉", type: 'bool' },
    { id: 26, q: "這棵樹是留給下一代的傳家寶", type: 'bool' },
    { id: 27, q: "追求金幣自由，是為了徹底退休。", type: 'bool' },
    { id: 28, q: "豐收的金幣是用來買火箭登陸土星", type: 'bool' },
    { id: 29, q: "來到宇宙樹苗交易所，你會選哪棵？", type: 'choice', options: [
      { val: 1, text: "安心麵告樹 (保守)" },
      { val: 4, text: "全能混種樹 (平衡)" },
      { val: 7, text: "傑克魔豆樹 (積極)" }
    ]},
    { id: 30, q: "宇宙農業部開放三個星系，你想去哪裡？", type: 'choice', options: [
      { val: 1, text: "銀河聯盟 (保守)" },
      { val: 4, text: "家鄉基地 (平衡)" },
      { val: 7, text: "蠻荒新星 (積極)" }
    ]},
  ]
};
