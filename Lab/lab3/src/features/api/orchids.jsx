import {
  getOrchids,
  getOrchidById,
  createOrchid,
  updateOrchid,
  deleteOrchid,
} from "../../services/orchid/orchidService";

// Function to save image to assets folder (simulated)
const saveImageToAssets = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // For demo purposes, create a relative path and store in localStorage
      const fileName = `orchid_${Date.now()}_${file.name}`;
      const imagePath = `./assets/${fileName}`;

      // Store the base64 data in localStorage for demo
      localStorage.setItem(`image${fileName}`, reader.result);
      resolve(imagePath);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

// Orchid API functions
export const orchidAPI = {
  // Lấy tất cả orchids
  getAll: getOrchids,

  // Lấy orchid theo ID
  getById: getOrchidById,

  // Tạo orchid mới
  create: async (orchidData) => {
    try {
      let dataToSend = { ...orchidData };

      // Nếu có file ảnh, tạo đường dẫn
      if (orchidData.imageFile) {
        const imagePath = await saveImageToAssets(orchidData.imageFile);
        dataToSend.image = imagePath;
        delete dataToSend.imageFile;
      } else if (!dataToSend.image || dataToSend.image === "") {
        // Nếu không có file ảnh và image trống, đặt ảnh mặc định
        dataToSend.image = "./assets/default.jpg";
      }

      // Đảm bảo price là số
      if (dataToSend.price) {
        dataToSend.price = Number(dataToSend.price);
      }

      const response = await createOrchid(dataToSend);

      // Log để kiểm tra ID được tạo
      console.log("Created orchid with ID:", response.data.id);

      return response;
    } catch (error) {
      console.error("Error creating orchid:", error);
      throw error;
    }
  },

  // Cập nhật orchid
  update: async (id, orchidData) => {
    try {
      let dataToSend = { ...orchidData };

      // Nếu có file ảnh mới, tạo đường dẫn
      if (orchidData.imageFile) {
        const imagePath = await saveImageToAssets(orchidData.imageFile);
        dataToSend.image = imagePath;
        delete dataToSend.imageFile; // Remove file from data
      }

      // Đảm bảo price là số
      if (dataToSend.price) {
        dataToSend.price = Number(dataToSend.price);
      }

      return await updateOrchid(id, dataToSend);
    } catch (error) {
      console.error("Error updating orchid:", error);
      throw error;
    }
  },

  // Xóa orchid
  delete: deleteOrchid,
};
