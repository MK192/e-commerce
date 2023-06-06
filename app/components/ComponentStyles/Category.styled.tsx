import styled from 'styled-components';
export const StyledCategory = styled.div`
  .modal {
    width: 61.8rem;
    padding: 10px;
    max-height: 90%;
    overflow: auto;
    width: 618px;
    max-width: 90%;
    min-width: 200px;
    font-size: 1.6rem;
    min-height: 150px;

    background-color: white;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
  .overlay {
    background-color: hsla(0, 0%, 50.2%, 0.7);
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .filter-and-close {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    button {
      border-radius: 50%;
      height: 30px;
      width: 30px;
      border: 2px solid rgba(65, 65, 65, 0.15);
      color: #989898;
      background-color: white;
      cursor: pointer;
    }
  }
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
