import { useQuery } from "@tanstack/react-query";
import { getMarketActivityInfo } from "../../../../services/marketInfoService";
import { Input, Table } from "antd";
import { ChangeEventHandler, useMemo, useState } from "react";
interface MarketActivityInfoProps {
  id: string;
  type: "sell" | "buy";
}
export default function MarketActivityInfo({
  id,
  type,
}: MarketActivityInfoProps) {
  const [totalRemainPercentage, setTotalRemainPercentage] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: [`market-${type}-info`, id],
    queryFn: () => {
      return getMarketActivityInfo(id, type);
    },
    refetchInterval: 3000,
  });
  const columns = [
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Remain",
      dataIndex: "remain",
      key: "remain",
    },
  ];
  const firstTenOrders = data?.orders?.slice(0, 10) ?? [];
  const remainSum = useMemo(() => {
    const summedRemain = firstTenOrders.reduce((pre, acc) => {
      return pre + parseFloat(acc.remain);
    }, 0);
    return summedRemain;
  }, [data]);
  const valueSum = useMemo(() => {
    const summedValue = firstTenOrders.reduce((pre, acc) => {
      return pre + parseFloat(acc.value);
    }, 0);
    return summedValue;
  }, [data]);
  const priceAverage = useMemo(() => {
    const summedRemain = firstTenOrders.reduce((pre, acc) => {
      return pre + parseFloat(acc.price);
    }, 0);
    return summedRemain / firstTenOrders.length;
  }, [data]);
  const weightedMeanPrice = useMemo(() => {
    let sumProduct = 0;
    let sumWeights = 0;

    for (const order of firstTenOrders) {
      const price = parseFloat(order.price);
      const value = parseFloat(order.value);

      if (!isNaN(price) && !isNaN(value)) {
        sumProduct += price * value;
        sumWeights += value;
      }
    }
    if (sumWeights === 0) {
      return null;
    }

    return (sumProduct / sumWeights).toFixed(2);
  }, [data]);
  const onTotalRemainPercentageInputChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const numberReg = /^\d+$/;
    const value = event.target.value;
    if (value === "") {
      setTotalRemainPercentage("");
      return;
    }
    if (numberReg.test(value)) {
      setTotalRemainPercentage(event.target.value);
    }
  };
  const remainValue = (remainSum * parseFloat(totalRemainPercentage)) / 100;

  return (
    <>
      <Table
        loading={isLoading}
        dataSource={firstTenOrders}
        columns={columns}
      />
      {!isLoading ? (
        <>
          <div className="calculation-container">
            <div>RemainSum: {remainSum}</div>
            <div>valueSum: {valueSum}</div>
            <div>price weighted mean: {weightedMeanPrice}</div>
          </div>
          <div>
            <Input
              placeholder="Enter requested percentage of total remain"
              value={totalRemainPercentage}
              onChange={onTotalRemainPercentageInputChange}
            />
            {totalRemainPercentage ? (
              <div>
                <div>remain: {Number.isNaN(remainValue) ? 0 : remainValue}</div>
                <div>Price average: {priceAverage}</div>
                <div>
                  Amount payable by the user: {priceAverage * remainValue}
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
