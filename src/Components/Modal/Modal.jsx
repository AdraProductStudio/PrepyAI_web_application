import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';

const ModalComponent = ({
  componentFrom,
  show,
  modalSize,
  modalClassname,
  modalDialogClassName,
  modalClickOutsideHide,
  modalFullscreen,
  modalCentered,
  modalCloseButton,

  showModalHeader,
  modalHeaderTitleClassname,
  modalHeaderClassname,
  modalHeader,

  modalBodyClassname,
  modalBody,

  showModalFooter,
  modalFooterClassname,
  modalFooter,
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
      onHide={() => dispatch(updateModalShow({ show: false, size: null, modal_from: null, modal_type: null, modal_close_btn: false }))}
    >

      {/* Header */}
      {
        showModalHeader ? <Modal.Header closeButton={modalCloseButton} className={modalHeaderClassname}>
          <Modal.Title className={modalHeaderTitleClassname}>
            {modalHeader}
          </Modal.Title>
        </Modal.Header>
          :
          null
      }



      {/* Body */}
      <Modal.Body className={modalBodyClassname}>
        {modalBody}
      </Modal.Body>


      {/* Footer */}
      {
        showModalFooter ? <Modal.Footer className={modalFooterClassname}>
          {modalFooter}
        </Modal.Footer>
          :
          null
      }


    </Modal>
  )
}

export default ModalComponent