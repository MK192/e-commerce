import { useState } from 'react';
import { StyledHeader } from './ComponentStyles/Header.styled';
const Header = ({ setSearch }: any) => {
  const [category, setCategory] = useState();

  return (
    <StyledHeader>
      <div className="search">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Start searching..."
        />
      </div>
      <div className="category">
        <strong>Category:</strong> All
        {category ? (
          <button className="selected-category">clear</button>
        ) : (
          <button className="selected-all">CHANGE</button>
        )}
      </div>
    </StyledHeader>
  );
};
export default Header;
