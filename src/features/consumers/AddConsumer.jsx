import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateConsumerForm from "./CreateConsumerForm";

const AddConsumer = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-consumer">
          <Button>Add Consumer</Button>
        </Modal.Open>
        <Modal.Window name="add-consumer">
          <CreateConsumerForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddConsumer;
