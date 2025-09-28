import Row from "../ui/Row";
import Heading from "../ui/Heading";
import StockTable from "../features/Stock/StockTable";

const Stock = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All consumers</Heading>
        <p>filter/sort</p>
      </Row>
      <Row>
        <StockTable />
      </Row>
    </>
  );
};

export default Stock;
