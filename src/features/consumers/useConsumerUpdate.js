import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditConsumer } from "../../services/apiConsumers";
import toast from "react-hot-toast";

export const useConsumerUpdate = () => {
  const queryClient = useQueryClient();

  const { mutate: updateConsumer, isPending: isUpdating } = useMutation({
    mutationFn: ({ newConsumerData, id }) =>
      createEditConsumer(newConsumerData, id),
    onSuccess: () => {
      toast.success("Consumer successfully edited");
      queryClient.invalidateQueries({ queryKey: ["consumers"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateConsumer, isUpdating };
};
