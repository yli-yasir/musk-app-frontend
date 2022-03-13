import SiteInspectionForm from "./index";

export default {
  title: "Components/SiteInspectionForm",
  component: SiteInspectionForm,
};

const Template = (args) => <SiteInspectionForm {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
