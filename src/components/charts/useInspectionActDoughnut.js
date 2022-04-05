import appFuncs from "../../appFuncs";
import makeChartHook from "./useChartData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { INTERVENTION_COLOR, COMMENDATION_COLOR, addAlpha } from ".";

ChartJS.register(ArcElement, Tooltip, Legend);

const useInspectionActDoughnut = makeChartHook(
  appFuncs.getInspectionActStats,
  transformRawData
);

export default useInspectionActDoughnut;

function transformRawData({ interventionCount, commendationCount }) {
  console.log("calleds");
  console.log(interventionCount);
  console.log(commendationCount);
  return {
    labels: ["Intervention", "Commendation"],
    datasets: [
      {
        label: "Inspection Acts",
        data: [interventionCount, commendationCount],
        backgroundColor: [
          addAlpha(INTERVENTION_COLOR),
          addAlpha(COMMENDATION_COLOR),
        ],
        borderColor: [INTERVENTION_COLOR, COMMENDATION_COLOR],
      },
    ],
  };
}
