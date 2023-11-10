import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { StyledModal } from './ComponentStyles/Modal.styled';
type Props = {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  title: string;
  setShowModal: (showModal: boolean) => void;
  domNode?: HTMLElement | Element | DocumentFragment | null;
};
const Modal = ({
  children,
  title,
  setShowModal,
  domNode = document.body,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  let checkOutsideClick = (event: MouseEvent) => {
    if (ref.current === event.target) {
      setShowModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', checkOutsideClick);
    return () => {
      document.removeEventListener('click', checkOutsideClick);
    };
  }, []);

  return createPortal(
    <StyledModal>
      <div className="overlay" ref={ref}>
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
    domNode ? domNode : document.body
  );
};

export default Modal;
