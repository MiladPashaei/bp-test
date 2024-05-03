import axios from "axios"
import { GET_ALL_MARKETS } from "./APIEndpoints"
import { AllMarkets } from "../types/allMarkets"

export const getAllMarketsInfo = () => {
  return axios.get<AllMarkets>(GET_ALL_MARKETS).then(res => res.data);
}