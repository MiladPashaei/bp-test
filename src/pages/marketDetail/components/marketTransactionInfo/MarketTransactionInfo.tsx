import { useQuery } from "@tanstack/react-query"
import { getMarketTransactionInfo } from "../../../../services/marketInfoService"
import { Table } from "antd"

interface MarketTransactionInfoProps {
  id: string,
}
export default function MarketTransactionInfo({id}:MarketTransactionInfoProps) {
  const { data, isLoading } = useQuery({
    queryKey: [`market-transaction-info`, id],
    queryFn: () => {
      return getMarketTransactionInfo(id)
    },
    refetchInterval: 3000,
    retry:false
  })
  const firstTenOrders = data?.orders ?? []
  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Match Amount",
      dataIndex: "match_amount",
      key: "match_amount",
    },
  ];
  return (
    <Table
        loading={isLoading}
        dataSource={firstTenOrders}
        columns={columns}
      />
  )
}
