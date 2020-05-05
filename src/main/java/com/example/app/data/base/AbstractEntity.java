package com.example.app.data.base;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class AbstractEntity<ID> {
    private ID id;

    @Id
    @GeneratedValue
    public ID getId() {
        return id;
    }

    public void setId(ID id) {
        this.id = id;
    }

}
