import Page from "../../components/Page";
import GeoMap from "../../components/GeoMap";
import Logo from "../../components/Logo";
import { Divider, Heading, Box } from "@chakra-ui/react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  useInspectionActDoughnut,
  useInspectionLines,
} from "../../components/charts";
import ChartContainer from "../../components/charts/ChartContainer";

export default function DashboardPage() {
  const inspectionActDoughnutData = useInspectionActDoughnut();
  const inspectionLinesChartData = useInspectionLines();

  return (
    <Page maxWidth="1000px" paddingTop={8} paddingX={2} width="100%">
      <Logo />
      <Heading mt={6} mb={2}>
        Dashboard
      </Heading>
      <Divider width="50%" my={4} />
      <GeoMap width="100%" />

      <ChartContainer
        title="This Year's Inspections"
        m={4}
        w="100%"
        chart={Line}
        chartData={inspectionLinesChartData}
      />

      <ChartContainer
        title="Act Types"
        m={2}
        w="100%"
        maxWidth="400px"
        chart={Doughnut}
        chartData={inspectionActDoughnutData}
      />
    </Page>
  );
}
