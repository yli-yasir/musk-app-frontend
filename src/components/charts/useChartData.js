import { useAsync } from "react-use";
import { useEffect, useState } from "react";

export default function makeChartHook(getRawData, transformRawData) {
  return () => {
    const { value: rawChartData } = useAsync(
      async () => await getRawData(),
      []
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
