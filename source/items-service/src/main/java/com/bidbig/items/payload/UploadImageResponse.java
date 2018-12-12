package com.bidbig.items.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UploadImageResponse {
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long size;
}
