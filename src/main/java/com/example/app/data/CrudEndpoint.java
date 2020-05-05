package com.example.app.data;

import java.util.Optional;

public interface CrudEndpoint<T, IDTYPE> {

    public Optional<T> get(IDTYPE id);

    public T update(T entity);

    public void delete(IDTYPE id);

}
