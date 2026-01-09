
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
  { title: '口袋濟斯', desc: '濟斯型投資人資金規模不一定大，但對世界充滿好奇。他們偏好低門檻、可探索不同市場的配置。', riskLevel: 1, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-maltese.png' },
  { title: '口袋西施', desc: '西施犬型投資人講究生活品質與節奏，不急著進出市場。穩健、管理風格一致的基金。', riskLevel: 2, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-shih-tzu.png' },
  { title: '口袋吉娃', desc: '吉娃娃型投資人情緒敏感、反應快速，容易受市場波動影響。透過分散配置小額定期投入。', riskLevel: 2, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-chihuahua.png' },
  { title: '口袋柴', desc: '柴犬型投資人個性獨立、不輕易追逐風向。偏好有長期邏輯、能經得起考驗的基金。', riskLevel: 3, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-shiba.png' },
  { title: '口袋貴賓', desc: '貴賓犬型投資人重視差異化與質感，具有特色主題、選股邏輯清楚的基金。', riskLevel: 3, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-poodle.png' },
  { title: '口袋拉拉', desc: '拉拉型投資人高度重視「有沒有產出」，對現金流特別敏感。配息型基金最能讓其安心。', riskLevel: 4, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-labrador.png' },
  { title: '口袋土狗', desc: '台灣土狗型投資人擁有極強適應力，不追求華麗報酬，而是在各種條件下活下來。', riskLevel: 4, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/pocket-mascot.png' },
  { title: '口袋邊牧', desc: '邊境牧羊犬型投資人理性且高度系統化，相信規則勝過情緒。具備明確執行策略。', riskLevel: 5, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-shepherd.png' },
  { title: '口袋阿金', desc: '阿金型投資人性格溫暖、陽光，理財目的是讓生活更安心。親近長期穩健策略。', riskLevel: 5, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-golden.png' },
  { title: '口袋獒', desc: '藏獒型投資人重視責任與守護，對風險高度警覺。核心配置、穩定性高基金是首選。', riskLevel: 6, image: 'https://raw.githubusercontent.com/tina-dev-pocket/assets/main/persona-mastiff.png' }
];

/**
 * 核心映射表：將 10 種人格映射到附檔規定的基金代碼 (3 核心 + 3 衛星 + 1 ETF)
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

// --- 輔助組件 ---

const ProgressBar = ({ current, total }: { current: number, total: number }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between w-full px-1 text-xs font-black text-slate-400 uppercase tracking-widest">
        <span>分析進度</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-red-900 transition-all duration-500 ease-out" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

const PerformanceMetric = ({ label, val }: { label: string, val: string | undefined }) => (
  <div className="flex flex-col items-start lg:items-end gap-0.5 sm:gap-1 px-3 py-2 sm:px-4 sm:py-3 bg-slate-50/80 lg:bg-transparent rounded-xl">
    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</span>
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
          <div className={`p-2.5 mt-1 rounded-full transition-all duration-300 ${isSelected ? 'bg-red-900 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-red-100 group-hover:text-red-900'}`}>
            {externalLink ? (
              <ExternalLink size={24} className="group-hover:scale-110 transition-transform" />
            ) : (
              isSelected ? <CheckCircle size={24} /> : <Plus size={24} />
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black px-2 py-0.5 bg-slate-900 text-white rounded-md tracking-wider">
                {fund.code}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 border border-slate-200 text-slate-500 rounded-md bg-white">
                {fund.currency}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
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
    {/* 背景場景裝飾 */}
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
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-500/[0.02] rounded-full blur-[80px]"></div>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12 animate-fadeIn">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-50/80 backdrop-blur-md border border-red-100/50 rounded-full text-red-900 shadow-sm">
          <BrainCircuit size={16} className="text-red-800" />
          <span className="text-xs font-black tracking-[0.2em] uppercase">口袋投資風格分析</span>
        </div>
      </div>

      <div className="space-y-8">
        <h1 
          className="font-black text-slate-900 leading-[1.2] tracking-tight"
          style={{ fontSize: '36px' }}
        >
          準備好探索<br/>
          你的基金人格了嗎？
        </h1>
        <p 
          className="text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed"
          style={{ fontSize: '20px' }}
        >
          30 題挑戰，完成後即可立刻獲得您的<br className="hidden sm:block" />
          <span className="text-red-900/60 font-bold">投資風格定位分析報告</span> 與 <span className="text-slate-900 font-bold">基金推薦</span>！
        </p>
      </div>

      <div className="pt-4">
        <button 
          onClick={onStart} 
          className="group relative px-20 py-[22px] bg-slate-950 text-white rounded-[2.5rem] font-black text-xl shadow-[0_20px_50px_rgba(15,23,42,0.35)] hover:bg-red-950 hover:scale-105 transition-all duration-500 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            啟動分析 <Sparkles size={24} className="group-hover:rotate-12 transition-transform duration-500 text-red-400" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </div>
    </div>

    <style>{`
      @keyframes float-slow {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(35px, -45px) rotate(8deg); }
      }
      @keyframes float-medium {
        0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        50% { transform: translate(-25px, -55px) scale(1.08) rotate(-6deg); }
      }
      @keyframes float-fast {
        0%, 100% { transform: translate(0, 0) rotate(35deg); }
        50% { transform: translate(15px, -25px) rotate(40deg); }
      }
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
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 animate-fadeIn">
      <div className="bg-white border-2 border-slate-50 rounded-[3rem] p-8 sm:p-12 shadow-2xl space-y-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 tracking-widest uppercase">您的性別</label>
            <div className="flex gap-4">
              {['男', '女'].map(opt => (
                <button 
                  key={opt} 
                  onClick={() => onChange({ ...data, gender: opt })} 
                  className={`flex-1 py-[12px] rounded-2xl font-black text-base transition-all ${data.gender === opt ? 'bg-red-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
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
                  className={`px-4 py-[10px] rounded-xl font-black text-base transition-all ${data.age === opt ? 'bg-red-900 text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6 pt-4 border-t border-slate-50">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 tracking-widest uppercase">手機號碼</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="tel" 
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl font-black text-base outline-none focus:ring-2 focus:ring-red-900/10 transition-all" 
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
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl font-black text-base outline-none focus:ring-2 focus:ring-red-900/10 transition-all" 
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
          className={`w-full py-[18px] rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all ${isFormValid ? 'bg-slate-900 text-white hover:bg-red-900' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
        >
          進入測驗階段 <ArrowRight size={20} />
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

  const proceedFromTransition = () => {
    setShowTransition(false);
    setIdx(idx + 1);
  };

  if (showTransition) {
    return (
      <div className="max-w-4xl mx-auto py-12 sm:py-20 px-4 animate-fadeIn">
        <div className="bg-slate-950 text-white rounded-[3rem] p-10 sm:p-16 shadow-2xl relative overflow-hidden text-center space-y-10 border border-slate-800">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10"><Rocket size={100} /></div>
            <div className="absolute bottom-10 right-10 rotate-45"><Satellite size={120} /></div>
          </div>
          <div className="relative z-10 space-y-8">
            <div className="inline-flex p-6 bg-red-950/40 rounded-full text-red-500 mb-2 border border-red-900/30">
              <Rocket size={56} className="animate-bounce" />
            </div>
            <h2 className="text-[34px] sm:text-[58px] font-black tracking-tighter leading-tight whitespace-nowrap">
              投資宇宙即將啟動！
            </h2>
            <p className="text-[18px] sm:text-[22px] text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
              你已站在播種的起點，完成測驗為你的專屬搖錢樹選對生成樹苖。
            </p>
          </div>
          <button 
            onClick={proceedFromTransition}
            className="relative z-10 px-16 py-6 bg-red-900 text-white rounded-[2.5rem] font-black text-[22px] hover:bg-red-800 transition-all hover:scale-105 flex items-center justify-center gap-4 mx-auto shadow-[0_20px_40px_rgba(153,27,27,0.4)]"
          >
            啟動決策核心 <ArrowRight size={28} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-12 px-4 animate-fadeIn">
      <ProgressBar current={idx + 1} total={allQs.length} />
      <div className="bg-white border border-slate-100 rounded-[3rem] p-8 sm:p-14 shadow-2xl text-center space-y-8 min-h-[320px] flex flex-col justify-center">
        <div className="space-y-3">
          <span className="text-xs font-black text-red-900 tracking-widest bg-red-50 px-3 py-1 rounded-full uppercase">第 {idx + 1} 題</span>
          <h3 className="text-base font-black text-slate-900 leading-tight">{currQ.text || currQ.q}</h3>
        </div>
        <div className="space-y-3">
          {currQ.type === 'range' && (
            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map(v => (
                <button 
                  key={v} 
                  onClick={() => handleSelect(v)} 
                  className={`aspect-square rounded-xl font-black transition-all flex items-center justify-center ${
                    ans[currQ.id] === v ? 'bg-red-900 text-white shadow-lg scale-110' : 'bg-slate-50 text-slate-400 hover:bg-red-900 hover:text-white'
                  }`}
                >
                  {v}
                </button>
              ))}
              <div className="col-span-7 flex justify-between text-xs font-bold text-slate-400 pt-2"><span>非常不認同</span><span>非常認同</span></div>
            </div>
          )}
          {currQ.type === 'bool' && (
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleSelect(7)} 
                className={`py-[14px] rounded-xl font-black text-base transition-all ${
                  ans[currQ.id] === 7 ? 'bg-red-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-red-900 hover:text-white'
                }`}
              >
                是
              </button>
              <button 
                onClick={() => handleSelect(1)} 
                className={`py-[14px] rounded-xl font-black text-base transition-all ${
                  ans[currQ.id] === 1 ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                否
              </button>
            </div>
          )}
          {currQ.type === 'choice' && currQ.options?.map(o => (
            <button 
              key={o.val} 
              onClick={() => handleSelect(o.val)} 
              className={`w-full py-[10px] px-8 rounded-xl font-bold text-base text-left transition-all flex justify-between items-center group ${
                ans[currQ.id] === o.val ? 'bg-red-900 text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-red-900 hover:text-white'
              }`}
            >
              {o.text} <ArrowRight size={18} className={`transition-opacity ${ans[currQ.id] === o.val ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            </button>
          ))}
        </div>
      </div>
      <button 
        onClick={() => idx > 0 && setIdx(idx - 1)} 
        disabled={idx === 0} 
        className="mt-6 mx-auto flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 disabled:opacity-0 transition-all"
      >
        <ArrowLeft size={16} /> 回上一題
      </button>
    </div>
  );
};

const Results = ({ persona, onContinue }: { persona: Persona, onContinue: () => void }) => (
  <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 animate-fadeIn space-y-8 sm:space-y-10">
    <div className="bg-slate-950 text-white rounded-[3rem] sm:rounded-[4rem] p-10 sm:p-16 relative overflow-hidden shadow-2xl border border-slate-800">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-10 flex-1 text-center md:text-left">
          <div className="space-y-4">
            <span className="text-sm font-black text-red-500 tracking-[0.5em] uppercase border-b-2 border-red-900 pb-2 inline-block">風格分析報告</span>
            <h2 className="text-6xl sm:text-7xl font-black tracking-tighter leading-none">{persona.title}</h2>
          </div>
          <div className="space-y-6">
            <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-medium">
              {persona.desc}
            </p>
          </div>
        </div>
        <div className="relative group flex-shrink-0">
          <div className="absolute inset-0 bg-red-900/15 rounded-full blur-[100px] group-hover:bg-red-900/25 transition-all duration-700"></div>
          <img 
            src={persona.image} 
            alt={persona.title} 
            className="relative z-10 w-64 h-64 sm:w-96 sm:h-96 object-contain animate-float drop-shadow-[0_35px_60px_rgba(153,27,27,0.4)]" 
            onError={e => (e.currentTarget.src = "https://api.iconify.design/noto:dog.svg")} 
          />
        </div>
      </div>
    </div>
    <button onClick={onContinue} className="w-full py-[28px] bg-red-900 text-white rounded-[2.5rem] font-black text-2xl hover:bg-red-800 transition-all shadow-[0_20px_50px_rgba(153,27,27,0.3)] flex items-center justify-center gap-5 hover:scale-[1.02] active:scale-[0.98]">
      查看推薦配置 <ArrowRight size={30} />
    </button>
    <style>{`
      @keyframes float { 
        0%, 100% { transform: translateY(0); } 
        50% { transform: translateY(-30px); } 
      } 
      .animate-float { animation: float 5s ease-in-out infinite; }
    `}</style>
  </div>
);

const CartView = ({ persona, selected, onToggle, onReset }: { persona: Persona, selected: string[], onToggle: (c: string) => void, onReset: () => void }) => {
  const funds = MOCK_FUNDS;
  const recs = RECOMMENDATION_MAP[persona.title] || { core: [], sat: [], etf: '' };

  // 根據該人格的推薦清單過濾基金
  const coreFunds = useMemo(() => {
    return funds.filter(f => recs.core.includes(f.code));
  }, [persona.title]);

  const satelliteAndEtfFunds = useMemo(() => {
    // 取得推薦的衛星基金
    const sats = funds.filter(f => recs.sat.includes(f.code));
    // 取得推薦的 ETF
    const etf = funds.find(f => f.code === recs.etf);
    
    // 組合並排序：衛星基金在前，ETF 在最後
    return etf ? [...sats, etf] : sats;
  }, [persona.title]);

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-10 px-4 animate-fadeIn space-y-10 sm:space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">您的專屬投資口袋</h2>
        <div className="space-y-1">
          <p className="text-slate-500 font-medium" style={{ fontSize: '18px' }}>
            針對 <span className="text-red-900 font-black">{persona.title}</span> 風格，我們精選以下標的。
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">數據截止日：2024/12/31</p>
        </div>
      </div>
      
      <div className="space-y-16 pb-32"> 
        {/* 核心配置部分 */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 bg-red-900 text-white rounded-xl shadow-md"><Globe size={24} /></div>
            <h3 className="text-2xl font-black text-slate-900">核心配置</h3>
          </div>
          <div className="grid gap-6">
            {coreFunds.map(f => (
              <FundCard 
                key={f.code} 
                fund={f} 
                isSelected={selected.includes(f.code)} 
                onToggle={onToggle} 
              />
            ))}
          </div>
        </div>
        
        {/* 衛星與 ETF 部分 */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 bg-slate-900 text-white rounded-xl shadow-md"><Satellite size={24} /></div>
            <h3 className="text-2xl font-black text-slate-900">衛星與 ETF 配置</h3>
          </div>
          <div className="grid gap-6">
            {satelliteAndEtfFunds.map((f) => {
              const isEtf = f.code === recs.etf;
              return (
                <FundCard 
                  key={f.code} 
                  fund={f} 
                  isSelected={selected.includes(f.code)} 
                  onToggle={onToggle} 
                  externalLink={isEtf ? "https://www.pocket.tw/" : undefined}
                  isSelectable={!isEtf}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部固定購物車 BAR */}
      <div className="fixed bottom-6 left-0 right-0 z-50 px-4">
        <div className="max-w-4xl mx-auto bg-slate-950/95 backdrop-blur-md text-white py-3 px-5 sm:p-5 rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 border border-white/10">
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto px-2">
            <div className="relative p-2.5 sm:p-3 bg-red-900/40 rounded-2xl ring-1 ring-red-900/50">
              <ShoppingCart size={22} className="sm:size-7 text-red-500" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black ring-4 ring-slate-950">
                {selected.length}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">已選中基金</span>
              <span className="text-lg sm:text-xl font-black leading-none">{selected.length} 檔標的</span>
            </div>
          </div>
          
          <div className="flex gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button 
              onClick={onReset} 
              className="flex-1 sm:flex-none px-5 sm:px-7 py-2.5 sm:py-3.5 bg-slate-900/50 border border-slate-700/50 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 hover:border-slate-600 transition-all text-sm whitespace-nowrap text-slate-300"
            >
              <RefreshCcw size={16} /> 重新分析
            </button>
            <button 
              onClick={() => window.open('https://my.cmoneyfund.com.tw/', '_blank')} 
              className="flex-2 sm:flex-none px-8 sm:px-12 py-2.5 sm:py-3.5 bg-red-900 rounded-2xl font-black text-sm sm:text-lg hover:bg-red-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 whitespace-nowrap shadow-xl shadow-red-950/40"
            >
              立即申購 <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- App 組件 ---

const App = () => {
  const [step, setStep] = useState<Step>('intro');
  const [formData, setFormData] = useState<UserFormData>({ gender: '', age: '', phone: '', email: '' });
  const [ans, setAns] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [persona, setPersona] = useState<Persona>(PERSONAS[0]);
  const [selected, setSelected] = useState<string[]>([]);

  const handleQuizComplete = async (answers: Record<number, number>) => {
    let s = 0; Object.values(answers).forEach(v => s += v);
    const rate = (s / MAX_SCORE) * 100;
    const personaIndex = Math.min(Math.floor(rate / 10), 9);
    const p = PERSONAS[personaIndex];
    
    setAns(answers);
    setScore(s);
    setPersona(p);

    // 初始勾選邏輯：預設不勾選任何基金
    setSelected([]);

    setStep('results');
  };

  const handleReset = () => {
    setAns({});
    setScore(0);
    setSelected([]);
    setStep('quiz');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-100 py-[14px] sm:py-[18px] px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setStep('intro')}>
            <div className="p-2.5 bg-slate-900 text-white rounded-xl group-hover:rotate-12 transition-transform shadow-lg"><Leaf size={22} /></div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter italic uppercase">口袋<span className="text-red-900">投資風格分析</span></span>
          </div>
        </div>
      </nav>
      <main className="pb-12 sm:pb-24">
        {step === 'intro' && <Intro onStart={() => setStep('form')} />}
        {step === 'form' && <InfoForm data={formData} onChange={setFormData} onNext={() => setStep('quiz')} />}
        {step === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
        {step === 'results' && <Results persona={persona} onContinue={() => setStep('cart')} />}
        {step === 'cart' && <CartView persona={persona} selected={selected} onToggle={c => setSelected(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])} onReset={handleReset} />}
      </main>
    </div>
  );
};

export default App;
