package com.bidbig.items.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "ITEMS")
public class Item {
    @Id
    @Column(name = "ITEM_ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    @NotBlank
    @Column(name = "NAME", nullable = false, length = 255)
    private String name;

    @Column(name = "DESCRIPTION", nullable = true, length = 255)
    private String description;

    @Column(name = "IMAGE_URL", nullable = false, length = 1000)
    private String imageLocation;

    @Column(name = "MIN_BID_PRICE", nullable = false, columnDefinition = "Numeric(10,2)")
    private double minBidPrice;

    @Column(name = "USERNAME", nullable = false)
    private String username;

    @Column(name = "STATUS", nullable = false, length = 1, columnDefinition = "SMALLINT")
    private short status;

    @Column(name = "CREATED_AT", nullable = false)
    private Date created;

    @Column(name = "MODIFIED_AT", nullable = false)
    private Date modified;

}
