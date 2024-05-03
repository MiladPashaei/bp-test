import { useQuery } from '@tanstack/react-query'
import { getAllMarketsInfo } from '../../services/allMarketsService';
import { Tabs, TabsProps } from 'antd';
import { useMemo } from 'react';
import MarketBasedOnCurrency from './components/marketBasedOnCurrency/MarketBasedOnCurrency';
import "./styles/all-market.css"

export default function AllMarket() {
  const {isLoading, data } = useQuery({
    queryKey: ["all-markets"],
    queryFn : getAllMarketsInfo,
    refetchInterval: undefined,
  });
  const marketsBasedOnToman = useMemo(()=> {
    return data?.results?.filter((item) => item.currency2?.code === "IRT") ?? []
  },[data])
  const marketsBasedOnTether = useMemo(()=> {
    return data?.results?.filter((item) => item.currency2?.code === "USDT") ?? []
  },[data])
  const items: TabsProps['items'] = [
    {
      key: 'IRT',
      label: 'TOMAN',
      children: <MarketBasedOnCurrency data={marketsBasedOnToman}/>,
    },
    {
      key: 'USDT',
      label: 'Tether',
      children: <MarketBasedOnCurrency data={marketsBasedOnTether}/>,
    },
  ];
  
  return (
    <div className='layout'>
      {isLoading ? <h1>Loading....</h1> : <Tabs defaultActiveKey="IRT" items={items}  />}
      
    </div>
  )
}
