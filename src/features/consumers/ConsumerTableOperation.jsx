import styled from "styled-components";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const ConsumerTableOperation = () => {
  const TableOperations = styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;
  `;
  return (
    <TableOperations>
      <Filter
        filterField="staff"
        options={[
          { value: "all", label: "All" },
          { value: "housekeeping", label: "Housekeeping" },
          { value: "security", label: "Security" },
        ]}
      />
      <SortBy
        options={[
          { value: "fullName-asc", label: "Sort by name (A-Z)" },
          { value: "fullName-desc", label: "Sort by name (Z-A)" },
          {
            value: "consumtionQuantity-asc",
            label: "Sort by consumtion (low first)",
          },
          {
            value: "consumtionQuantity-desc",
            label: "Sort by consumtion (high first)",
          },
        ]}
      />
    </TableOperations>
  );
};

export default ConsumerTableOperation;
