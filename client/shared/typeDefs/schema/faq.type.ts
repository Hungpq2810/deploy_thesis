export interface IFaqs {
  faqs: IFaq[];
}

export interface IFaq {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}
