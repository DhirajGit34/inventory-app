import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteConsumers as deleteConsumersApi } from "../../services/apiConsumers";
import toast from "react-hot-toast";

export const useDeleteConsumer = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteConsumer } = useMutation({
    mutationFn: deleteConsumersApi,
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["consumers"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteConsumer };
};
