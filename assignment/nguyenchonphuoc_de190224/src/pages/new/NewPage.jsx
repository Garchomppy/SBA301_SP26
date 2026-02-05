// src/features/news/NewsPage.jsx
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  FloatingLabel,
  Breadcrumb,
  Spinner,
  Alert,
} from "react-bootstrap";
import { PlusCircle, Search, ArrowClockwise } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import NewsTable from "../../features/news/components/NewsTable.jsx";
import {
  getActiveNews,
  createNews,
} from "../../features/api/newService/newService.js"; // Import service

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [categories, setCategories] = useState([]); // Nếu cần lấy từ API sau
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    newsTitle: "",
    headline: "",
    newsContent: "",
    newsSource: "",
    categoryId: 1,
    newsStatus: 1,
    tags: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Tải danh sách bài viết active khi component mount
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActiveNews();
      setNewsList(data);
    } catch (err) {
      setError("Không thể tải danh sách tin tức. Vui lòng thử lại sau.");
      toast.error("Lỗi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = newsList.filter((news) =>
    news.newsTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreate = async () => {
    try {
      const newsData = {
        newsTitle: formData.newsTitle,
        headline: formData.headline,
        newsContent: formData.newsContent,
        newsSource: formData.newsSource,
        category: { categoryId: formData.categoryId }, // Backend mong đợi object Category
        newsStatus: formData.newsStatus,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t), // Chuyển string thành mảng tag
      };

      await createNews(newsData);
      toast.success("Tạo bài viết thành công!");
      setShowModal(false);
      resetForm();
      fetchNews(); // Tải lại danh sách
    } catch (err) {
      toast.error(
        "Lỗi khi tạo bài viết: " + (err.response?.data?.message || err.message),
      );
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setFormData({
      newsTitle: "",
      headline: "",
      newsContent: "",
      newsSource: "",
      categoryId: 1,
      newsStatus: 1,
      tags: "",
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Đang tải tin tức...</span>
      </div>
    );
  }

  return (
    <Container fluid className="py-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/dashboard">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>Quản lý Tin tức</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Quản lý Tin tức</h4>
          <div>
            <Button
              variant="light"
              size="sm"
              className="me-2"
              onClick={fetchNews}
            >
              <ArrowClockwise className="me-1" /> Làm mới
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => setShowModal(true)}
            >
              <PlusCircle className="me-2" /> Thêm bài viết mới
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {/* Search */}
          <Row className="mb-4">
            <Col md={6} lg={4}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo tiêu đề bài viết..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Form.Text className="text-muted">
                  <Search className="me-1" /> Tìm thấy {filteredNews.length} bài
                  viết
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {/* Bảng */}
          <div className="table-responsive">
            <NewsTable
              newsList={filteredNews}
              onEdit={(news) => {
                setFormData(news);
                setShowModal(true);
              }}
              onDelete={(newsId) => {
                setDeleteId(newsId);
                setShowConfirm(true);
              }}
              
            />
          </div>
        </Card.Body>
      </Card>

      {/* Modal tạo bài viết */}
      <Modal show={showModal} onHide={resetForm} size="xl" centered scrollable>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold">Tạo bài viết mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <FloatingLabel label="Tiêu đề bài viết" className="mb-3">
                <Form.Control
                  value={formData.newsTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, newsTitle: e.target.value })
                  }
                  placeholder="Nhập tiêu đề bài viết"
                />
              </FloatingLabel>

              <FloatingLabel label="Headline (tóm tắt)" className="mb-3">
                <Form.Control
                  value={formData.headline}
                  onChange={(e) =>
                    setFormData({ ...formData, headline: e.target.value })
                  }
                  placeholder="Câu tóm tắt nổi bật"
                />
              </FloatingLabel>

              <FloatingLabel label="Nguồn tin" className="mb-4">
                <Form.Control
                  value={formData.newsSource}
                  onChange={(e) =>
                    setFormData({ ...formData, newsSource: e.target.value })
                  }
                  placeholder="Ví dụ: Website trường, Báo Tuổi Trẻ..."
                />
              </FloatingLabel>

              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Nội dung bài viết</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={formData.newsContent}
                  onChange={(e) =>
                    setFormData({ ...formData, newsContent: e.target.value })
                  }
                  placeholder="Nhập nội dung chi tiết bài viết..."
                  style={{ resize: "vertical" }}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Card className="border-0 bg-light p-3 mb-3">
                <Card.Title className="small fw-bold mb-3">
                  Thông tin cơ bản
                </Card.Title>

                <Form.Group className="mb-3">
                  <Form.Label>Danh mục</Form.Label>
                  <Form.Select
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryId: Number(e.target.value),
                      })
                    }
                  >
                    {/* Nếu sau này lấy categories từ API thì map ở đây */}
                    <option value={1}>Sự kiện</option>
                    <option value={2}>Thông báo</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tags (phân cách bằng dấu phẩy)</Form.Label>
                  <Form.Control
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="tin tức, sự kiện, fpt, khai giảng"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Trạng thái hiển thị</Form.Label>
                  <Form.Check
                    type="switch"
                    id="news-status"
                    label={
                      formData.newsStatus === 1
                        ? "Hiện bài viết"
                        : "Ẩn bài viết"
                    }
                    checked={formData.newsStatus === 1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newsStatus: e.target.checked ? 1 : 0,
                      })
                    }
                  />
                </Form.Group>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={resetForm}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={handleCreate}
            disabled={!formData.newsTitle.trim()}
          >
            Đăng bài mới
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm xóa (nếu sau này có chức năng xóa từ backend) */}
      <ConfirmDialog
        show={showConfirm}
        title="Xác nhận xóa bài viết"
        message="Bài viết sẽ bị xóa vĩnh viễn. Bạn có chắc chắn muốn tiếp tục?"
        onConfirm={() => {
          // Gọi API delete nếu có
          setShowConfirm(false);
          toast.success("Đã xóa bài viết thành công");
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </Container>
  );
}
