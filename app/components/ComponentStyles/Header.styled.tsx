import styled from 'styled-components';
import { theme } from '../../styles/variables';
export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
  max-width: 90rem;
  padding: 1.5rem 3rem;
  font-size: 1.6rem;

  input {
    height: 2.7rem;
    width: 18rem;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 5px;
  }
  button {
    padding: 3px 5px;
    border: 1px solid #46940d;
    border-radius: 5px;
    margin-left: 5px;
    font-size: 1.2rem;
  }
`;
