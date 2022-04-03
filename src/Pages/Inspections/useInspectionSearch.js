import { useAsync } from "react-use";
import appFuncs from "../../appFuncs";

export default function useInspectionsSearch() {
  const { value: inspections } = useAsync(
    async () => await appFuncs.getInspections(),
    []
  );
  return { inspections };
}
