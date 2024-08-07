import { useQuery } from "@tanstack/react-query";
import { ingredientsService } from "../../../../../app/services/ingredientsService";

export function useIngredientsController() {
  const { data = [] } = useQuery({
    queryKey: ['ingredients'],
    queryFn: ingredientsService.getAll,
  });

  return {
    data,
  };
}
