import axios from "axios";
import { GET_MARKET_ACTIVITY, GET_MARKET_TRANSACTION } from "./APIEndpoints";
import { MarketActivityInfo } from "../types/marketInfo";

export const getMarketActivityInfo = (id: string, type: "sell" | "buy") => {
  return axios.get<MarketActivityInfo>(`${GET_MARKET_ACTIVITY}/${id}/`, { params: { type } }).then(res=>res.data);
};
export const getMarketTransactionInfo = (id:string) => {
  return axios.get<MarketActivityInfo>(`${GET_MARKET_TRANSACTION}/${id}/`).then(res=>res.data);
}