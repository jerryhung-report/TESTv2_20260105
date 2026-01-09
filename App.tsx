import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingCart, Leaf, BrainCircuit, Check, TrendingUp, Sparkles, Phone, Mail,
  Plus, CheckCircle, ShieldCheck, ArrowRight, ArrowLeft, RefreshCcw, ExternalLink,
  Globe, Satellite, Rocket, Coins, TreePine, Star, Sparkle, LayoutGrid, Info
} from 'lucide-react';

// --- 1. 類型定義 (Types) ---

export type FundType = 'Core' | 'Satellite';

export interface Fund {
  code: string;
  name: string;
  isin: string;
  currency: string;
  risk: number;
  type: FundType;
  desc: string;
  perf: string;
  perf2y?: string;
  perf3y?: string;
}

export interface Question {
  id: number;
  text?: string;
  q?: string;
  type?: 'bool' | 'choice' | 'range';
  options?: { val: number; text: string }[];
}

export interface UserFormData {
  gender: string;
  age: string;
  phone: string;
  email: string;
}

export interface Persona {
  title: string;
  desc: string;
  riskLevel: number;
  image: string;
}

export type Step = 'intro' | 'form' | 'quiz' | 'results' | 'cart';

// --- 2. 常數數據 (Constants) ---

const MAX_SCORE = 210;
// 預設與備用圖片
const DEFAULT_DOG_IMG = 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/pocket-dog.png';

const PERSONAS: Persona[] = [
  { title: '口袋濟斯', desc: '馬爾濟斯型投資人資金規模不一定大，但對世界充滿好奇。他們偏好低門檻、可探索不同市場的基金配置，在控制風險的前提下，體驗投資帶來的視野擴張。', riskLevel: 1, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-maltese.png' },
  { title: '口袋西施', desc: '西施犬型投資人講究生活品質與節奏，不急著進出市場。穩健、管理風格一致的基金，讓資產在不被打擾的狀態下，優雅累積。', riskLevel: 2, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-shih-tzu.png' },
  { title: '口袋吉娃', desc: '吉娃娃型投資人情緒敏感、反應快速，容易受市場波動影響。透過分散配置與小額定期投入的基金策略，有助於在高壓情緒中維持投資穩定度.', riskLevel: 2, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-chihuahua.png' },
  { title: '口袋柴', desc: '柴犬型投資人個性獨立、自我，不輕易追逐市場風向，常以專注於長期邏輯的視角看待波動。這種傲嬌而固執的氣質，使他們偏好能經得起時間考驗的基金，而非短線熱門題材。', riskLevel: 3, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-shiba.png' },
  { title: '口袋貴賓', desc: '貴賓犬型投資人重視差異化與質感，不想與市場雷同。具有特色主題、選股邏輯清楚的基金，能滿足他們對獨特性的期待。', riskLevel: 3, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-poodle.png' },
  { title: '口袋拉拉', desc: '拉拉型投資人高度重視「有沒有產出」，對現金流與紀律特別敏感。能定期看到成果的配息型基金或穩定投入機制，最能讓他們安心守住投資節奏。', riskLevel: 4, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-labrador.png' },
  { title: '口袋土狗', desc: '台灣土狗型投資人擁有極強的環境適應力，不追求華麗報酬，而是能在各種市場條件下活得下來。分散、耐震、長期有效的基金配置，最符合他們的生存智慧。', riskLevel: 4, image: './口袋狗.png' },
  { title: '口袋邊牧', desc: '牧羊犬型投資人理性且高度系統化，相信規則勝過情緒。具備明確策略、可自動執行的基金投資方式，正好符合他們追求最佳化的思維。', riskLevel: 5, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-shepherd.png' },
  { title: '口袋阿金', desc: '阿金型投資人性格溫暖、陽光，理財目的不是擊敗市場，而是讓生活更安心。他們親近長期投資、穩健累積的策略，就像釀酒一樣，時間越久，收穫越醇。', riskLevel: 5, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-golden.png' },
  { title: '口袋獒', desc: '藏獒型投資人重視責任與守護，對風險高度警覺。核心配置、穩定性高的基金，是他們為資產築起防線的首選，寧可慢，也不能失守。', riskLevel: 6, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-mastiff.png' }
];

const MOCK_FUNDS: Fund[] = [
  { code: 'C0109015', name: 'PGIM Jennison美國成長基金A級別美元累積型', isin: 'TW000T1212A5', currency: 'USD', risk: 4, type: 'Core', desc: '聚焦美國大型成長企業，追求資本長期增值的極大化。', perf: '+28.4%', perf2y: '+58.2%', perf3y: '+91.4%' },
  { code: '98639616', name: 'PGIM保德信美國投資級企業債券基金-新臺幣累積型', isin: 'TW00000001', currency: 'TWD', risk: 2, type: 'Core', desc: '主要投資於美國投資級債券，追求穩定的資產增值。', perf: '+8.2%', perf2y: '+14.5%', perf3y: '+18.1%' },
  { code: '98637171', name: '野村亞太複合非投資等級債券基金-累積型新臺幣計價', isin: 'TW00000002', currency: 'TWD', risk: 3, type: 'Core', desc: '平衡亞太區投資等級與非投資等級債券，優化收益空間。', perf: '+9.5%', perf2y: '+18.2%', perf3y: '+22.5%' },
  { code: '98637337', name: 'PGIM保德信新興市場企業債券基金-新臺幣累積型', isin: 'TW00000003', currency: 'TWD', risk: 3, type: 'Core', desc: '鎖定新興市場優質企業債券，獲取較高的債息回報。', perf: '+10.1%', perf2y: '+19.4%', perf3y: '+24.8%' },
  { code: '98636594', name: '野村全球高股息基金累積型新臺幣計價', isin: 'TW00000004', currency: 'TWD', risk: 4, type: 'Core', desc: '精選全球具備高股息發放能力之龍頭企業，平衡成長與收息。', perf: '+12.5%', perf2y: '+24.1%', perf3y: '+38.2%' },
  { code: '98636798', name: '野村亞太高股息基金累積型新臺幣計價', isin: 'TW00000005', currency: 'TWD', risk: 4, type: 'Core', desc: '聚焦亞太區優質高息股，捕捉區域成長與配息動能。', perf: '+14.2%', perf2y: '+28.5%', perf3y: '+42.1%' },
  { code: '98638825', name: '統一大東協高股息基金(新台幣)', isin: 'TW00000006', currency: 'TWD', risk: 4, type: 'Core', desc: '深耕東協市場，鎖定當地高成長潛力之高息標的項目。', perf: '+16.8%', perf2y: '+32.4%', perf3y: '+48.5%' },
  { code: '98637910', name: 'PGIM保德信中國好時平衡基金-新臺幣累積型', isin: 'TW00000007', currency: 'TWD', risk: 4, type: 'Core', desc: '透過股債平衡配置，降低中國市場波動並追求長期增值。', perf: '+11.5%', perf2y: '+15.2%', perf3y: '+20.1%' },
  { code: '98638198', name: '中國信託樂齡收益平衡基金-美元A', isin: 'TW00000008', currency: 'USD', risk: 4, type: 'Core', desc: '鎖定全球高齡化社會商機，採多重資產配置追求收益。', perf: '+9.2%', perf2y: '+16.1%', perf3y: '+22.4%' },
  { code: '98638199', name: '中國信託樂齡收益平衡基金-美元B', isin: 'TW00000009', currency: 'USD', risk: 4, type: 'Core', desc: '鎖定全球高齡化社會商機，採多重資產配置追求收益。', perf: '+9.1%', perf2y: '+15.9%', perf3y: '+21.8%' },
  { code: 'C0115008', name: '法盛盧米斯賽勒斯美國成長股票基金-R/A美元級別', isin: 'TW000T0606A1', currency: 'USD', risk: 4, type: 'Core', desc: '由美國投資大師領軍，挖掘具長期競爭力之價值股。', perf: '+22.2%', perf2y: '+45.8%', perf3y: '+72.1%' },
  { code: 'C0115009', name: '法盛盧米斯賽勒斯美國成長股票基金-RET/A美元級別', isin: 'TW000T0606A2', currency: 'USD', risk: 4, type: 'Core', desc: '聚焦美國大型成長企業。', perf: '+22.1%', perf2y: '+45.5%', perf3y: '+71.8%' },
  { code: '98638396', name: '野村亞太新興債券基金-累積類型新臺幣計價', isin: 'TW00000010', currency: 'TWD', risk: 3, type: 'Core', desc: '投資於亞太新興市場債券，平衡收益與風險。', perf: '+10.5%', perf2y: '+18.8%', perf3y: '+25.2%' },
  { code: '98639960', name: '台新新興短期非投資等級債券基金(累積型)-新臺幣', isin: 'TW00000011', currency: 'TWD', risk: 4, type: 'Core', desc: '側重短期存續期間標的，降低利率波動影響。', perf: '+11.2%', perf2y: '+20.5%', perf3y: '+28.9%' },
  { code: '73998065', name: 'PGIM保德信大中華基金-新台幣', isin: 'TW00000012', currency: 'TWD', risk: 5, type: 'Core', desc: '鎖定兩岸三地最具動能之優質企業，追求超額回報。', perf: '+19.5%', perf2y: '+38.4%', perf3y: '+52.1%' },
  { code: '98637078', name: '統一大中華中小基金(新台幣)', isin: 'TW00000013', currency: 'TWD', risk: 5, type: 'Core', desc: '聚焦大中華區中小型成長股，爆發力強。', perf: '+21.2%', perf2y: '+42.5%', perf3y: '+60.8%' },
  { code: '98636611', name: 'PGIM保德信全球中小基金-新臺幣', isin: 'TW00000014', currency: 'TWD', risk: 4, type: 'Core', desc: '透過全球化分散佈局中小型企業，分散單一市場風險。', perf: '+17.8%', perf2y: '+32.1%', perf3y: '+48.5%' },
  { code: '98638042', name: '野村全球短期收益基金-新臺幣計價', isin: 'TW00001001', currency: 'TWD', risk: 2, type: 'Satellite', desc: '以短期資產配置為主，維持良好流動性與穩健回報。', perf: '+5.5%', perf2y: '+10.2%', perf3y: '+14.5%' },
  { code: '98638121', name: 'PGIM保德信多元收益組合基金-新台幣累積型', isin: 'TW00001002', currency: 'TWD', risk: 3, type: 'Satellite', desc: '採多重資產組合策略，靈活調整以應對市場波動。', perf: '+6.8%', perf2y: '+12.5%', perf3y: '+18.2%' },
  { code: '98638125', name: '野村多元收益多重資產基金-累積類型新臺幣計價', isin: 'TW00001003', currency: 'TWD', risk: 3, type: 'Satellite', desc: '涵蓋股債與另類資產，提供多元化收益來源。', perf: '+7.2%', perf2y: '+13.8%', perf3y: '+19.5%' },
  { code: '98637745', name: '野村全球高股息基金-累積類型人民幣計價', isin: 'TW00001004', currency: 'CNY', risk: 4, type: 'Satellite', desc: '精選全球具備高股息發放能力之企業。', perf: '+12.1%', perf2y: '+22.5%', perf3y: '+34.8%' },
  { code: '98637933', name: '野村亞太高股息基金-累積型人民幣計價', isin: 'TW00001005', currency: 'CNY', risk: 4, type: 'Satellite', desc: '聚焦亞太區優質高息股。', perf: '+13.8%', perf2y: '+25.2%', perf3y: '+38.5%' },
  { code: '98636728', name: '野村台灣高股息基金-累積類型', isin: 'TW00001006', currency: 'TWD', risk: 4, type: 'Satellite', desc: '鎖定台股優質高息企業，參與台股除息旺季與長期成長。', perf: '+18.5%', perf2y: '+35.2%', perf3y: '+52.1%' },
  { code: '98638350', name: 'PGIM保德信策略成長ETF組合基金-新台幣', isin: 'TW00001007', currency: 'TWD', risk: 4, type: 'Satellite', desc: '透過策略型ETF佈局全球，追求長期超額成長空間。', perf: '+15.4%', perf2y: '+30.2%', perf3y: '+45.8%' },
  { code: '98640652', name: '台新ESG環保愛地球成長基金-新臺幣', isin: 'TW00001008', currency: 'TWD', risk: 4, type: 'Satellite', desc: '鎖定符合ESG與環保趨勢之優質成長股，參與永續紅利。', perf: '+20.1%', perf2y: '+41.2%', perf3y: '+62.5%' },
  { code: '98640759', name: '野村全球正向效應成長基金-累積類型新臺幣', isin: 'TW00001009', currency: 'TWD', risk: 4, type: 'Satellite', desc: '投資於對社會與環境具備正向效應之企業，結合報酬與影響力。', perf: '+19.2%', perf2y: '+38.5%', perf3y: '+58.1%' },
  { code: '98636754', name: '野村全球不動產證券化基金累積型新臺幣計價', isin: 'TW00001010', currency: 'TWD', risk: 4, type: 'Satellite', desc: '鎖定全球REITs標的，獲取租金收益與資產增值機會。', perf: '+11.8%', perf2y: '+20.5%', perf3y: '+28.2%' },
  { code: 'C0109018', name: 'PGIM全球精選不動產證券基金A美元累積型', isin: 'TW000T0101A0', currency: 'USD', risk: 4, type: 'Satellite', desc: '鎖定全球REITs標的。', perf: '+11.5%', perf2y: '+19.8%', perf3y: '+27.5%' },
  { code: '98637741', name: '野村全球不動產證券化基金-累積類型人民幣計價', isin: 'TW00001011', currency: 'CNY', risk: 4, type: 'Satellite', desc: '鎖定全球REITs標的。', perf: '+11.2%', perf2y: '+19.2%', perf3y: '+26.8%' },
  { code: '00772B', name: '中信高評級公司債', isin: 'TW00000772B', currency: 'TWD', risk: 2, type: 'Satellite', desc: '追求彭博10年期以上高評級美元公司債指數之收益。', perf: '+4.5%', perf2y: '+8.2%', perf3y: '+11.5%' },
  { code: '0056', name: '元大高股息', isin: 'TW000005600', currency: 'TWD', risk: 4, type: 'Satellite', desc: '台股高股息經典指標，鎖定預測殖利率最高之企業。', perf: '+15.2%', perf2y: '+32.4%', perf3y: '+48.5%' },
  { code: '006208', name: '富邦台50', isin: 'TW000006208', currency: 'TWD', risk: 4, type: 'Satellite', desc: '貼近台股市值前50大企業表現，成本低廉。', perf: '+22.5%', perf2y: '+48.2%', perf3y: '+72.5%' },
  { code: '0050', name: '元大台灣50', isin: 'TW000005000', currency: 'TWD', risk: 4, type: 'Satellite', desc: '台灣市值最大50家上市企業縮影。', perf: '+22.4%', perf2y: '+48.1%', perf3y: '+72.2%' },
  { code: '00646', name: '元大S&P500', isin: 'TW000006460', currency: 'TWD', risk: 4, type: 'Satellite', desc: '追蹤美股標普500指數，掌握全球最強企業動能。', perf: '+25.2%', perf2y: '+52.5%', perf3y: '+80.1%' },
  { code: '00662', name: '富邦NASDAQ', isin: 'TW000006620', currency: 'TWD', risk: 4, type: 'Satellite', desc: '鎖定那斯達克100大科技股，追求超額報酬首選。', perf: '+32.1%', perf2y: '+68.5%', perf3y: '+105.2%' },
  { code: '006203', name: '元大MSCI台灣', isin: 'TW000006203', currency: 'TWD', risk: 4, type: 'Satellite', desc: '追蹤MSCI台灣指數，受外資青睞之配置標的。', perf: '+21.5%', perf2y: '+45.8%', perf3y: '+68.2%' },
  { code: '0052', name: '富邦科技', isin: 'TW000005200', currency: 'TWD', risk: 4, type: 'Satellite', desc: '聚焦台股電子權值股，掌握台灣科技產業核心優勢。', perf: '+28.5%', perf2y: '+62.1%', perf3y: '+95.4%' },
  { code: '00692', name: '富邦公司治理', isin: 'TW000006920', currency: 'TWD', risk: 4, type: 'Satellite', desc: '選取符合公司治理指標之優質台股企業。', perf: '+20.2%', perf2y: '+42.1%', perf3y: '+65.5%' },
  { code: '00663L', name: '國泰臺灣加權正2', isin: 'TW00000663L', currency: 'TWD', risk: 5, type: 'Satellite', desc: '台股加權指數單日兩倍回報，適合積極波段操作。', perf: '+45.2%', perf2y: '+98.5%', perf3y: '+152.1%' }
];

const QUESTIONS_DATA: Record<string, Question[]> = {
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
    { id: 13, text: "我寧可少賺一點，也不想賠錢做錯決定。", type: 'range' },
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
    { id: 23, q: "豐收的金幣是用來買火箭，而非存在銀行。", type: 'bool' },
    { id: 24, q: "我喜歡多摘果實落袋，不怕搖錢樹傷了根基。", type: 'bool' },
    { id: 25, q: "看到隔壁大豐收，我不跟風。", type: 'bool' },
    { id: 26, q: "與其求穩，我更想賭一把未來的。", type: 'bool' },
    { id: 27, q: "我放心交給機器人自動灌溉。", type: 'bool' },
    { id: 28, q: "我不急著收成，裝潢全回流。", type: 'bool' },
    { id: 29, q: "我想在最短時間內，追求金幣自由。", type: 'bool' },
    { id: 30, q: "這棵樹是留給下一代的傳家寶。", type: 'bool' },
  ]
};

const RECOMMENDATION_MAP: Record<string, { core: string[], sat: string[], etf: string }> = {
  '口袋濟斯': { core: ['C0109015', '98639616', '98637171'], sat: ['98638042', '98638121', '98638125'], etf: '00772B' },
  '口袋西施': { core: ['98636594', '98636798', '98638825'], sat: ['98637745', '98637933', '98636728'], etf: '0056' },
  '口袋吉娃': { core: ['98636594', '98636798', '98638825'], sat: ['98638042', '98638121', '98638125'], etf: '006208' },
  '口袋柴': { core: ['98637910', '98638198', '98638199'], sat: ['98638350', '98640652', '98640759'], etf: '0050' },
  '口袋貴賓': { core: ['C0109015', 'C0115008', 'C0115009'], sat: ['73998065', '98637078', '98636754'], etf: '00646' },
  '口袋拉拉': { core: ['C0109015', 'C0115008', 'C0115009'], sat: ['98636594', '98636798', '98638825'], etf: '00662' },
  '口袋土狗': { core: ['98637337', '98638396', '98639960'], sat: ['98638825', '98636594', '98636798'], etf: '006203' },
  '口袋邊牧': { core: ['C0109015', 'C0115008', 'C0115009'], sat: ['98636754', 'C0109018', '98637741'], etf: '0052' },
  '口袋阿金': { core: ['C0109015', 'C0115008', 'C0115009'], sat: ['73998065', '98637078', '98636754'], etf: '00692' },
  '口袋獒': { core: ['73998065', '98637078', '98636611'], sat: ['98637337', '98638396', '98639960'], etf: '00663L' }
};

// --- 4. UI 樣式與小組件 ---

const BTN_BASE = "inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 active:scale-[0.98] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl";
const BTN_PRIMARY = `${BTN_BASE} bg-red-900 text-white hover:bg-red-800 shadow-lg shadow-red-900/10`;
const BTN_DARK = `${BTN_BASE} bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20`;

const ProgressBar = ({ current, total }: { current: number, total: number }) => (
  <div className="flex flex-col items-center gap-3 w-full max-w-lg mx-auto mb-10">
    <div className="flex justify-between w-full px-1 text-[11px] font-black text-slate-400 uppercase tracking-widest">
      <span>分析進度</span>
      <span>{Math.round((current / total) * 100)}%</span>
    </div>
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full bg-red-900 transition-all duration-500 ease-out" style={{ width: `${(current / total) * 100}%` }} />
    </div>
  </div>
);

const PerformanceMetric = ({ label, val }: { label: string, val: string | undefined }) => (
  <div className="flex flex-col items-start gap-1 p-2 sm:p-5 bg-[#F8FAFC] rounded-2xl border border-slate-100 flex-1 min-w-0">
    <span className="text-slate-400 text-[9px] sm:text-xs font-bold leading-none mb-1 whitespace-nowrap">{label}</span>
    <span className="font-extrabold text-[12px] sm:text-lg text-[#B91C1C] truncate">{val || '--'}</span>
  </div>
);

const FundCard: React.FC<{ fund: Fund; isSelected: boolean; onToggle: (code: string) => void; externalLink?: string; isSelectable?: boolean; }> = ({ fund, isSelected, onToggle, externalLink, isSelectable = true }) => {
  const handleClick = () => externalLink ? window.open(externalLink, '_blank') : isSelectable && onToggle(fund.code);
  return (
    <div className={`group relative bg-white border rounded-[2.5rem] p-8 sm:p-10 transition-all duration-300 hover:shadow-xl cursor-pointer w-full ${isSelected ? 'border-red-900 ring-1 ring-red-900/10' : 'border-slate-100 shadow-sm'}`} onClick={handleClick}>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8 items-start">
          <div className={`shrink-0 h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-red-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-red-50 group-hover:text-red-900'}`}>
            {externalLink ? <ExternalLink size={24} /> : isSelected ? <Check size={28} strokeWidth={3} /> : <Plus size={28} strokeWidth={3} />}
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[12px] font-black px-3 py-1 bg-[#1E293B] text-white rounded-md tracking-wider uppercase">{fund.code}</span>
              <span className="text-[12px] font-bold px-3 py-1 border border-slate-200 text-slate-500 rounded-md bg-white">{fund.currency}</span>
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1">風險 RR{fund.risk}</span>
            </div>
            <h4 className="font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight group-hover:text-red-900 transition-colors">{fund.name}</h4>
            <p className="text-base text-slate-500 leading-relaxed font-medium max-w-4xl">{fund.desc}</p>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <PerformanceMetric label="一年績效" val={fund.perf} />
            <PerformanceMetric label="兩年績效" val={fund.perf2y} />
            <PerformanceMetric label="三年績效" val={fund.perf3y} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 5. 頁面視圖 (Page Views) ---

const Intro = ({ onStart }: { onStart: () => void }) => (
  <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 bg-white">
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none">
      <Coins size={150} className="absolute top-[10%] left-[5%] rotate-12" />
      <Rocket size={180} className="absolute bottom-[10%] right-[5%] -rotate-12" />
    </div>
    
    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12 animate-fadeIn">
      <div className="inline-flex items-center gap-2 px-5 py-2 bg-red-50 text-red-900 rounded-full">
        <BrainCircuit size={14} />
        <span className="text-[11px] font-black tracking-[0.2em] uppercase">口袋投資風格分析</span>
      </div>
      
      <div className="space-y-10">
        <h1 className="font-black text-slate-900 leading-[1.2] text-5xl sm:text-7xl tracking-tight">
          準備好探索你的<br/>
          <span className="text-red-900">基金人格</span>
          了嗎？
        </h1>
        <div className="space-y-4">
            <p className="text-slate-400 font-medium text-xl sm:text-3xl max-w-4xl mx-auto leading-relaxed">
              30題測驗，完成後即可立刻獲得你的
            </p>
            <p className="text-slate-400 font-medium text-xl sm:text-3xl max-w-4xl mx-auto leading-relaxed">
              投資風格定位分析報告 與 基金推薦！
            </p>
        </div>
      </div>

      <button onClick={onStart} className="bg-[#0F172A] text-white px-20 py-7 text-2xl font-black rounded-full shadow-2xl hover:bg-slate-800 transition-all group flex items-center gap-4 mx-auto mt-16">
        啟動分析 <Sparkles size={28} className="text-yellow-400 animate-pulse" />
      </button>
    </div>
  </div>
);

const InfoForm = ({ data, onChange, onNext }: { data: UserFormData; onChange: (d: UserFormData) => void; onNext: () => void }) => {
  const isFormValid = data.gender && data.age && data.phone && data.email;
  const activeClass = "bg-[#811919] text-white shadow-xl";
  const inactiveClass = "bg-[#F8FAFC] text-[#94A3B8] hover:bg-slate-50";

  return (
    <div className="max-w-xl mx-auto py-12 px-6 animate-fadeIn">
      <div className="bg-white rounded-[3.5rem] p-10 sm:p-14 shadow-2xl shadow-slate-200 border border-slate-50 space-y-12">
        <div className="space-y-10">
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-400 px-1">性別</label>
            <div className="flex gap-4">
              {['男', '女'].map(opt => (
                <button 
                  key={opt} 
                  onClick={() => onChange({ ...data, gender: opt })} 
                  className={`flex-1 py-5 rounded-2xl font-black text-lg transition-all duration-300 ${data.gender === opt ? activeClass : inactiveClass}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-400 px-1">年齡層</label>
            <div className="grid grid-cols-3 gap-4">
              {['18-30歲', '31-40歲', '41-50歲'].map(opt => (
                <button 
                  key={opt} 
                  onClick={() => onChange({ ...data, age: opt })} 
                  className={`py-5 rounded-2xl font-black text-sm transition-all duration-300 ${data.age === opt ? activeClass : inactiveClass}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {['51-60歲', '61歲以上'].map(opt => (
                <button 
                  key={opt} 
                  onClick={() => onChange({ ...data, age: opt })} 
                  className={`py-5 rounded-2xl font-black text-sm transition-all duration-300 ${data.age === opt ? activeClass : inactiveClass}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          <div className="space-y-5">
            <div className="relative group">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#811919] transition-colors" size={20} />
              <input 
                type="tel" 
                className="w-full pl-16 pr-8 py-5 bg-[#F8FAFC] rounded-3xl font-bold text-slate-600 outline-none border-2 border-transparent focus:border-slate-100 transition-all placeholder:text-slate-300" 
                value={data.phone} 
                onChange={e => onChange({ ...data, phone: e.target.value })} 
                placeholder="手機號碼" 
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#811919] transition-colors" size={20} />
              <input 
                type="email" 
                className="w-full pl-16 pr-8 py-5 bg-[#F8FAFC] rounded-3xl font-bold text-slate-600 outline-none border-2 border-transparent focus:border-slate-100 transition-all placeholder:text-slate-300" 
                value={data.email} 
                onChange={e => onChange({ ...data, email: e.target.value })} 
                placeholder="電子郵件" 
              />
            </div>
          </div>
        </div>

        <button 
          onClick={onNext} 
          disabled={!isFormValid} 
          className={`w-full py-6 rounded-[2rem] text-xl font-bold flex items-center justify-center gap-3 transition-all duration-500 shadow-lg ${isFormValid ? 'bg-[#811919] text-white hover:bg-[#6b1414] shadow-[#811919]/20' : 'bg-[#F8FAFC] text-slate-300'}`}
        >
          進入測驗階段 <ArrowRight size={24} className={isFormValid ? "animate-pulse" : ""} />
        </button>
      </div>
    </div>
  );
};

const Quiz = ({ onComplete }: { onComplete: (ans: Record<number, number>) => void }) => {
  const allQs = useMemo(() => [...QUESTIONS_DATA.type2, ...QUESTIONS_DATA.type3, ...QUESTIONS_DATA.type4], []);
  const [idx, setIdx] = useState(0);
  const [ans, setAns] = useState<Record<number, number>>({});
  const [showTransition, setShowTransition] = useState(false);
  const currQ = allQs[idx];

  const handleSelect = (v: number) => {
    const nextAns = { ...ans, [currQ.id]: v };
    setAns(nextAns);
    if (idx === 18) {
      setShowTransition(true);
    } else if (idx < allQs.length - 1) {
      setIdx(idx + 1);
    } else {
      onComplete(nextAns);
    }
  };

  const handleNext = () => {
    if (idx === 18) {
      setShowTransition(true);
    } else if (idx < allQs.length - 1) {
      setIdx(idx + 1);
    } else {
      onComplete(ans);
    }
  };

  if (showTransition) return (
    <div className="max-w-3xl mx-auto py-24 px-6 animate-fadeIn">
      <div className="bg-slate-900 text-white rounded-[3rem] p-14 sm:p-20 shadow-2xl text-center space-y-10 border border-white/5">
        <Rocket size={70} className="mx-auto text-red-500 animate-bounce" />
        <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">太棒了！你已經完成一半</h2>
            <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">現在要前往宇宙種樹囉~</p>
        </div>
        <button onClick={() => { setShowTransition(false); setIdx(idx + 1); }} className={`${BTN_PRIMARY} px-14 py-5 text-xl w-full sm:w-auto`}>開始種樹 <ArrowRight size={24} /></button>
      </div>
    </div>
  );

  const hasAnswer = ans[currQ.id] !== undefined;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 animate-fadeIn">
      <ProgressBar current={idx + 1} total={allQs.length} />
      
      <div className="bg-white border border-slate-100 rounded-[3rem] p-10 sm:p-14 shadow-2xl shadow-slate-200 text-center space-y-12 min-h-[450px] flex flex-col justify-center">
        <div className="space-y-4">
            <span className="text-[11px] font-black text-red-900 tracking-widest bg-red-50 px-5 py-2 rounded-full uppercase inline-block">第 {idx + 1} 題</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-[1.3]">{currQ.text || currQ.q}</h3>
        </div>

        <div className="space-y-4 pt-4">
          {currQ.type === 'range' && (
            <div className="space-y-8">
              <div className="flex justify-between gap-1 sm:gap-3">
                {[1, 2, 3, 4, 5, 6, 7].map(v => (
                  <button 
                    key={v} 
                    onClick={() => handleSelect(v)} 
                    className={`flex-1 aspect-square sm:h-14 sm:w-14 rounded-2xl font-black text-sm sm:text-lg transition-all ${
                      ans[currQ.id] === v 
                        ? 'bg-red-900 text-white shadow-xl' 
                        : 'bg-slate-50 text-slate-400 hover:bg-red-900 hover:text-white'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[11px] font-black text-slate-400 px-1 uppercase tracking-widest">
                <span>非常不認同</span>
                <span>非常認同</span>
              </div>
            </div>
          )}
          
          {(currQ.type === 'bool' || currQ.type === 'choice') && (
            <div className="flex flex-col gap-4">
              {currQ.type === 'bool' ? (
                <>
                  <button 
                    onClick={() => handleSelect(7)} 
                    className={`w-full py-5 px-8 rounded-2xl font-bold text-lg text-left flex justify-between items-center group transition-all duration-300 ${ans[currQ.id] === 7 ? 'bg-red-900 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-red-900 hover:text-white'}`}
                  >
                    是 <ArrowRight size={20} className={ans[currQ.id] === 7 ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"} />
                  </button>
                  <button 
                    onClick={() => handleSelect(1)} 
                    className={`w-full py-5 px-8 rounded-2xl font-bold text-lg text-left flex justify-between items-center group transition-all duration-300 ${ans[currQ.id] === 1 ? 'bg-red-900 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-red-900 hover:text-white'}`}
                  >
                    否 <ArrowRight size={20} className={ans[currQ.id] === 1 ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"} />
                  </button>
                </>
              ) : (
                currQ.options?.map(o => (
                  <button 
                    key={o.val} 
                    onClick={() => handleSelect(o.val)} 
                    className={`w-full py-5 px-8 rounded-2xl font-bold text-lg text-left flex justify-between items-center group transition-all duration-300 ${ans[currQ.id] === o.val ? 'bg-red-900 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-red-900 hover:text-white'}`}
                  >
                    {o.text} <ArrowRight size={20} className={ans[currQ.id] === o.val ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"} />
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between px-2">
        <button 
          onClick={() => idx > 0 && setIdx(idx - 1)} 
          disabled={idx === 0} 
          className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 disabled:opacity-0 transition-all uppercase text-[11px] tracking-[0.2em]"
        >
            <ArrowLeft size={16} /> 回上一題
        </button>

        {hasAnswer && idx < allQs.length - 1 && (
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 text-red-900 font-bold hover:text-red-800 transition-all uppercase text-[11px] tracking-[0.2em]"
          >
              下一題 <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

const Results = ({ persona, onContinue }: { persona: Persona; onContinue: () => void }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-fadeIn space-y-12">
      <div className="bg-slate-900 text-white rounded-[3rem] sm:rounded-[4rem] p-10 sm:p-20 relative overflow-hidden shadow-2xl border border-white/5">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="space-y-10 flex-1 text-center md:text-left">
            <div className="space-y-4">
              <span className="text-sm font-black text-red-500 tracking-[0.4em] uppercase border-b-2 border-red-900/50 pb-2 inline-block">投資風格分析報告</span>
              <h2 className="font-black tracking-tighter leading-none text-5xl sm:text-7xl">{persona.title}</h2>
            </div>
            <p className="text-lg sm:text-2xl text-slate-300 leading-relaxed font-medium">{persona.desc}</p>
          </div>
          <div className="w-full max-w-[350px] aspect-square flex items-center justify-center relative bg-slate-800/50 rounded-[3rem] border border-white/5 shadow-inner">
             <img 
              src={persona.image} 
              alt={persona.title} 
              onError={(e) => { e.currentTarget.src = DEFAULT_DOG_IMG; }}
              className="w-[85%] h-[85%] object-contain animate-float" 
            />
          </div>
        </div>
      </div>
      <button onClick={onContinue} className={`${BTN_PRIMARY} w-full py-6 text-xl shadow-2xl`}>查看個人化推薦配置 <ArrowRight size={28} /></button>
      <style>{` @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } } .animate-float { animation: float 5s ease-in-out infinite; } `}</style>
    </div>
  );
};

const CartView = ({ persona, selected, onToggle, onReset }: { persona: Persona; selected: string[]; onToggle: (c: string) => void; onReset: () => void }) => {
  const recs = RECOMMENDATION_MAP[persona.title] || { core: [], sat: [], etf: '' };
  const coreFunds = MOCK_FUNDS.filter(f => recs.core.includes(f.code));
  const satelliteFunds = [...MOCK_FUNDS.filter(f => recs.sat.includes(f.code)), ...MOCK_FUNDS.filter(f => f.code === recs.etf)];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-fadeIn space-y-20 pb-64 sm:pb-48">
      <div className="text-center space-y-12">
        <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">專屬投資口袋推薦</h2>
        <div className="flex flex-col items-center gap-10">
            <p className="text-slate-500 font-medium text-xl sm:text-3xl">
                針對 <span className="text-red-900 font-black">{persona.title}</span> 性格，我們精選以下標的。
            </p>
            <span className="text-[12px] text-slate-400 font-black uppercase tracking-[0.2em] bg-slate-100/50 px-6 py-2.5 rounded-full border border-slate-100 shadow-sm">績效截止日：2024/12/31</span>
        </div>
      </div>

      <div className="space-y-24">
        <div className="space-y-8">
          <div className="flex items-center gap-4 px-2 border-b border-slate-200 pb-4">
            <Globe size={32} className="text-red-900" />
            <h3 className="text-3xl font-black text-slate-900">核心配置</h3>
          </div>
          <div className="flex flex-col gap-8">
            {coreFunds.map(f => (<FundCard key={f.code} fund={f} isSelected={selected.includes(f.code)} onToggle={onToggle} />))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4 px-2 border-b border-slate-200 pb-4">
            <Satellite size={32} className="text-slate-900" />
            <h3 className="text-3xl font-black text-slate-900">衛星配置</h3>
          </div>
          <div className="flex flex-col gap-8">
            {satelliteFunds.map(f => (<FundCard key={f.code} fund={f} isSelected={selected.includes(f.code)} onToggle={onToggle} externalLink={f.code === recs.etf ? "https://www.pocket.tw/" : undefined} isSelectable={f.code !== recs.etf} />))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 px-4">
        <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl text-white py-3 sm:py-6 px-5 sm:px-8 rounded-[2rem] sm:rounded-[3rem] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-8 border border-white/10">
          <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto">
            <div className="relative p-2.5 sm:p-4 bg-red-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <ShoppingCart size={20} className="text-red-500 sm:w-7 sm:h-7" />
                <span className="absolute -top-1 -right-1 bg-red-600 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black">{selected.length}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-black leading-none">{selected.length} 檔基金</span>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 w-full">
            <button onClick={onReset} className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] sm:text-sm flex-1 flex items-center justify-center gap-2 transition-colors">
                <RefreshCcw size={14} className="sm:w-4 sm:h-4" /> 重新分析
            </button>
            <button onClick={() => window.open('https://my.cmoneyfund.com.tw/', '_blank')} className="px-6 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black bg-red-900 text-white hover:bg-red-800 text-[11px] sm:text-sm flex-[1.5] flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 transition-all">
                立即申購 <ArrowRight size={14} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 6. 主程式 (Main App) ---

const App = () => {
  const [step, setStep] = useState<Step>('intro');
  const [formData, setFormData] = useState<UserFormData>({ gender: '', age: '', phone: '', email: '' });
  const [persona, setPersona] = useState<Persona>(PERSONAS[0]);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const handleQuizComplete = async (answers: Record<number, number>) => {
    let s = 0; Object.values(answers).forEach(v => s += v);
    const personaIndex = Math.min(Math.floor((s / MAX_SCORE) * 10), 9);
    const p = PERSONAS[personaIndex];
    setScore(s);
    setPersona(p);
    setSelected([]);
    setStep('results');
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setStep('intro')}>
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all shadow-lg">
                <Leaf size={20} />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter italic uppercase">口袋<span className="text-red-900">投資分析</span></span>
          </div>
        </div>
      </nav>
      
      <main>
        {step === 'intro' && <Intro onStart={() => setStep('form')} />}
        {step === 'form' && <InfoForm data={formData} onChange={setFormData} onNext={() => setStep('quiz')} />}
        {step === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
        {step === 'results' && <Results persona={persona} onContinue={() => setStep('cart')} />}
        {step === 'cart' && <CartView persona={persona} selected={selected} onToggle={c => setSelected(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])} onReset={() => {
          setSelected([]);
          setStep('quiz');
        }} />}
      </main>

      <footer className="py-12 px-6 text-center border-t border-slate-100 bg-white">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 口袋投資分析版權所有。投資一定有風險，基金投資有賺有賠，申購前應詳閱公開說明書。</p>
      </footer>
    </div>
  );
};

export default App;