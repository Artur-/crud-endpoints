package com.example.app.data;

import javax.persistence.Entity;

@Entity
public class Person extends AbstractEntity<Integer> {

    private String firstName, lastName;
    private int age;

    public Integer getId() {
        // Workaround for https://github.com/vaadin/flow/issues/8238
        return super.getId();
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

}
