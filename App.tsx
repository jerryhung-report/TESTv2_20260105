
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ShoppingCart, Leaf, BrainCircuit, Check, TrendingUp, Sparkles, Phone, Mail,
  Plus, CheckCircle, ShieldCheck, ArrowRight, ArrowLeft, RefreshCcw, ExternalLink,
  Globe, Satellite
} from 'lucide-react';
import { MOCK_FUNDS, QUESTIONS } from './constants';
import { Fund, UserFormData, Persona, Question } from './types';

// --- 常數設定 ---

const PERSONAS: Persona[] = [
  { title: '口袋獒', desc: '藏獒型投資人重視責任與守護，對風險高度警覺。核心配置、穩定性高的基金，是他們為資產築起防線的首選，寧可慢，也不能失守。', riskLevel: 1 },
  { title: '口袋拉拉', desc: '拉拉型投資人高度重視「有沒有產出」，對現金流與紀律特別敏感。能定期看到成果的配息型基金 or 穩定投入機制，最能讓他們安心守住投資節奏。', riskLevel: 1 },
  { title: '口袋吉娃', desc: '吉娃娃型投資人情緒敏感、反應快速，容易受市場波動影響。透過分散配置與小額定期投入的基金策略，有助於在高壓情緒中維持投資穩定度級。', riskLevel: 1 },
  { title: '口袋西施', desc: '西施犬型投資人講究生活品質與節奏，不急著進出市場。穩健、管理風格一致的基金，讓資產在不被打擾的狀態下，優雅累積。', riskLevel: 2 },
  { title: '口袋阿金', desc: '阿金型投資人性格溫暖、陽光，理財目的不是擊敗市場，而是讓生活更安心。他們親近長期投資、穩健累積的策略，就像釀酒一樣，時間越久，收穫越醇。', riskLevel: 2 },
  { title: '口袋土狗', desc: '台灣土狗型投資人擁有極強的環境適應力，不追求華麗報酬，而是能在各種市場條件下活得下來。分散、耐震、長期有效的基金配置，最符合他們的生存智慧。', riskLevel: 2 },
  { title: '口袋馬爾', desc: '馬爾濟斯型投資人資金規模不一定大，但對世界充滿好奇。他們偏好低門檻、可探索不同市場的基金配置，在控制風險的前提下，體驗投資帶來的視野擴張。', riskLevel: 3 },
  { title: '口袋貴賓', desc: '貴賓犬型投資人重視差異化與質感，不想與市場雷同。具有特色主題、選股邏輯清楚的基金，能滿足他們對獨特性的期待。', riskLevel: 3 },
  { title: '口袋柴', desc: '柴犬型投資人個性獨立、自我，不輕易追逐市場風向，常以專注於自己的步調，看待波動。這種傲嬌而固執的氣質，使他們偏好有長期邏輯、能經得起時間考驗的基金，而非短線熱門題材。', riskLevel: 3 },
  { title: '口袋牧', desc: '牧羊犬型投資人理性且高度系統化，相信規則勝過情緒。具備明確策略、可自動執行的基金投資方式，正好符合他們追求最佳化的思維。', riskLevel: 3 }
];

const MAX_SCORE = 210;

type Step = 'intro' | 'form' | 'quiz' | 'results' | 'cart';

// --- 輔助組件 ---

const ProgressBar = ({ current, total }: { current: number, total: number }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto mb-8">
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
        !externalLink && isSelected ? 'border-red-900 bg-red-50/5' : 'border-slate-100 hover:border-red-200'
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1 flex gap-5 items-start">
          <div className={`p-2 mt-1 rounded-full transition-all duration-300 ${isSelected ? 'bg-red-900 text-white' : 'bg-slate-50 text-slate-300'}`}>
            {externalLink ? (
              <ExternalLink size={24} className="text-slate-400 group-hover:text-red-900" />
            ) : (
              isSelected ? <CheckCircle size={24} /> : <Plus size={24} />
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black px-2 py-1 bg-slate-900 text-white rounded-md">{fund.code}</span>
              <span className="text-xs font-bold px-2 py-1 border border-slate-200 text-slate-500 rounded-md">{fund.currency}</span>
              <span className="text-xs font-bold text-slate-400">風險等級 RR{fund.risk}</span>
            </div>
            <h4 className="font-black text-xl text-slate-900 group-hover:text-red-900 transition-colors">
              {fund.name}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{fund.desc}</p>
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
  <div className="max-w-4xl mx-auto text-center space-y-12 py-24 px-4 animate-fadeIn">
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-900 rounded-full text-xs font-black tracking-widest border border-red-100 uppercase">
      <BrainCircuit size={14} /> 口袋投資風格分析
    </div>
    <div className="space-y-6">
      <h1 className="text-5xl sm:text-7xl font-black text-slate-900 leading-tight tracking-tighter">揭開您的<br/><span className="text-red-800 underline decoration-red-200 underline-offset-8">投資口袋</span></h1>
      <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">利用心理行為建模，從 30 項指標精確定位投資風格，找出最契合您的基金投資標的。</p>
    </div>
    <button onClick={onStart} className="px-16 py-7 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-red-800 hover:scale-105 transition-all duration-300">
      啟動分析 <Sparkles size={20} className="inline ml-2" />
    </button>
  </div>
);

const InfoForm = ({ data, onChange, onNext }: { data: UserFormData, onChange: (d: UserFormData) => void, onNext: () => void }) => {
  const isFormValid = data.gender && data.age && data.allocation && data.phone && data.email;
  return (
    <div className="max-w-2xl mx-auto py-20 px-4 animate-fadeIn">
      <div className="bg-white border-2 border-slate-50 rounded-[3rem] p-10 sm:p-16 shadow-2xl space-y-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 tracking-widest uppercase">您的性別</label>
            <div className="flex gap-4">
              {['男', '女'].map(opt => (
                <button key={opt} onClick={() => onChange({ ...data, gender: opt })} className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all ${data.gender === opt ? 'bg-red-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 tracking-widest uppercase">年齡層</label>
            <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-black text-slate-800 outline-none appearance-none" value={data.age} onChange={e => onChange({ ...data, age: e.target.value })}>
              <option value="">請選擇</option>
              <option value="18-30歲">18-30歲</option>
              <option value="31-40歲">31-40歲</option>
              <option value="41-50歲">41-50歲</option>
              <option value="51-60歲">51-60歲</option>
              <option value="61歲以上">61歲以上</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 tracking-widest uppercase">股/債配置比</label>
            <div className="grid grid-cols-2 gap-3">
              {['股票 3 成以下', '4 比 6', '5 比 5', '6 比 4', '股票 7 成以上'].map(opt => (
                <button key={opt} onClick={() => onChange({ ...data, allocation: opt })} className={`px-4 py-3 rounded-xl font-black text-xs transition-all ${data.allocation === opt ? 'bg-red-900 text-white shadow-md' : 'bg-slate-50 text-slate-400'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 tracking-widest uppercase">手機號碼</label>
              <input type="tel" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-black outline-none" value={data.phone} onChange={e => onChange({ ...data, phone: e.target.value })} placeholder="0912..." />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 tracking-widest uppercase">電子郵件</label>
              <input type="email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-black outline-none" value={data.email} onChange={e => onChange({ ...data, email: e.target.value })} placeholder="email@..." />
            </div>
          </div>
        </div>
        <button onClick={onNext} disabled={!isFormValid} className={`w-full py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all ${isFormValid ? 'bg-slate-900 text-white hover:bg-red-900' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}>
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
  const currQ = allQs[idx];

  const handleSelect = (v: number) => {
    const nextAns = { ...ans, [currQ.id]: v };
    setAns(nextAns);
    if (idx < allQs.length - 1) setIdx(idx + 1);
    else onComplete(nextAns);
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 animate-fadeIn">
      <ProgressBar current={idx + 1} total={allQs.length} />
      <div className="bg-white border border-slate-100 rounded-[3rem] p-10 sm:p-16 shadow-2xl text-center space-y-10 min-h-[400px] flex flex-col justify-center">
        <div className="space-y-4">
          <span className="text-xs font-black text-red-900 tracking-widest bg-red-50 px-3 py-1 rounded-full uppercase">第 {idx + 1} 題</span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{currQ.text || currQ.q}</h3>
        </div>
        <div className="space-y-4">
          {currQ.type === 'range' && (
            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map(v => (
                <button key={v} onClick={() => handleSelect(v)} className="aspect-square rounded-xl bg-slate-50 hover:bg-red-900 hover:text-white font-black transition-all flex items-center justify-center">{v}</button>
              ))}
              <div className="col-span-7 flex justify-between text-xs font-bold text-slate-400 pt-2"><span>非常不認同</span><span>非常認同</span></div>
            </div>
          )}
          {currQ.type === 'bool' && (
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSelect(7)} className="py-5 rounded-xl bg-slate-50 hover:bg-red-900 hover:text-white font-black text-lg transition-all">是</button>
              <button onClick={() => handleSelect(1)} className="py-5 rounded-xl bg-slate-50 hover:bg-slate-900 hover:text-white font-black text-lg transition-all">否</button>
            </div>
          )}
          {currQ.type === 'choice' && currQ.options?.map(o => (
            <button key={o.val} onClick={() => handleSelect(o.val)} className="w-full py-4 px-8 rounded-xl bg-slate-50 hover:bg-red-900 hover:text-white font-bold text-left transition-all flex justify-between items-center group">
              {o.text} <ArrowRight size={18} className="opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => idx > 0 && setIdx(idx - 1)} disabled={idx === 0} className="mt-8 mx-auto flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 disabled:opacity-0 transition-all"><ArrowLeft size={16} /> 回上一題</button>
    </div>
  );
};

const Results = ({ persona, onContinue }: { persona: Persona, onContinue: () => void }) => (
  <div className="max-w-4xl mx-auto py-20 px-4 animate-fadeIn space-y-12">
    <div className="bg-slate-900 text-white rounded-[4rem] p-10 sm:p-20 relative overflow-hidden shadow-2xl">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-8 flex-1">
          <div className="space-y-2">
            <span className="text-xs font-black text-red-500 tracking-[0.4em] uppercase">風格分析報告</span>
            <h2 className="text-5xl font-black tracking-tight">{persona.title}</h2>
          </div>
          <div className="space-y-6">
            <p className="text-xl text-slate-300 leading-relaxed font-medium">{persona.desc}</p>
          </div>
        </div>
        <img src="https://raw.githubusercontent.com/tina-dev-pocket/assets/main/pocket-mascot.png" alt="Pocket" className="w-48 h-48 sm:w-64 sm:h-64 object-contain animate-float" onError={e => (e.currentTarget.src = "https://api.iconify.design/noto:dog.svg")} />
      </div>
    </div>
    <button onClick={onContinue} className="w-full py-8 bg-red-900 text-white rounded-[2rem] font-black text-xl hover:bg-red-800 transition-all shadow-xl flex items-center justify-center gap-4">
      查看推薦配置 <ArrowRight size={24} />
    </button>
    <style>{`@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } } .animate-float { animation: float 4s ease-in-out infinite; }`}</style>
  </div>
);

const CartView = ({ persona, selected, onToggle, onReset }: { persona: Persona, selected: string[], onToggle: (c: string) => void, onReset: () => void }) => {
  const funds = MOCK_FUNDS;
  return (
    <div className="max-w-5xl mx-auto py-16 px-4 animate-fadeIn space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-slate-900">您的專屬投資口袋</h2>
        <div className="space-y-1">
          <p className="text-slate-500 font-medium">針對 <span className="text-red-900 font-black">{persona.title}</span> 風格，我們精選以下標的。</p>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">績效截止日：2024/12/31</p>
        </div>
      </div>
      <div className="space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-4 text-xl font-black"><Globe className="text-red-900" size={24} /> 核心配置</div>
          <div className="grid gap-6">
            {funds.filter(f => f.type === 'Core').map(f => (
              <FundCard 
                key={f.code} 
                fund={f} 
                isSelected={selected.includes(f.code)} 
                onToggle={onToggle} 
              />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-4 text-xl font-black"><Satellite className="text-red-900" size={24} /> 衛星配置</div>
          <div className="grid gap-6">
            {funds.filter(f => f.type === 'Satellite').map((f, i) => (
              <FundCard 
                key={f.code} 
                fund={f} 
                isSelected={selected.includes(f.code)} 
                onToggle={onToggle} 
                externalLink={i === 3 ? "https://www.pocket.tw/" : undefined}
                isSelectable={i !== 3}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="sticky bottom-8 z-50 px-4">
        <div className="max-w-4xl mx-auto bg-slate-900 text-white p-6 sm:p-8 rounded-[3rem] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border-b-8 border-red-900">
          <div className="flex items-center gap-6">
            <div className="relative p-3 bg-red-900/20 rounded-2xl"><ShoppingCart size={32} /><span className="absolute -top-1 -right-1 bg-red-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">{selected.length}</span></div>
            <div><div className="text-xs font-bold text-slate-400">已選中</div><div className="text-xl font-black">{selected.length} 檔基金</div></div>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button onClick={onReset} className="flex-1 sm:flex-none px-8 py-4 bg-slate-800 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"><RefreshCcw size={18} /> 重新檢測</button>
            <button onClick={() => window.open('https://my.cmoneyfund.com.tw/', '_blank')} className="flex-1 sm:flex-none px-12 py-4 bg-red-900 rounded-2xl font-black text-lg hover:bg-red-800 transition-all flex items-center justify-center gap-2">立即申購 <ArrowRight size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- App 組件 ---

const App = () => {
  const [step, setStep] = useState<Step>('intro');
  const [formData, setFormData] = useState<UserFormData>({ gender: '', age: '', allocation: '', phone: '', email: '' });
  const [ans, setAns] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [persona, setPersona] = useState<Persona>(PERSONAS[0]);
  const [selected, setSelected] = useState<string[]>([]);

  const handleQuizComplete = async (answers: Record<number, number>) => {
    let s = 0; Object.values(answers).forEach(v => s += v);
    const rate = (s / MAX_SCORE) * 100;
    const p = PERSONAS[Math.min(Math.floor(rate / 10), 9)];
    setAns(answers);
    setScore(s);
    setPersona(p);
    setStep('results');
  };

  const handleReset = () => {
    setAns({});
    setScore(0);
    setSelected([]);
    setStep('quiz');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setStep('intro')}>
            <div className="p-2 bg-slate-900 text-white rounded-xl group-hover:rotate-12 transition-transform"><Leaf size={20} /></div>
            <span className="text-lg font-black tracking-tighter italic uppercase">口袋<span className="text-red-900">投資風格分析</span></span>
          </div>
        </div>
      </nav>
      <main>
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
