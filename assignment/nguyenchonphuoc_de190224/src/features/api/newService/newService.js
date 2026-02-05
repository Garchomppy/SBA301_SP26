// Ví dụ: src/services/newsService.js
import api from "../../../stores/api";

export const getActiveNews = async () => {
  try {
    const response = await api.get("/api/news/active");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy tin active:", error);
    throw error;
  }
};

export const createNews = async (newsData) => {
  try {
    const response = await api.post("/api/news", newsData);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo bài viết:", error.response?.data || error.message);
    throw error;
  }
};

// Nếu cần login (Staff/Admin tạo bài viết)
export const login = async (email, password) => {
  const token = btoa(`${email}:${password}`);
  localStorage.setItem("auth", token);
  try {
    // Test bằng cách gọi API yêu cầu auth
    await api.get("/news"); // Hoặc endpoint test
    toast.success("Đăng nhập thành công!");
    return true;
  } catch (error) {
    localStorage.removeItem("auth");
    toast.error("Đăng nhập thất bại");
    throw error;
  }
};
