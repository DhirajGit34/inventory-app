import { useQuery } from "@tanstack/react-query";
import { getConsumers } from "../../services/apiConsumers";

export const useConsumer = () => {
  const {
    isLoading,
    data: consumers,
    error,
  } = useQuery({
    queryKey: ["consumers"],
    queryFn: getConsumers,
  });
  return { isLoading, consumers, error };
};
