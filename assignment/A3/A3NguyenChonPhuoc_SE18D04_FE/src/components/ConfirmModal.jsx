import React from "react";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "16px", color: "#333" }}>
          {title || "Xác nhận"}
        </h3>
        <p style={{ color: "#666", marginBottom: "24px", lineHeight: "1.5" }}>
          {message || "Bạn có chắc chắn muốn thực hiện hành động này?"}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              border: "1px solid #ddd",
              background: "#f8f9fa",
              color: "#333",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
              flex: 1,
            }}
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "10px 20px",
              border: "none",
              background: "#dc3545",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
              flex: 1,
            }}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
