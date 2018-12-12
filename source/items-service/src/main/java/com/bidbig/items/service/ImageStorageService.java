package com.bidbig.items.service;

import com.bidbig.items.exception.ImageNotFoundException;
import com.bidbig.items.exception.ImageStorageException;
import com.bidbig.items.property.ImageStorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;

@Service
public class ImageStorageService {
    private final Path imageStorageLocation;

    @Autowired
    public ImageStorageService(ImageStorageProperties imageStorageProperties){
        this.imageStorageLocation = Paths.get(imageStorageProperties.getUploadDir()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.imageStorageLocation);
        } catch (Exception ex) {
            throw new ImageStorageException("Failed to create the directory where images would be stored.", ex);
        }
    }

    public String storeImage(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            Path targetLocation = this.imageStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new ImageStorageException("Could not store file " + fileName + ". Please try again.", ex);
        }
    }

    public Resource loadImageAsResource(String fileName) {
        try {
            Path imagePath = this.imageStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(imagePath.toUri());
            if(resource.exists()){
                return resource;
            } else {
                throw new ImageNotFoundException("Image not found " + fileName);
            }

        } catch (MalformedURLException ex) {
            throw new ImageNotFoundException("Error:Image not found " + fileName, ex);
        }
    }
}
