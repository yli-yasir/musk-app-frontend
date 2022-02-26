import React from "react";

import SiteInspectionTable from "./index";

export default {
  title: "components/SiteInspectionTable",
  component: SiteInspectionTable,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <SiteInspectionTable {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  data: new Array(40).fill({
    siteName: "golf center",
    interventionCount: 3,
    commendationCount: 5,
    date: new Date(),
    download: "https://www.google.com",
  }),
};
