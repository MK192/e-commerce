import { StyledCategory } from './ComponentStyles/Category.styled';
import { useCategory } from './DataProvider';
const Category = ({ setShowModal }) => {
  const { category, setCategory } = useCategory();

  return (
    <StyledCategory>
      <div className="overlay">
        <div className="modal">
          <div className="filter-and-close">
            <strong>Filter by category</strong>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              x
            </button>
          </div>
          <div className="category-buttons">
            <button
              onClick={() => {
                setCategory('electronics');
                setShowModal(false);
              }}
            >
              electronics
            </button>
            <button
              onClick={() => {
                setCategory('jewelery');
                setShowModal(false);
              }}
            >
              jewelery
            </button>
            <button
              onClick={() => {
                setCategory("men's clothing");
                setShowModal(false);
              }}
            >
              men&apos;s clothing
            </button>
            <button
              onClick={() => {
                setCategory("women's clothing");
                setShowModal(false);
              }}
            >
              women&apos;s clothing
            </button>
          </div>
        </div>
      </div>
    </StyledCategory>
  );
};

export default Category;
