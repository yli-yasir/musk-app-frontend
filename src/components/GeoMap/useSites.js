import appFuncs from "../../appFuncs";
import { useAsync } from "react-use";

export default function useSites() {
  const { value: sites } = useAsync(async () => {
    try {
      return await appFuncs.getInspectionSites();
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  return sites;
}
