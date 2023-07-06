import { createPortal } from 'react-dom';
import { StyledModal } from './ComponentStyles/Modal.styled';
type Props = {
	children: JSX.Element | JSX.Element[] | React.ReactNode;
	title: string;
	setShowModal: (showModal: boolean) => void;
};

// Good job, just two more things to handle:
// 1. allow modal to be closed by clicking on backdrop (overlay) but make it conditional and true by default
// 2. allow diferent domNodes for portal to be passed, make it so default is document.body

const Modal = ({ children, title, setShowModal }: Props) => {
	return createPortal(
		<StyledModal>
			<div className='overlay'>
				<div className='modal'>
					<div className='title-and-close'>
						<strong>{title}</strong>
						<button className='close-modal' onClick={() => setShowModal(false)}>
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
