export interface AmpelBereich {
  status: "green" | "yellow" | "red";
  issues: string[];
  details: string[];
}

export interface AmpelResult {
  gesamt: "green" | "yellow" | "red";
  [key: string]: AmpelBereich | string; // string für 'gesamt' Property
}

export interface Todo {
  title: string;
  description: string;
  deadline: string;
  priority: "red" | "yellow";
  link?: string;
}
