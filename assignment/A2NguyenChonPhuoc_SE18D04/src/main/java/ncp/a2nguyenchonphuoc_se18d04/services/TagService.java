package ncp.a2nguyenchonphuoc_se18d04.services;

import ncp.a2nguyenchonphuoc_se18d04.pojos.Tag;
import ncp.a2nguyenchonphuoc_se18d04.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService implements ITagService {
    @Autowired
    private TagRepository tagRepository;

    @Override
    public Tag createTag(Tag tag) {
        if (tagRepository.existsByTagName(tag.getTagName())) {
            throw new RuntimeException("Tag đã tồn tại");
        }
        return tagRepository.save(tag);
    }

    @Override
    public Tag updateTag(Integer id, Tag tag) {
        Tag existing = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tag"));

        if (!existing.getTagName().equals(tag.getTagName()) && tagRepository.existsByTagName(tag.getTagName())) {
            throw new RuntimeException("Tên tag đã tồn tại");
        }

        existing.setTagName(tag.getTagName());
        existing.setNote(tag.getNote());
        return tagRepository.save(existing);
    }

    @Override
    public void deleteTag(Integer id) {
        if (!tagRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy tag");
        }
        tagRepository.deleteById(id);
    }

    @Override
    public Optional<Tag> getTagById(Integer id) {
        return tagRepository.findById(id);
    }

    @Override
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public Optional<Tag> findByName(String name) {
        return tagRepository.findByTagName(name);
    }
}
