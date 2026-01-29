package  ncp.be.services;

import ncp.be.pojos.Orchids;
import java.util.List;
import java.util.Optional;

public interface IOrchidService {
    // Lấy danh sách toàn bộ Orchids
    public List<Orchids> getAllOrchids();

    // Thêm một Orchids mới
    public Orchids insertOrchids(Orchids Orchids);

    // Cập nhật thông tin Orchids theo ID
    public Orchids updateOrchids(int OrchidsID, Orchids Orchids);

    // Xóa Orchids theo ID
    public void deleteOrchids(int OrchidsID);

    // Tìm kiếm Orchids theo ID
    public Optional<Orchids> getOrchidsByID(int OrchidsID);
}
