import { Modal, Button } from "react-bootstrap";
import { FiAlertCircle, FiCheck } from "react-icons/fi";

export default function ConfirmModal({
  show,
  handleClose,
  body,
  onConfirm,
  title,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      // Tạo hiệu ứng bo góc cho cả Modal bằng contentClassName
      contentClassName="border-0 shadow-lg"
      style={{ borderRadius: "20px" }}
    >
      {/* Header với màu nền nhẹ và bo góc trên */}
      <Modal.Header
        closeButton
        className="border-0 pt-4 px-4"
        style={{
          backgroundColor: "#f8fff9",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <Modal.Title
          className="fw-bold d-flex align-items-center gap-2"
          style={{ color: "#1a4d2e" }}
        >
          <FiAlertCircle className="text-success" size={24} />
          {title}
        </Modal.Title>
      </Modal.Header>

      {/* Body tập trung vào nội dung */}
      <Modal.Body className="px-4 py-4 text-center">
        <p className="fs-5 text-secondary mb-2">{body}</p>
        <small className="text-muted">
          Vui lòng kiểm tra kỹ thông tin trước khi xác nhận.
        </small>
      </Modal.Body>

      {/* Footer chứa các nút bấm hiện đại */}
      <Modal.Footer className="border-0 pb-4 px-4 justify-content-center gap-3">
        <Button
          variant="light"
          onClick={handleClose}
          className="px-4 py-2 fw-semibold text-secondary"
          style={{ borderRadius: "10px", backgroundColor: "#f1f3f5" }}
        >
          Hủy bỏ
        </Button>

        {onConfirm && (
          <Button
            variant="success"
            onClick={onConfirm}
            className="px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
            style={{
              borderRadius: "10px",
              backgroundColor: "#2ecc71",
              border: "none",
            }}
          >
            <FiCheck /> Xác nhận
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
