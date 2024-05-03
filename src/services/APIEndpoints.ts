const BASE_URL = "https://api.bitpin.ir/"
const V1 = "v1/"
const V2 = "v2/"

export const GET_ALL_MARKETS = BASE_URL + V1 +"mkt/markets/";
export const GET_MARKET_ACTIVITY = BASE_URL + V2 +"mth/actives";
export const GET_MARKET_TRANSACTION = BASE_URL + V2 + "mth/matches/"