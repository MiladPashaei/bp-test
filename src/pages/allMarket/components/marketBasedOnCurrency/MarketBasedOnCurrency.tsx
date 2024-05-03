import { AllMarketsResult } from '../../../../types/allMarkets'
import { calculateColor, colorChecker } from '../../../../utils/fontBrightness'
import "./styles/market-based-on-currency.css"
import { useNavigate } from 'react-router-dom'
interface MarketBasedOnCurrencyProps {
  data: AllMarketsResult[]
}
export default function MarketBasedOnCurrency({ data }: MarketBasedOnCurrencyProps) {
  const navigate = useNavigate()
  const navigateToId = (id: number) => {
    navigate(`/market/${id}`)
  }
  return (
    <div className='market-based-on-currency_wrapper'>
      {data.map((item, index) => {
        const color = item?.currency1?.color.includes('#') 
          ? item?.currency1?.color 
          : `#${item?.currency1?.color}`
        return(
        <div 
          className='markets-card'
          key={index} 
          onClick={() => { navigateToId(item.id) }} 
          style={{ 
            backgroundColor: calculateColor(color.toLowerCase()) ,
            color: colorChecker(color.toLowerCase()) 
          }}  
        >
          <h1>
              {item.title}
          </h1>
          <h2 
          >
              {item.title_fa}
          </h2>
          <p>
            قیمت: {" "}
            {item.price}
          </p>
        </div>
      )})}
    </div>
  )
}
