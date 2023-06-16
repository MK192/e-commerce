import { StyledCategory } from './ComponentStyles/Category.styled';
import { useCategory } from './DataProvider';

type Props = {
  setShowModalCategory: (showModalCategory: boolean) => void;
};
const Category = ({ setShowModalCategory }: Props) => {
  const { category, setCategory } = useCategory();

  return (
    <StyledCategory>
      <div className="overlay">
        <div className="modal">
          <div className="filter-and-close">
            <strong>Filter by category</strong>
            <button
              className="close-modal"
              onClick={() => setShowModalCategory(false)}
            >
              x
            </button>
          </div>
          <div className="category-buttons">
            <button
              onClick={() => {
                setCategory('electronics');
                setShowModalCategory(false);
              }}
            >
              electronics
            </button>
            <button
              onClick={() => {
                setCategory('jewelery');
                setShowModalCategory(false);
              }}
            >
              jewelery
            </button>
            <button
              onClick={() => {
                setCategory("men's clothing");
                setShowModalCategory(false);
              }}
            >
              men&apos;s clothing
            </button>
            <button
              onClick={() => {
                setCategory("women's clothing");
                setShowModalCategory(false);
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
