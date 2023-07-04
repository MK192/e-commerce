import { createPortal } from 'react-dom';
import { StyledModal } from './ComponentStyles/Modal.styled';
type Props = {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  title: string;
  setShowModal: (showModal: boolean) => void;
};
const Modal = ({ children, title, setShowModal }: Props) => {
  return createPortal(
    <StyledModal>
      <div className="overlay">
        <div className="modal">
          <div className="title-and-close">
            <strong>{title}</strong>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              x
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </StyledModal>,
    document.getElementById('portal')!
  );
};

export default Modal;
