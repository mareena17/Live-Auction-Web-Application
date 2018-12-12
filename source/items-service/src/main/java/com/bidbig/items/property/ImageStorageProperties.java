package com.bidbig.items.property;

import lombok.*;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "file")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ImageStorageProperties {
    private String uploadDir;
}
