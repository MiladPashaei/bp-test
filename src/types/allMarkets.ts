export interface AllMarkets {
  count:    number;
  next:     null;
  previous: null;
  results:  AllMarketsResult[];
}

export interface AllMarketsResult {
  id:                  number;
  currency1:           Currency;
  currency2:           Currency;
  tradable:            boolean;
  for_test:            boolean;
  otc_sell_percent:    string;
  otc_buy_percent:     string;
  otc_max_buy_amount:  string;
  otc_max_sell_amount: string;
  order_book_info:     Info;
  internal_price_info: Info;
  price_info:          Info;
  price:               string;
  title:               string;
  code:                string;
  title_fa:            string;
  trading_view_source: TradingViewSource;
  trading_view_symbol: string;
  otc_market:          boolean;
  text:                string;
  volume_24h:          string;
  market_cap:          string;
  circulating_supply:  string;
  all_time_high:       string;
  popularity_weight:   number;
  freshness_weight:    number;
}

export interface Currency {
  id:                           number;
  title:                        string;
  title_fa:                     string;
  code:                         string;
  tradable:                     boolean;
  for_test:                     boolean;
  image:                        string;
  decimal:                      number;
  decimal_amount:               number;
  decimal_irt:                  number;
  color:                        string;
  high_risk:                    boolean;
  show_high_risk:               boolean;
  withdraw_commission:          string;
  tags:                         Tag[];
  etf:                          boolean;
  for_binvest:                  boolean;
  for_loan:                     boolean;
  for_stake:                    boolean;
  recommend_for_deposit_weight: number;
}

export interface Tag {
  id:        number;
  name:      string;
  name_en:   string;
  has_chart: boolean;
}


export interface Info {
  created_at: number | null;
  price:      null | string;
  change:     number | null;
  min:        null | string;
  max:        null | string;
  time:       null | string;
  mean:       null | string;
  value:      null | string;
  amount:     null | string;
}

export enum TradingViewSource {
  Binance = "BINANCE",
  Gateio = "GATEIO",
  Kraken = "KRAKEN",
  Kucoin = "KUCOIN",
}
