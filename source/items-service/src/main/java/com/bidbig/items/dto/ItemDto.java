package com.bidbig.items.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    @NotBlank
    private String name;
    private String description;
    @NotBlank
    private String username;
    private double minBidPrice;
}
