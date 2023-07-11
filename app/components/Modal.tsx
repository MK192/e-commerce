import { createPortal } from 'react-dom';
import { StyledModal } from './ComponentStyles/Modal.styled';
type Props = {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  title: string;
  setShowModal: (showModal: boolean) => void;
  customPortal: boolean;
};
const Modal = ({ children, title, setShowModal, customPortal }: Props) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent event propagation to the background
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  return createPortal(
    <StyledModal>
      <div className="overlay" onClick={handleModalClose}>
        <div className="modal-content" onClick={handleModalClick}>
          <div className="modal">
            <div className="title-and-close">
              <strong>{title}</strong>
              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                x
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </StyledModal>,
    customPortal === true ? document.getElementById('portal')! : document.body
  );
};

export default Modal;
