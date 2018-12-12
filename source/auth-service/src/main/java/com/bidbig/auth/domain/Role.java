package com.bidbig.auth.domain;

import javax.persistence.*;


@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "role_id")
    private int id;

    @Column(name = "role")
    private String role;

    public void setRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return this.role;
    }
}