import styled from 'styled-components';
import { theme } from '../../styles/variables';

interface Active {
  active: boolean;
}
export const StyledNav = styled.nav<Active>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  ${theme.lightGreyBg};
  padding: 0 10px;
  box-shadow: 0 1px 6px 0 rgb(32 33 36/17%);

  .cart {
    position: relative;
  }
  strong {
    font-size: 2.4rem;
  }
  .empty-cart-image {
    height: 40px;
    width: 45px;
    filter: grayscale(100%);
  }
  .cart-image {
    height: 40px;
    width: 45px;
    position: relative;
    z-index: 100;
  }

  .number-of-items {
    position: absolute;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: black;
    position: absolute;
    right: 5px;
    top: 9px;
    height: 20px;
    width: 20px;
    background-color: orange;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .cart-item {
    z-index: 0;
    position: absolute;
    top: 15px;
    right: 25px;
    background-color: orange;
    font-size: 12px;
    font-weight: 700;
    font-style: italic;
    padding: 4px 19px 4px 10px;
    border-radius: 27px 0 0 27px;
    white-space: nowrap;

    transform: ${({ active }) =>
      active ? 'translate(-10%, -5%)' : 'translate(0,0)'};
  }
`;
