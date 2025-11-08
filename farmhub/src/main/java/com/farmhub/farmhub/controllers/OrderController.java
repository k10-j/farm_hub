package com.farmhub.farmhub.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.farmhub.farmhub.dto.MakeOrderDto;
import com.farmhub.farmhub.dto.MakeOrderResponseDto;
import com.farmhub.farmhub.dto.UpdateOrderStatusDto;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.services.OrderService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @PostMapping
    public ResponseEntity<MakeOrderResponseDto> makeOrder(@RequestBody MakeOrderDto orderDto,
            @AuthenticationPrincipal User currentUser) {
        MakeOrderResponseDto savedOrder = orderService.createOrder(orderDto, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<MakeOrderResponseDto>> getMyOrders(@AuthenticationPrincipal User currentUser) {
        List<MakeOrderResponseDto> orders = orderService.getOrdersForUser(currentUser);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<MakeOrderResponseDto> getOrderById(
            @PathVariable UUID orderId,
            @AuthenticationPrincipal User currentUser) {
        MakeOrderResponseDto order = orderService.getOrderById(orderId, currentUser);
        return ResponseEntity.ok(order);
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<MakeOrderResponseDto> updateOrderStatus(
            @PathVariable UUID orderId,
            @RequestBody UpdateOrderStatusDto statusDto,
            @AuthenticationPrincipal User currentUser) {

        MakeOrderResponseDto updatedOrder = orderService.updateOrderStatus(orderId, statusDto, currentUser);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> cancelOrder(
            @PathVariable UUID orderId,
            @AuthenticationPrincipal User currentUser) {
        orderService.cancelOrder(orderId, currentUser);
        return ResponseEntity.noContent().build();
    }
}