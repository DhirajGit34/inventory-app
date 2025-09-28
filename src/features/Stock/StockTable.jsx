import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { getStocks } from "../../services/getStocks";
import StockRow from "./StockRow";
import Table from "../../ui/Table";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 3rem;
  align-items: center;
  /* justify-items: center; */

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const StockTable = () => {
  const {
    isLoading,
    data: stock,
    error,
  } = useQuery({
    queryKey: ["stock"],
    queryFn: getStocks,
  });
  if (isLoading) return <Spinner />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row">
        <div>Photo</div>
        <div>Stockname</div>
        <div>Quantity</div>
        <div>Unit</div>
        <div>Location</div>
        <div>Reorder level</div>
      </Table.Header>
      <Table.Body
        data={stock}
        render={(stock) => <StockRow key={stock.id} stock={stock} />}
      />
    </Table>
  );
};

export default StockTable;
