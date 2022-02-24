import SubSection from "./SubSection";

export default {
  title: "Components/SubSection",
  component: SubSection,
};

const Template = (args) => <SubSection {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: "storybook",
};
