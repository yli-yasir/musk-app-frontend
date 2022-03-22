import { Heading, Skeleton } from "@chakra-ui/react";
import Paper from "../Paper";

export default function ChartContainer({
  title,
  children,
  chart,
  chartData,
  ...props
}) {
  let Chart = chart;
  return (
    <Skeleton isLoaded={chartData} {...props}>
      <Paper minHeight="500px">
        {chartData && (
          <>
            <Heading size={"md"} fontStyle="italic" my={4}>
              {title}
            </Heading>
            <Chart data={chartData} />
          </>
        )}
      </Paper>
    </Skeleton>
  );
}
