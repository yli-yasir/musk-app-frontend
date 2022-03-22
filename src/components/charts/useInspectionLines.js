import makeChartHook from "./useChartData";
import appFuncs from "../../appFuncs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  INTERVENTION_COLOR,
  COMMENDATION_COLOR,
  INSPECTION_COLOR,
  addAlpha,
} from ".";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const useInspectionLines = makeChartHook(
  appFuncs.getInspections,
  transformRawData
);

export default useInspectionLines;

function transformRawData(inspections) {
  const inspectionsDataSet = Array(12).fill(0);
  const interventionsDataset = Array(12).fill(0);
  const commendationsDataset = Array(12).fill(0);

  for (const inspection of inspections) {
    const monthIndex = inspection.date.getMonth();
    inspectionsDataSet[monthIndex] += 1;
    interventionsDataset[monthIndex] += inspection.interventionCount;
    commendationsDataset[monthIndex] += inspection.commendationCount;
  }

  return {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Inspections",
        data: inspectionsDataSet,
        borderColor: INSPECTION_COLOR,
        backgroundColor: addAlpha(INSPECTION_COLOR),
      },
      {
        label: "Interventions",
        data: interventionsDataset,
        borderColor: INTERVENTION_COLOR,
        backgroundColor: addAlpha(INTERVENTION_COLOR),
      },
      {
        label: "Commendations",
        data: commendationsDataset,
        borderColor: COMMENDATION_COLOR,
        backgroundColor: addAlpha(COMMENDATION_COLOR),
      },
    ],
  };
}
