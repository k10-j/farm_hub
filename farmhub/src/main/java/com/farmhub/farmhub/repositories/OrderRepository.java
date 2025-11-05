package com.farmhub.farmhub.repositories;

import com.farmhub.farmhub.models.Order;
import com.farmhub.farmhub.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {

    List<Order> findByBuyerOrFarmer(User buyer, User farmer);

    @Query("SELECT DISTINCT o FROM Order o " +
           "JOIN FETCH o.buyer " +
           "JOIN FETCH o.farmer " +
           "LEFT JOIN FETCH o.orderItems oi " + 
           "LEFT JOIN FETCH oi.produce " + 
           "WHERE o.buyer = :user OR o.farmer = :user")
    List<Order> findAllByBuyerOrFarmerWithDetails(@Param("user") User user);

    
    @Query("SELECT DISTINCT o FROM Order o " +
           "JOIN FETCH o.buyer " +
           "JOIN FETCH o.farmer " +
           "LEFT JOIN FETCH o.orderItems oi " + 
           "LEFT JOIN FETCH oi.produce " +
           "WHERE o.id = :orderId")
    Optional<Order> findByIdWithDetails(@Param("orderId") UUID orderId);
    
    Optional<Order> findByIdAndBuyer(UUID orderId, User buyer);
    Optional<Order> findByIdAndFarmer(UUID orderId, User farmer);
}