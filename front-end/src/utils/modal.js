export const showModal = (modal, setModal, message, isError, duration) => {
	setModal({...modal, isOpen: true, message: message || "", isError: isError || false});
	setTimeout(() => setModal({isOpen: false, isError: false}), duration || 1400);
};

export const defaultModalState = {isOpen: false, message: "", isError: false};