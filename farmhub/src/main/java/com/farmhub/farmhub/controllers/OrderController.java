package com.farmhub.farmhub.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmhub.farmhub.dto.MakeOrderDto;
import com.farmhub.farmhub.dto.MakeOrderResponseDto;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.services.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    
    private OrderService orderService;

   public OrderController(OrderService orderService){
    this.orderService = orderService;
    }
    @PostMapping
    public ResponseEntity<?> makeOrder(@RequestBody MakeOrderDto orderDto,@AuthenticationPrincipal User currentUser){
        try {
            MakeOrderResponseDto saveOrder = orderService.createOrder(orderDto, currentUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                saveOrder
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                "Request Failed"+e.getMessage()
            );
        }
    }
}
