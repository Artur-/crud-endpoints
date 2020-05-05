package com.example.app.data.base;

import java.util.List;
import java.util.Optional;

public interface CrudEndpoint<T, IDTYPE> {

    public List<T> list();

    public Optional<T> get(IDTYPE id);

    public T update(T entity);

    public void delete(IDTYPE id);

}
