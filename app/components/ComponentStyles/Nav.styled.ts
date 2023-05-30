import styled from 'styled-components';
import { theme } from '../../styles/variables';
export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  ${theme.lightGrey};
  padding: 0 10px;
  box-shadow: 0 1px 6px 0 rgb(32 33 36/17%);
  strong {
    font-size: 2.4rem;
  }
  img {
    height: 40px;
    width: 45px;
  }
`;
