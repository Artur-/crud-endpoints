package com.example.app.data;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public abstract class CrudService<T, ID> {

    protected abstract JpaRepository<T, ID> getRepository();

    public Optional<T> get(ID id) {
        return getRepository().findById(id);
    };

    public T update(T entity) {
        return getRepository().save(entity);
    };

    public void delete(ID id) {
        getRepository().deleteById(id);
    }

    public List<T> list() {
        return getRepository().findAll();
    };

}
