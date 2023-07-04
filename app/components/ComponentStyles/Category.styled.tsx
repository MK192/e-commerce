import styled from 'styled-components';
export const StyledCategory = styled.div`
  .category-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    button {
      font-size: 14px;
      background-color: #46940d;
      border: none;
      color: white;
      padding: 5px 7px;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: orange;
    }
  }
`;
