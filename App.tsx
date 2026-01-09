import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ShoppingCart, Leaf, BrainCircuit, Check, TrendingUp, Sparkles, Phone, Mail,
  Plus, CheckCircle, ShieldCheck, ArrowRight, ArrowLeft, RefreshCcw, ExternalLink,
  Globe, Satellite, Rocket, Coins, TreePine, Star, Sparkle, ThumbsUp
} from 'lucide-react';
import { MOCK_FUNDS, QUESTIONS } from './constants';
import { Fund, UserFormData, Persona, Question } from './types';

// --- 常數設定 ---

/**
 * 重新排列 PERSONAS 陣列，對應 R1 ~ R6 風險等級順序
 * 這樣測驗分數 (0-210) 會由低到高合理對應到各人格。
 */
const PERSONAS: Persona[] = [
  { title: '口袋濟斯', desc: '馬爾濟斯型投資人資金規模不一定大，但對世界充滿好奇。他們偏好低門檻、可探索不同市場的基金配置，在控制風險的前提下，體驗投資帶來的視野擴張。', riskLevel: 1, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-maltese.png' },
  { title: '口袋西施', desc: '西施犬型投資人講究生活品質與節奏，不急著進出市場。穩健、管理風格一致的基金，讓資產在不被打擾的狀態下，優雅累積。', riskLevel: 2, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-shih-tzu.png' },
  { title: '口袋吉娃', desc: '吉娃娃型投資人情緒敏感、反應快速，容易受市場波動影響。透過分散配置與小額定期投入的基金策略，有助於在高壓情緒中維持投資穩定度。', riskLevel: 2, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-chihuahua.png' },
  { title: '口袋柴', desc: '柴犬型投資人個性獨立、自我，不輕易追逐市場風向，常以旁觀者視角看待波動。這種傲嬌而固執的氣質，使他們偏好有長期邏輯、能經得起時間考驗的基金，而非短線熱門題材。', riskLevel: 3, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-shiba.png' },
  { title: '口袋貴賓', desc: '貴賓犬型投資人重視差異化與質感，不想與市場雷同。具有特色主題、選股邏輯清楚的基金，能滿足他們對獨特性的期待。', riskLevel: 3, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-poodle.png' },
  { title: '口袋拉拉', desc: '拉拉型投資人高度重視「有沒有產出」，對現金流與紀律特別敏感。能定期看到成果的配息型基金或穩定投入機制，最能讓他們安心守住投資節奏。', riskLevel: 4, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-labrador.png' },
  { title: '口袋土狗', desc: '台灣土狗型投資人擁有極強的環境適應力，不追求華麗報酬，而是能在各種市場條件下活得下來。分散、耐震、長期有效的基金配置，最符合他們的生存智慧。', riskLevel: 4, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/pocket-mascot.png' },
  { title: '口袋邊牧', desc: '牧羊犬型投資人理性且高度系統化，相信規則勝過情緒。具備明確策略、可自動執行的基金投資方式，正好符合他們追求最佳化的思維。', riskLevel: 5, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-shepherd.png' },
  { title: '口袋阿金', desc: '阿金型投資人性格溫暖、陽光，理財目的不是擊敗市場，而是讓生活更安心。他們親近長期投資、穩健累積的策略，就像釀酒一樣，時間越久，收穫越醇。', riskLevel: 5, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-golden.png' },
  { title: '口袋獒', desc: '藏獒型投資人重視責任與守護，對風險高度警覺。核心配置、穩定性高的基金，是他們為資產築起防線的首選，寧可慢，也不能失守。', riskLevel: 6, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-mastiff.png' }
];

/**
 * 核心映射表：將 10 種人格映射到基金代碼
 */
const RECOMMENDATION_MAP: Record<string, { core: string[], sat: string[], etf: string }> = {
  '口袋濟斯': { core: ['98639616', '98637171', '98637337'], sat: ['98638042', '98638121', '98638125'], etf: '00772B' },
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

const MAX_SCORE = 210;
type Step = 'intro' | 'form' | 'quiz' | 'results' | 'cart';

// --- UI 樣式系統 ---

const BTN_BASE = "inline-flex items-center justify-center gap-2.5 font-black transition-all duration-300 active:scale-[0.97] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
const BTN_PRIMARY = `${BTN_BASE} bg-red-900 text-white hover:bg-red-800 shadow-lg shadow-red-900/20`;
const BTN_DARK = `${BTN_BASE} bg-slate-950 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20`;
const BTN_GHOST = `${BTN_BASE} bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200`;

const BTN_SIZE_LG = "px-10 py-5 sm:py-6 rounded-[2rem] text-xl";
const BTN_SIZE_MD = "px-8 py-4 rounded-2xl text-lg";

// --- 輔助組件 ---

const ProgressBar = ({ current, total }: { current: number, total: number }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between w-full px-1 text-xs font-black text-slate-400 uppercase tracking-widest">
        <span>分析進度</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-red-900 transition-all duration-700 ease-out" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

const PerformanceMetric = ({ label, val }: { label: string, val: string | undefined }) => (
  <div className="flex flex-col items-start lg:items-end gap-1 px-4 py-3 bg-slate-50/80 lg:bg-transparent rounded-xl">
    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-none">{label}</span>
    <span className={`font-black text-sm lg:text-base ${val?.startsWith('+') ? 'text-red-700' : 'text-slate-800'}`}>{val || '--'}</span>
  </div>
);

const FundCard: React.FC<{ 
  fund: Fund; 
  isSelected: boolean; 
  onToggle: (code: string) => void;
  externalLink?: string;
  isSelectable?: boolean;
}> = ({ fund, isSelected, onToggle, externalLink, isSelectable = true }) => {
  const handleClick = () => {
    if (externalLink) {
      window.open(externalLink, '_blank');
      return;
    }
    if (isSelectable) {
      onToggle(fund.code);
    }
  };

  return (
    <div 
      className={`group relative bg-white border-2 rounded-[2rem] p-6 sm:p-8 transition-all duration-300 hover:shadow-xl cursor-pointer ${
        isSelected ? 'border-red-900 bg-red-50/5' : 'border-slate-100 hover:border-red-200 shadow-sm'
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1 flex gap-5 items-start">
          <div className={`p-3 mt-1 rounded-full transition-all duration-300 ${isSelected ? 'bg-red-900 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-red-100 group-hover:text-red-900'}`}>
            {externalLink ? (
              <ExternalLink size={24} className="group-hover:scale-110 transition-transform" />
            ) : (
              isSelected ? <CheckCircle size={24} /> : <Plus size={24} />
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black px-2 py-1 bg-slate-900 text-white rounded-md tracking-wider leading-none">
                {fund.code}
              </span>
              <span className="text-xs font-bold px-2 py-1 border border-slate-200 text-slate-500 rounded-md bg-white leading-none">
                {fund.currency}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
                風險等級 RR{fund.risk}
              </span>
            </div>
            <h4 className="font-black text-xl text-slate-900 group-hover:text-red-900 transition-colors leading-snug">
              {fund.name}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 font-medium">{fund.desc}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 lg:flex lg:flex-col gap-2 border-t lg:border-t-0 lg:border-l border-slate-100 pt-5 lg:pt-0 lg:pl-8">
          <PerformanceMetric label="一年績效" val={fund.perf} />
          <PerformanceMetric label="兩年績效" val={fund.perf2y} />
          <PerformanceMetric label="三年績效" val={fund.perf3y} />
        </div>
      </div>
    </div>
  );
};

// --- 主要視圖 ---

const Intro = ({ onStart }: { onStart: () => void }) => (
  <div 
    className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 bg-white"
    style={{ paddingTop: '76px', paddingBottom: '76px' }}
  >
    <div className="absolute inset-0 pointer-events-none select-none">
      <div className="absolute top-[10%] left-[8%] text-red-100/40 animate-float-slow transition-all">
        <Coins size={90} strokeWidth={1} />
      </div>
      <div className="absolute top-[25%] right-[15%] text-slate-100 animate-pulse delay-700">
        <Star size={30} fill="currentColor" />
      </div>
      <div className="absolute top-[60%] right-[10%] text-red-50 animate-pulse delay-200">
        <Sparkle size={24} fill="currentColor" />
      </div>
      <div className="absolute bottom-[18%] left-[12%] text-slate-50/80 animate-float-medium opacity-60">
        <TreePine size={110} strokeWidth={1} />
      </div>
      <div className="absolute bottom-[8%] right-[5%] text-red-50/50 animate-float-slow delay-1000">
        <TrendingUp size={140} strokeWidth={0.5} />
      </div>
      <div className="absolute top-[45%] right-[2%] text-slate-100/30 rotate-[35deg] animate-float-fast">
        <Rocket size={160} strokeWidth={0.5} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/[0.03] rounded-full blur-[100px]"></div>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12 animate-fadeIn">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-50/80 backdrop-blur-md border border-red-100/50 rounded-full text-red-900 shadow-sm">
          <BrainCircuit size={16} className="text-red-800" />
          <span className="text-xs font-black tracking-[0.2em] uppercase">口袋投資風格分析</span>
        </div>
      </div>

      <div className="space-y-8">
        <h1 className="font-black text-slate-900 leading-[1.2] tracking-tight text-[36px]">
          準備好探索<br/>
          你的基金人格了嗎？
        </h1>
        <p className="text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed text-[20px]">
          30 題挑戰，完成後即可立刻獲得您的<br className="hidden sm:block" />
          <span className="text-red-900/60 font-bold">投資風格定位分析報告</span> 與 <span className="text-slate-900 font-bold">基金推薦</span>！
        </p>
      </div>

      <div className="pt-4">
        <button 
          onClick={onStart} 
          className={`${BTN_DARK} ${BTN_SIZE_LG} px-16 group overflow-hidden relative`}
        >
          <span className="relative z-10 flex items-center gap-3">
            啟動分析 <Sparkles size={24} className="group-hover:rotate-12 transition-transform duration-500 text-red-400" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </div>
    </div>
    <style>{`
      @keyframes float-slow { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(35px, -45px) rotate(8deg); } }
      @keyframes float-medium { 0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); } 50% { transform: translate(-25px, -55px) scale(1.08) rotate(-6deg); } }
      @keyframes float-fast { 0%, 100% { transform: translate(0, 0) rotate(35deg); } 50% { transform: translate(15px, -25px) rotate(40deg); } }
      .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
      .animate-float-medium { animation: float-medium 10s ease-in-out infinite; }
      .animate-float-fast { animation: float-fast 7s ease-in-out infinite; }
    `}</style>
  </div>
);

const InfoForm = ({ data, onChange, onNext }: { data: UserFormData, onChange: (d: UserFormData) => void, onNext: () => void }) => {
  const isFormValid = data.gender && data.age && data.phone && data.email;
  const ageOptions = ['18-30歲', '31-40歲', '41-50歲', '51-60歲', '61歲以上'];

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-16 px-4 animate-fadeIn">
      <div className="bg-white border-2 border-slate-50 rounded-[3rem] p-8 sm:p-12 shadow-2xl space-y-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 tracking-widest uppercase">您的性別</label>
            <div className="flex gap-4">
              {['男', '女'].map(opt => (
                <button 
                  key={opt} 
                  onClick={() => onChange({ ...data, gender: opt })} 
                  className={`flex-1 py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98] ${data.gender === opt ? 'bg-red-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 tracking-widest uppercase">年齡層</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ageOptions.map(opt => (
                <button 
                  key={opt} 
                  onClick={() => onChange({ ...data, age: opt })} 
                  className={`px-4 py-3.5 rounded-xl font-black text-base transition-all active:scale-[0.98] ${data.age === opt ? 'bg-red-900 text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6 pt-6 border-t border-slate-50">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 tracking-widest uppercase">手機號碼</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="tel" 
                  className="w-full pl-14 pr-6 py-4.5 bg-slate-50 rounded-2xl font-black text-base outline-none focus:ring-4 focus:ring-red-900/10 transition-all border-2 border-transparent focus:border-red-900/10" 
                  value={data.phone} 
                  onChange={e => onChange({ ...data, phone: e.target.value })} 
                  placeholder="0912345678" 
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 tracking-widest uppercase">電子郵件</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  className="w-full pl-14 pr-6 py-4.5 bg-slate-50 rounded-2xl font-black text-base outline-none focus:ring-4 focus:ring-red-900/10 transition-all border-2 border-transparent focus:border-red-900/10" 
                  value={data.email} 
                  onChange={e => onChange({ ...data, email: e.target.value })} 
                  placeholder="example@email.com" 
                />
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={onNext} 
          disabled={!isFormValid} 
          className={`w-full ${isFormValid ? BTN_DARK : BTN_GHOST} ${BTN_SIZE_MD} group`}
        >
          進入測驗階段 <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const Quiz = ({ onComplete }: { onComplete: (ans: Record<number, number>) => void }) => {
  const allQs = useMemo(() => [...QUESTIONS.type2, ...QUESTIONS.type3, ...QUESTIONS.type4], []);
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

  if (showTransition) {
    return (
      <div className="max-w-4xl mx-auto py-12 sm:py-24 px-4 animate-fadeIn">
        <div className="bg-slate-950 text-white rounded-[3rem] p-10 sm:p-20 shadow-2xl relative overflow-hidden text-center space-y-12 border border-white/5">
          <div className="relative z-10 space-y-8">
            <div className="inline-flex p-8 bg-red-900/20 rounded-full text-red-500 mb-2 border border-red-900/30">
              <Rocket size={64} className="animate-bounce" />
            </div>
            <h2 className="text-[22px] sm:text-[54px] font-black tracking-tighter leading-tight whitespace-nowrap">
              投資宇宙即將啟動！
            </h2>
            <p className="text-[18px] sm:text-[20px] text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              宇宙農夫準備種下搖錢樹，加油，精彩新章即將展開！
            </p>
          </div>
          <button onClick={() => { setShowTransition(false); setIdx(idx + 1); }} className={`${BTN_PRIMARY} ${BTN_SIZE_LG} px-16 group`}>
            開始種樹 <ArrowRight size={28} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-16 px-4 animate-fadeIn">
      <ProgressBar current={idx + 1} total={allQs.length} />
      <div className="bg-white border border-slate-100 rounded-[3rem] p-8 sm:p-14 shadow-2xl text-center space-y-10 min-h-[400px] flex flex-col justify-center">
        <div className="space-y-4">
          <span className="text-xs font-black text-red-900 tracking-widest bg-red-50 px-4 py-1.5 rounded-full uppercase inline-block">第 {idx + 1} 題</span>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">{currQ.text || currQ.q}</h3>
        </div>
        <div className="space-y-4">
          {currQ.type === 'range' && (
            <div className="grid grid-cols-7 gap-2.5 sm:gap-4">
              {[1, 2, 3, 4, 5, 6, 7].map(v => (
                <button key={v} onClick={() => handleSelect(v)} className={`aspect-square rounded-2xl font-black text-lg transition-all flex items-center justify-center active:scale-[0.9] ${ans[currQ.id] === v ? 'bg-red-900 text-white shadow-lg scale-110' : 'bg-slate-50 text-slate-400 hover:bg-red-900/10 hover:text-red-900'}`}>
                  {v}
                </button>
              ))}
              <div className="col-span-7 flex justify-between text-xs font-black text-slate-400 pt-2 uppercase tracking-widest px-1">
                <span>非常不認同</span>
                <span>非常認同</span>
              </div>
            </div>
          )}
          {currQ.type === 'bool' && (
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSelect(7)} className={`py-5 rounded-2xl font-black text-lg transition-all ${ans[currQ.id] === 7 ? 'bg-red-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-red-900 hover:text-white'}`}>是</button>
              <button onClick={() => handleSelect(1)} className={`py-5 rounded-2xl font-black text-lg transition-all ${ans[currQ.id] === 1 ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white'}`}>否</button>
            </div>
          )}
          {currQ.type === 'choice' && currQ.options?.map(o => (
            <button key={o.val} onClick={() => handleSelect(o.val)} className={`w-full py-4.5 px-8 rounded-2xl font-bold text-lg text-left transition-all flex justify-between items-center group ${ans[currQ.id] === o.val ? 'bg-red-900 text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-red-900 hover:text-white'}`}>
              {o.text} <ArrowRight size={20} className="transition-all" />
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => idx > 0 && setIdx(idx - 1)} disabled={idx === 0} className="mt-8 mx-auto flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 disabled:opacity-0 transition-all group">
        <ArrowLeft size={18} /> 回上一題
      </button>
    </div>
  );
};

const Results = ({ persona, onContinue }: { persona: Persona, onContinue: () => void }) => (
  <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 animate-fadeIn space-y-12">
    <div className="bg-slate-950 text-white rounded-[3rem] sm:rounded-[4rem] p-10 sm:p-20 relative overflow-hidden shadow-2xl border border-white/5">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-10 flex-1 text-center md:text-left">
          <div className="space-y-4">
            <span className="text-sm font-black text-red-500 tracking-[0.5em] uppercase border-b-2 border-red-900 pb-2 inline-block">風格分析報告</span>
            <h2 className="font-black tracking-tighter leading-none text-[60px]">{persona.title}</h2>
          </div>
          <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-medium">{persona.desc}</p>
        </div>
        <img src={persona.image} alt={persona.title} className="relative z-10 w-64 h-64 sm:w-96 sm:h-96 object-contain animate-float" onError={e => (e.currentTarget.src = "https://api.iconify.design/noto:dog.svg")} />
      </div>
    </div>
    <button onClick={onContinue} className={`w-full ${BTN_PRIMARY} ${BTN_SIZE_LG} hover:scale-[1.01]`}>查看推薦配置 <ArrowRight size={30} /></button>
    <style>{` @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } } .animate-float { animation: float 5s ease-in-out infinite; } `}</style>
  </div>
);

const CartView = ({ persona, selected, onToggle, onReset }: { persona: Persona, selected: string[], onToggle: (c: string) => void, onReset: () => void }) => {
  const funds = MOCK_FUNDS;
  const recs = RECOMMENDATION_MAP[persona.title] || { core: [], sat: [], etf: '' };
  const coreFunds = useMemo(() => funds.filter(f => recs.core.includes(f.code)), [persona.title]);
  const satelliteFunds = useMemo(() => {
    const sats = funds.filter(f => recs.sat.includes(f.code));
    const etf = funds.find(f => f.code === recs.etf);
    return etf ? [...sats, etf] : sats;
  }, [persona.title]);

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-16 px-4 animate-fadeIn space-y-12 sm:space-y-16">
      <div className="text-center space-y-6">
        <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">您的專屬投資口袋</h2>
        <p className="text-slate-500 font-medium sm:text-xl">針對 <span className="text-red-900 font-black">{persona.title}</span> 風格，我們精選以下標的。</p>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">數據截止日：2024/12/31</p>
      </div>
      <div className="space-y-20 pb-40"> 
        <div className="space-y-8">
          <div className="flex items-center gap-4 px-2">
            <div className="p-3 bg-red-900 text-white rounded-2xl shadow-lg"><Globe size={26} /></div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">核心配置</h3>
          </div>
          <div className="grid gap-6 sm:gap-8">{coreFunds.map(f => (<FundCard key={f.code} fund={f} isSelected={selected.includes(f.code)} onToggle={onToggle} />))}</div>
        </div>
        <div className="space-y-8">
          <div className="flex items-center gap-4 px-2">
            <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg"><Satellite size={26} /></div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">衛星配置</h3>
          </div>
          <div className="grid gap-6 sm:gap-8">{satelliteFunds.map(f => (<FundCard key={f.code} fund={f} isSelected={selected.includes(f.code)} onToggle={onToggle} externalLink={f.code === recs.etf ? "https://www.pocket.tw/" : undefined} isSelectable={f.code !== recs.etf} />))}</div>
        </div>
      </div>

      <div className="fixed bottom-4 sm:bottom-8 left-0 right-0 z-50 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto bg-slate-950/95 backdrop-blur-xl text-white py-2.5 sm:py-6 px-4 sm:px-8 rounded-[1.5rem] sm:rounded-[3rem] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-8 border border-white/10">
          <div className="flex items-center gap-3 sm:gap-8 w-full sm:w-auto">
            <div className="relative p-2 sm:p-4 bg-red-900/40 rounded-xl sm:rounded-3xl">
              <ShoppingCart size={18} className="sm:size-8 text-red-500" />
              <span className="absolute -top-1 -right-1 bg-red-600 w-4 h-4 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-black ring-2 ring-slate-950">{selected.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 sm:mb-2">已選中標的</span>
              <span className="text-base sm:text-2xl font-black leading-none">{selected.length} 檔基金</span>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
            <button onClick={onReset} className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:px-8 sm:py-5 rounded-lg sm:rounded-2xl font-bold flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-slate-300 transition-all text-xs sm:text-base"><RefreshCcw size={14} /> 重新分析</button>
            <button onClick={() => window.open('https://my.cmoneyfund.com.tw/', '_blank')} className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 sm:px-14 sm:py-5 rounded-lg sm:rounded-2xl font-black bg-red-900 text-white hover:bg-red-800 shadow-lg flex-2 sm:flex-none transition-all text-xs sm:text-base">立即申購 <ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [step, setStep] = useState<Step>('intro');
  const [formData, setFormData] = useState<UserFormData>({ gender: '', age: '', phone: '', email: '' });
  const [persona, setPersona] = useState<Persona>(PERSONAS[0]);
  const [selected, setSelected] = useState<string[]>([]);

  const handleQuizComplete = (answers: Record<number, number>) => {
    let s = 0; Object.values(answers).forEach(v => s += v);
    const personaIndex = Math.min(Math.floor((s / MAX_SCORE) * 10), 9);
    setPersona(PERSONAS[personaIndex]);
    setSelected([]);
    setStep('results');
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setStep('intro')}>
            <div className="p-3 bg-slate-900 text-white rounded-xl group-hover:rotate-12 transition-transform shadow-lg"><Leaf size={24} /></div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter italic uppercase">口袋<span className="text-red-900">投資風格分析</span></span>
          </div>
        </div>
      </nav>
      <main className="pb-12 sm:pb-32">
        {step === 'intro' && <Intro onStart={() => setStep('form')} />}
        {step === 'form' && <InfoForm data={formData} onChange={setFormData} onNext={() => setStep('quiz')} />}
        {step === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
        {step === 'results' && <Results persona={persona} onContinue={() => setStep('cart')} />}
        {step === 'cart' && <CartView persona={persona} selected={selected} onToggle={c => setSelected(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])} onReset={() => setStep('quiz')} />}
      </main>
    </div>
  );
};

export default App;
