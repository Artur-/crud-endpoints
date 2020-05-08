package com.example.app;

import com.example.app.data.entity.Person;
import com.example.app.data.service.PersonRepository;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * A sample Vaadin view class.
 * <p>
 * To implement a Vaadin view just extend any Vaadin component and use @Route
 * annotation to announce it in a URL as a Spring managed bean.
 * <p>
 * A new instance of this class is created for every new user and every browser
 * tab/window.
 * <p>
 * The main view contains a text field for getting the user name and a button
 * that shows a greeting message in a notification.
 */
@Route("main")
@CssImport("./styles/shared-styles.css")
@CssImport(value = "./styles/vaadin-text-field-styles.css", themeFor = "vaadin-text-field")
public class MainView extends VerticalLayout {

    public MainView(@Autowired PersonRepository repo) {
        Person person = new Person();
        person.setFirstName("John");
        person.setLastName("Doe");
        person.setAge(45);
        repo.save(person);
        person = new Person();
        person.setFirstName("Jane");
        person.setLastName("Moe");
        person.setAge(19);
        repo.save(person);
    }

}
