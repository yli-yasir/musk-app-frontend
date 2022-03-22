import Page from "../../components/Page";
import Paper from "../../components/Paper";
import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAsync } from "react-use";
import appFuncs from "../../appFuncs";

export default function InspectionSite(props) {
  const { siteId } = useParams();

  const { value: site } = useAsync(async () => {
    return await appFuncs.getInspectionSiteById(siteId);
  }, [siteId]);

  return (
    <Page width="70%" maxWidth="1000px">
      <Paper>
        {site && (
          <>
            <Heading fontStyle="italic">{site.name}</Heading>
          </>
        )}
      </Paper>
    </Page>
  );
}
