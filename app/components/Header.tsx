import { StyledHeader } from './ComponentStyles/Header.styled';
import { useCategory } from './DataProvider';

const Header = ({ setSearch, setShowModalCategory }: any) => {
  const { category, setCategory } = useCategory();

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
        <strong>Category:</strong> {category}
        {category ? (
          <button className="selected-category" onClick={() => setCategory('')}>
            clear filter
          </button>
        ) : (
          <button
            className="selected-all"
            onClick={() => setShowModalCategory(true)}
          >
            CHANGE
          </button>
        )}
      </div>
    </StyledHeader>
  );
};
export default Header;
