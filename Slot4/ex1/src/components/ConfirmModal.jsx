import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({
  show,
  handleClose,
  body,
  onConfirm,
  title,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {onConfirm && (
            <Button variant="primary" onClick={onConfirm}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
