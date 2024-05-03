import { Tabs, TabsProps } from 'antd';
import { useParams } from 'react-router-dom'
import MarketActivityInfo from './components/marketActivityInfo/MarketActivityInfo';
import MarketTransactionInfo from './components/marketTransactionInfo/MarketTransactionInfo';

export default function MarketDetail() {
  const params = useParams();
  const items: TabsProps['items'] = [
    {
      key: 'sell',
      label: 'Sell',
      children: <MarketActivityInfo id={params.market_id!} type='sell'/>,
    },
    {
      key: 'buy',
      label: 'Buy',
      children:  <MarketActivityInfo id={params.market_id!} type='buy'/>,
    },
    {
      key: 'transactions',
      label: 'Transaction',
      children:  <MarketTransactionInfo id={params.market_id!} />,
    },
  ];
  return (
    <div className='layout'>
      <Tabs defaultActiveKey="sell" items={items}  />
    </div>
  )
}
