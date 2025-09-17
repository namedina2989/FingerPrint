export enum Page {
  Login,
  Home,
  Payment,
  Success,
}

export enum ScanStatus {
    Idle,
    Scanning,
    Success,
    Error,
}

export interface Biller {
  id: string;
  name: string;
  category: 'Electricity' | 'Internet' | 'Water' | 'Credit Card';
  amount: number;
  nextDueDate: string;
}