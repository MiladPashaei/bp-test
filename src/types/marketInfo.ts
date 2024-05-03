export interface MarketActivityInfo {
  orders: ActivityOrder[];
  volume: string;
}

export interface ActivityOrder {
  amount: string;
  remain: string;
  price:  string;
  value:  string;
}

