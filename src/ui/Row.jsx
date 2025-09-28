import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    (props.type === "vertical" || typeof props.type === "undefined") &&
    css`
      flex-direction: column;
      gap: 1.5rem;
    `} // we can also set default props
`;

// Row.defaultProps = {
//   type: "vertical",
// };

export default Row;
