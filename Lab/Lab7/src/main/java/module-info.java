module lab7 {
    requires jakarta.persistence;
    requires static lombok;
    requires org.hibernate.orm.core;
    requires java.naming;

    // JavaFX
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.base;
    requires java.sql;

    opens ncp.fptu.entities to javafx.base, org.hibernate.orm.core;
    opens ncp.fptu.controllers to javafx.fxml;

    exports ncp.fptu;
}