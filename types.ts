
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
  isAggressive?: boolean;
  type?: 'bool' | 'choice' | 'range';
  options?: { val: number; text: string }[];
}

export interface UserFormData {
  gender: string;
  age: string;
  allocation: string;
  phone: string;
  email: string;
}

export interface Lead extends UserFormData {
  id: string;
  answers: Record<number, number>;
  score: number;
  persona: string;
  cart: string[];
  timestamp: string;
}

export interface Persona {
  title: string;
  desc: string;
  riskLevel: number;
}
