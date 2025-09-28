import ConsumerTable from "../features/consumers/ConsumerTable";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import AddConsumer from "../features/consumers/AddConsumer";
import ConsumerTableOperation from "../features/consumers/ConsumerTableOperation";

const Consumer = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All consumers</Heading>
        <ConsumerTableOperation />
      </Row>
      <Row>
        <ConsumerTable />
        <AddConsumer />
      </Row>
    </>
  );
};

export default Consumer;
