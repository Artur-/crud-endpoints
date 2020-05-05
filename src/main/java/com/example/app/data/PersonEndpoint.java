package com.example.app.data;

import java.util.List;
import java.util.Optional;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class PersonEndpoint extends CrudEndpointWithService<Person, Integer> {

    private PersonService service;

    public PersonEndpoint(@Autowired PersonService service) {
        this.service = service;
    }

    @Override
    protected PersonService getService() {
        return service;
    }

    @Override
    public Optional<Person> get(Integer id) {
        // Workaround because of https://github.com/vaadin/flow/issues/8237
        return super.get(id);
    }

    @Override
    public Person update(Person entity) {
        // Workaround because of https://github.com/vaadin/flow/issues/8237
        return super.update(entity);
    }

    @Override
    public void delete(Integer id) {
        // Workaround because of https://github.com/vaadin/flow/issues/8237
        super.delete(id);
    }

    @Override
    public List<Person> list() {
        // Workaround because of https://github.com/vaadin/flow/issues/8237
        return super.list();
    }
}