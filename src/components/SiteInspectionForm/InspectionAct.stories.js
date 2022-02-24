import InspectionAct from "./InspectionAct";

export default {
  title: "Components/InspectionAct",
  component: InspectionAct,
};

const Template = (args) => <InspectionAct {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  actType: "commendation",
};
