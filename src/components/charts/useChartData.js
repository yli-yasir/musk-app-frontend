import { useAsync } from "react-use";
import { useEffect, useState } from "react";

export default function makeChartHook(fetchRawData, transformRawData) {
  return (prefetchedRawData) => {
    const { value: rawChartData } = useAsync(
      async () => prefetchedRawData || (await fetchRawData()),
      [prefetchedRawData]
    );
    const [chartData, setChartData] = useState();

    useEffect(() => {
      if (rawChartData) {
        setChartData(transformRawData(rawChartData));
      }
    }, [rawChartData]);

    return chartData;
  };
}
