import { useAsync } from "react-use";
import appFuncs from "../../appFuncs";

export default function useInspectionsSearch(searchParams) {
  const { value: inspections, loading } = useAsync(async () => {
    const filter = {};
    for (const [key, value] of searchParams.entries()) {
      filter[key] = value;
    }
    return await appFuncs.getInspections(filter);
  }, [searchParams]);

  return { inspections, isLoading: loading };
}
