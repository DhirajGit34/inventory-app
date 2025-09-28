import styled from "styled-components";
import CreateConsumerForm from "./CreateConsumerForm";
import { useDeleteConsumer } from "./useDeleteConsumer";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateConsumer } from "./useCreateConsumer";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 4rem;
//   align-items: center;
//   /* justify-items: center; */
//   padding: 1.6rem 2.8rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;

const Stock = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ConsumerRow = ({ consumers }) => {
  const { deleteConsumer, isDeleting } = useDeleteConsumer();
  const { createConsumer, isCreating } = useCreateConsumer();

  const {
    id: consumerId,
    stockName,
    fullName,
    department,
    consumtionQuantity,
    description,
  } = consumers;

  const handleDuplicate = () => {
    createConsumer({
      stockName: `${stockName} (copy)`,
      fullName,
      department,
      consumtionQuantity,
      description,
    });
  };

  return (
    <Table.Row>
      <Stock>{stockName}</Stock>
      <div>{fullName}</div>
      <div>{department}</div>
      <Price>{consumtionQuantity}</Price>
      <div>{description}</div>
      <div>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={consumerId} />

              <Menus.List id={consumerId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateConsumerForm consumerToEdit={consumers} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="consumer"
                  disabled={isDeleting}
                  onConfirm={() => deleteConsumer(consumerId)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Menus>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default ConsumerRow;
