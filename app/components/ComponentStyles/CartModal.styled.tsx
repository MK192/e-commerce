import styled from 'styled-components';
import { theme } from '../../styles/variables';

export const StyledCartModal = styled.div`
  .empty-cart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-bottom: 15px;
    img {
      filter: grayscale(100%);
      width: 50%;
      max-width: 230px;
      padding-bottom: 10px;
      transform: translate(10%);
    }
  }

  .close-modal {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    border: 2px solid rgba(65, 65, 65, 0.15);
    color: #989898;
    background-color: white;
    cursor: pointer;
  }
  .cart {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cart-item {
    background-color: #f0f0f0;
    display: flex;
    max-width: 57.8rem;
    width: 100%;
    height: 8.5rem;
    margin-bottom: 10px;
    position: relative;
    img {
      margin-top: 10px;
      height: 80%;
      width: 15%;
      object-fit: contain;
      object-position: center;
      margin-left: 5px;
    }
    button {
      border-radius: 50%;
      height: 25px;
      width: 25px;
      border: 1px solid red;
      color: black;
      background-color: hsla(0, 0%, 100%, 0.8);
      cursor: pointer;
      position: absolute;
    }
  }
  .middle-div {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    p {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
  .right-div {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    margin-left: auto;
    max-width: 25%;
    input {
      height: 2.7rem;
      width: 100%;
      text-align: center;
      border-radius: 5px;
      border: 1px solid grey;
    }
    strong {
      font-size: 14px;
    }
  }
  .total {
    border: 1px solid green;
    text-align: center;
    padding: 15px;
    border-radius: 5px;
    max-width: 57.8rem;
    width: 100%;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .clear-button,
  .buy-button {
    width: 9rem;
    height: 3.5rem;
    border-radius: 5px;
    margin-bottom: 10px;
    border: none;
    color: white;
  }
  .buttons-div {
    display: flex;
    gap: 30px;
    .clear-button {
      background-color: #444;
    }
    .buy-button {
      ${theme.greenBg}
    }
  }
`;
