import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import ConsumerRow from "./ConsumerRow";
import { useConsumer } from "./useConsumer";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
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

const ConsumerTable = () => {
  const { isLoading, consumers } = useConsumer();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  // reading the URL data
  const filterValue = searchParams.get("staff") || "all";

  const DEPARTMENTS = {
    HOUSEKEEPING: "housekeeping",
    SECURITY: "security",
  };

  const filteredConsumers = consumers.filter((consumer) => {
    switch (filterValue?.toLowerCase()) {
      case "all":
        return true;
      case DEPARTMENTS.HOUSEKEEPING:
        return consumer.department.toLowerCase() === DEPARTMENTS.HOUSEKEEPING;
      case DEPARTMENTS.SECURITY:
        return consumer.department.toLowerCase() === DEPARTMENTS.SECURITY;
      default:
        return true;
    }
  });
  // SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedConsumers = filteredConsumers.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  //

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div>Stockname</div>
        <div>Name</div>
        <div>Department</div>
        <div>Consumtion</div>
        <div>Description</div>
      </Table.Header>
      <Table.Body
        // data={filteredConsumers}
        data={sortedConsumers}
        render={(consumers) => (
          <ConsumerRow key={consumers.id} consumers={consumers} />
        )}
      />
      <Table.Footer>
        <Pagination count={20} />
      </Table.Footer>
    </Table>
  );
};

export default ConsumerTable;
