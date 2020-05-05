package com.example.app.data;

import java.util.List;
import java.util.Optional;

public abstract class CrudEndpointWithService<T, ID> implements CrudEndpoint<T, ID> {

    protected abstract CrudService<T, ID> getService();

    public List<T> list() {
        return getService().list();
    }

    @Override
    public Optional<T> get(ID id) {
        return getService().get(id);
    }

    @Override
    public T update(T entity) {
        return getService().update(entity);
    }

    @Override
    public void delete(ID id) {
        getService().delete(id);
    }

}
