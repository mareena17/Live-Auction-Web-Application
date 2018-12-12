package com.bidbig.items.controller;

import com.bidbig.items.dto.ItemDto;
import com.bidbig.items.dto.ItemImageDto;
import com.bidbig.items.dto.User;
import com.bidbig.items.entity.Item;
import com.bidbig.items.entity.ItemInfo;
import com.bidbig.items.payload.UploadImageResponse;
import com.bidbig.items.service.CustomMultipartFile;
import com.bidbig.items.service.ImageStorageService;
import com.bidbig.items.service.ItemService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Date;

@RestController
public class ItemController {
    @Autowired
    ImageStorageService imageStorageService;
    @Autowired
    ItemService itemService;
    @Autowired
    ObjectMapper objectMapper;

    @Transactional
    @RequestMapping(value = "/item", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> create(@RequestBody @Valid ItemImageDto itemDto) {
        byte[] imageBytes = null;
        try {
            imageBytes = Base64.getDecoder().decode(itemDto.getImage().split(",")[1].getBytes("UTF-8"));

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String base64String = itemDto.getImage();
        String extension = base64String.substring(base64String.indexOf("/")+1, base64String.indexOf(";"));
        String fileName = new Date().getTime() + "_" + itemDto.getItem().getUsername() + "." + extension;
        CustomMultipartFile image = new CustomMultipartFile(imageBytes, fileName);
        String fileNameOnServer = imageStorageService.storeImage(image);
        String imageDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadImage/")
                .path(fileName)
                .toUriString();

        itemService.createItem(itemDto.getItem(), fileNameOnServer);

        UploadImageResponse imageResponse = new UploadImageResponse(fileNameOnServer, imageDownloadUri, image.getContentType(), image.getSize());
        return ResponseEntity.ok(imageResponse);
    }

    @Transactional
    @RequestMapping(value = "/item/{itemId}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> update(@PathVariable("itemId") String itemId, @RequestBody @Valid ItemDto itemDto,
                                    @RequestParam(value = "image", required = false) MultipartFile image) {
        if(!ObjectUtils.isEmpty(image)) {
            String fileName = imageStorageService.storeImage(image);
            String imageDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/downloadImage/")
                    .path(fileName)
                    .toUriString();
            itemService.updateItem(Integer.parseInt(itemId), itemDto, fileName);

            UploadImageResponse imageResponse = new UploadImageResponse(fileName, imageDownloadUri, image.getContentType(), image.getSize());
        } else {
            itemService.updateItem(Integer.parseInt(itemId), itemDto, null);
        }
        return ResponseEntity.ok().build();
    }

    @Transactional
    @RequestMapping(value = "/item/{itemId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable("itemId") String itemId) throws JsonProcessingException {
        if(itemService.deleteItem(Integer.parseInt(itemId))) {
            return ResponseEntity.noContent().build();
        } else {
            String message = String.format("Item (ItemId: %s) cannot be deleted because the status for this item is Auctioned.", itemId);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(objectMapper.writeValueAsString(message));
        }
    }


    @RequestMapping(value = "/item/{itemId}", method = RequestMethod.GET)
    public ResponseEntity<?> getById(@PathVariable("itemId") String itemId) {
        ItemInfo item = itemService.getItemById(Integer.parseInt(itemId));
        return ResponseEntity.ok(item);
    }

    @Transactional
    @RequestMapping(value = "/item/status/{itemId}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateStatus(@PathVariable("itemId") String itemId) {
        itemService.updateStatus(Integer.parseInt(itemId));
        return ResponseEntity.ok().build();
    }

    // @Transactional
    @RequestMapping(value = "/page/{username}", method = RequestMethod.GET)
    public ResponseEntity<?> getAllItems(@PathVariable("username") String username, Pageable pageable) {
        Page<Item> results = itemService.getPageOfItems(username, pageable);
        return ResponseEntity.ok(results);
    }

    @RequestMapping(value = "/downloadImage/{fileName:.+}", method = RequestMethod.GET)
    public ResponseEntity<?> downloadImage(@PathVariable String fileName, HttpServletRequest request) {
        // Load image as resource
        Resource resource = imageStorageService.loadImageAsResource(fileName);

        // Determine image's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            System.out.println("Could not determine file type");
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
