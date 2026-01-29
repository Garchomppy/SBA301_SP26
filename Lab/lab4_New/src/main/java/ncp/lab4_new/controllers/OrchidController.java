package ncp.lab4_new.controllers;

import ncp.lab4_new.pojos.Orchids;
import ncp.lab4_new.services.IOrchidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/orchids")
public class OrchidController {

    @Autowired
    private IOrchidService iOrchidService;

    // Lấy toàn bộ danh sách hoa lan
    @GetMapping("/")
    public ResponseEntity<List<Orchids>> fetchAll() {
        return ResponseEntity.ok(iOrchidService.getAllOrchids());
    }

    // Thêm mới một hoa lan (Trả về 201 Created)
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public Orchids saveOrchid(@RequestBody Orchids orchid) {
        return iOrchidService.insertOrchids(orchid);
    }

    // Cập nhật thông tin hoa lan theo ID
    @PutMapping("/{id}")
    public ResponseEntity<Orchids> updateOrchid(@PathVariable int id, @RequestBody Orchids o) {
        Orchids updatedOrchid = iOrchidService.updateOrchids(id, o);
        if (updatedOrchid != null) {
            return new ResponseEntity<>(updatedOrchid, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Xóa hoa lan theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrchid(@PathVariable int id) {
        try {
            iOrchidService.deleteOrchids(id);
            return new ResponseEntity<>("Deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting orchid", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Tìm kiếm hoa lan cụ thể theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Orchids>> getById(@PathVariable int id) {
        Optional<Orchids> orchid = iOrchidService.getOrchidsByID(id);
        if (orchid.isPresent()) {
            return ResponseEntity.ok(orchid);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}