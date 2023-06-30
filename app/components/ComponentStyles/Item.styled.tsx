import styled from 'styled-components';
import { theme } from '../../styles/variables';
export const StyledItem = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 20px 50px;
  max-width: 94rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  .loading {
    animation: rotation 2s infinite linear;
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  img {
    object-fit: contain;
    height: 100%;
    width: auto;
    margin: 0 auto;
    padding: 20px 0;
  }
  figure {
    height: 24.5rem;
    background-color: white;
    flex: 1 0 49%;
    width: 100%;
    justify-content: center;
    display: flex;
    border-radius: 10px;
  }
  .arrow {
    height: 40px;
    width: 40px;
    margin-left: 5px;
    cursor: pointer;
    position: absolute;
    top: 9%;
    left: 7%;
  }
  span {
    display: block;
    ${theme.priceText};
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: 700;
  }
  .number-of-items {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 12px;
    input {
      padding: 5px;
      border-radius: 5px;
      border: 1px solid grey;
      outline: none;
    }
  }
  button {
    color: #fff;
    padding: 10px 5px;
    margin-bottom: 10px;
    min-width: 90px;
    border-radius: 5px;
    border: none;
    ${theme.greenBg};
    cursor: pointer;
  }
  .selected-category {
    padding-top: 9px;
    text-transform: uppercase;
    font-size: 11px;
    margin-bottom: 9px;
    font-style: italic;
  }
  .selected-description {
    font-size: 1.2rem;
  }
  strong {
    font-size: 1.6rem;
    margin-bottom: 10px;
    display: block;
  }
  @media (max-width: 750px) {
    max-width: 42rem;

    flex-direction: column;
    gap: 10px;

    img {
      width: 150px;
    }
    .arrow {
      top: 6%;
      left: 13%;
    }
  }
`;
