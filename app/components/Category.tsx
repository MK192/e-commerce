import { StyledCategory } from './ComponentStyles/Category.styled';
import { useCategory } from './DataProvider';

import Modal from './Modal';
type Props = {
  setShowModalCategory: (showModalCategory: boolean) => void;
  domNode: HTMLElement | Element | DocumentFragment | null;
};
const Category = ({ setShowModalCategory, domNode }: Props) => {
  const { category, setCategory } = useCategory();

  return (
    <Modal
      title="Filter by category"
      setShowModal={setShowModalCategory}
      domNode={domNode}
    >
      <StyledCategory>
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
      </StyledCategory>
    </Modal>
  );
};

export default Category;
