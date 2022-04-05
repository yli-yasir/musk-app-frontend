import { useAsync } from "react-use";
import appFuncs from "../../appFuncs";

export default function useInspectionsSearch(queryString) {
  const { value: inspections, loading } = useAsync(async () => {
    return await appFuncs.getInspections(queryString);
  }, [queryString]);

  return { inspections, isLoading: loading };
}
