import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateConsumer } from "./useCreateConsumer";
import { useConsumerUpdate } from "./useConsumerUpdate";

const CreateConsumerForm = ({ consumerToEdit = {}, onCloseModal }) => {
  const { id: editId, ...editValues } = consumerToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { createConsumer, isCreating } = useCreateConsumer();
  const { updateConsumer, isUpdating } = useConsumerUpdate();
  const isWorking = isCreating || isUpdating;

  const onSubmit = (data) => {
    if (isEditSession)
      updateConsumer(
        { newConsumerData: { ...data }, id: editId },
        { onSuccess: () => onCloseModal?.() }
      );
    else
      createConsumer(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Stock name" error={errors?.stockName?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="stockName"
          {...register("stockName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Department" error={errors?.department?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="department"
          {...register("department", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Consumtion" error={errors?.consumtionQuantity?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="consumtionQuantity"
          // defaultValue={0}
          {...register("consumtionQuantity", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="text"
          dispabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "Edit consumer" : "Add consumer"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateConsumerForm;
