package com.bidbig.items.repository;

import com.bidbig.items.entity.Item;
import com.bidbig.items.entity.ItemInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer>, JpaSpecificationExecutor<Item> {
    Page<Item> findAllByUsername(String username, Pageable pageable);
    ItemInfo findByItemId(int itemId);
}
