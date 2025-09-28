import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditConsumer } from "../../services/apiConsumers";
import toast from "react-hot-toast";

export const useCreateConsumer = () => {
  const queryClient = useQueryClient();

  const { mutate: createConsumer, isPending: isCreating } = useMutation({
    mutationFn: createEditConsumer,
    onSuccess: () => {
      toast.success("Consumer created successfully");
      queryClient.invalidateQueries({ queryKey: ["consumers"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createConsumer, isCreating };
};
