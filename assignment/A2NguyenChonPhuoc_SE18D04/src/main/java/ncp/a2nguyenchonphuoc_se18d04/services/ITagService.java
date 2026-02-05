package ncp.a2nguyenchonphuoc_se18d04.services;

import ncp.a2nguyenchonphuoc_se18d04.pojos.Tag;

import java.util.List;
import java.util.Optional;

public interface ITagService {
    Tag createTag(Tag tag);
    Tag updateTag(Integer id, Tag tag);
    void deleteTag(Integer id);
    Optional<Tag> getTagById(Integer id);
    List<Tag> getAllTags();
    Optional<Tag> findByName(String name);
}
