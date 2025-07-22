import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { updateModalShow } from 'Slices/Common_Slice/Common_slice';

const ModalComponent = ({
  show, modalSize, modalClassname,
  modalDialogClassName, modalClickOutsideHide,
  modalFullscreen, modalCentered, modalCloseButton,

  showModalHeader, modalHeaderTitleClassname,
  modalHeaderClassname, modalHeader,

  modalBodyClassname, modalBody,
  showModalFooter, modalFooterClassname, modalFooter
}) => {
  const dispatch = useDispatch();

  return (
    <Modal
      show={show}
      size={modalSize}
      backdrop={modalClickOutsideHide ? "" : "static"}
      fullscreen={modalFullscreen}
      centered={modalCentered}
      contentClassName={modalClassname}
      dialogClassName={modalDialogClassName}
      onHide={() => dispatch(updateModalShow())}
    >

      {showModalHeader ?
        <Modal.Header closeButton={modalCloseButton} className={modalHeaderClassname}>
          <Modal.Title className={modalHeaderTitleClassname}>
            {modalHeader}
          </Modal.Title>
        </Modal.Header>
        :
        null}

      <Modal.Body className={modalBodyClassname}>
        {modalBody}
      </Modal.Body>

      {showModalFooter ?
        <Modal.Footer className={modalFooterClassname}>
          {modalFooter}
        </Modal.Footer>
        :
        null}
    </Modal>
  )
}

export default ModalComponent