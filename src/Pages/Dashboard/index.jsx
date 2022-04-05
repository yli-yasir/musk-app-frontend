import Page from "../../components/Page";
import GeoMap from "../../components/GeoMap";
import Logo from "../../components/Logo";
import {
  Divider,
  Heading,
  Box,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Menu,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Doughnut, Line } from "react-chartjs-2";
import {
  useInspectionActDoughnut,
  useInspectionLines,
} from "../../components/charts";
import ChartContainer from "../../components/charts/ChartContainer";
import routePaths from "../../routePaths";
import { Link } from "react-router-dom";
export default function DashboardPage() {
  const inspectionActDoughnutData = useInspectionActDoughnut();
  const inspectionLinesChartData = useInspectionLines();

  return (
    <Page maxWidth="1000px" paddingTop={8} paddingX={2} width="100%">
      <Logo />
      <Heading mt={6} mb={2}>
        Dashboard
      </Heading>
      <Flex justifyContent="flex-end" w="100%">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to={routePaths.inspections}>
              View Inspections
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

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
        alignSelf="flex-end"
        chart={Doughnut}
        chartData={inspectionActDoughnutData}
      />
    </Page>
  );
}
