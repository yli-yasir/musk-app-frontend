import Page from "../../components/Page";
import Paper from "../../components/Paper";
import { Heading, Skeleton } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useAsync } from "react-use";
import appFuncs from "../../appFuncs";
import { Image, Flex, Badge, Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { getNewInspectionPath } from "../../routePaths";
import { useInspectionActDoughnut } from "../../components/charts";
import { Doughnut } from "react-chartjs-2";
import Logo from "../../components/Logo";
export default function InspectionSite(props) {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const { value: site } = useAsync(async () => {
    return await appFuncs.getInspectionSiteById(siteId);
  }, [siteId]);

  const inspectionActChartData = useInspectionActDoughnut(site);

  return (
    <Page width="95%" maxWidth="1000px" pt={8}>
      <Logo mb={8} />
      <Skeleton width="100%" minH="300px" isLoaded={site}>
        <Paper p={4}>
          {site && (
            <>
              <Heading fontStyle="italic" mb={8}>
                {site.name}
              </Heading>
              <Flex
                justifyContent="center"
                alignItems="center"
                width="100%"
                flexWrap="wrap"
                columnGap={4}
                rowGap={4}
                mb={8}
              >
                <Badge colorScheme="purple">
                  Inspections: {site.inspectionCount}
                </Badge>
                <Badge colorScheme="green">
                  Commendations: {site.commendationCount}
                </Badge>
                <Badge colorScheme="yellow">
                  Interventions: {site.interventionCount}
                </Badge>
                <Button
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                  leftIcon={<EditIcon />}
                  onClick={() => navigate(getNewInspectionPath(siteId))}
                >
                  New Inspection
                </Button>
              </Flex>
              <Flex flexWrap="wrap" justifyContent="space-around" width="100%">
                <Image
                  src={site.icon}
                  maxW="300px"
                  bgColor="gray.100"
                  borderRadius="2xl"
                  padding={4}
                ></Image>
                <Flex>
                  {inspectionActChartData && (
                    <Doughnut data={inspectionActChartData} />
                  )}
                </Flex>
              </Flex>
            </>
          )}
        </Paper>
      </Skeleton>
    </Page>
  );
}
