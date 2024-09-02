// import { useQuery } from "@tanstack/react-query";
// import { historyService } from "../../../app/services/historyService";

// export function useHistoryController() {
//   const { data = [], isFetching } = useQuery({
//     queryKey: ['history'],
//     queryFn: () => historyService.getAll({
//       month: 8,
//       year: 2024,
//     }),
//   });

//   return {
//     data,
//     isFetching,
//   };
// }
