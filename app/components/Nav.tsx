import { StyledNav } from './ComponentStyles/Nav.styled';
import Image from 'next/image';
const Nav = () => {
  return (
    <StyledNav>
      <strong>STORE</strong>
      <Image
        src="/trolley.png"
        height={40}
        width={45}
        alt="green shopping cart"
      />
    </StyledNav>
  );
};
export default Nav;
