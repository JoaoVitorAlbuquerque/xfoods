import { useQuery } from "@tanstack/react-query";
import { historyService } from "../../../app/services/historyService";

export function useHistoryController() {
  const { data = [], isFetching } = useQuery({
    queryKey: ['history'],
    queryFn: historyService.getAll,
  });

  // const hasHistory = data.map((order) => order.isHistory);

  return {
    data,
    isFetching,
  };
}
