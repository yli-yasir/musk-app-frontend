import SiteInspectionForm from "../../components/SiteInspectionForm";
import Page from "../../components/Page";

export default function NewInspectionPage() {
  return (
    <Page maxWidth="700px" width="100%" pt={8}>
      <SiteInspectionForm />
    </Page>
  );
}
