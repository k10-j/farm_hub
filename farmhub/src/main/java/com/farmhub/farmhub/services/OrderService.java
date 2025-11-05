package com.farmhub.farmhub.services;

import org.springframework.stereotype.Service;
import com.farmhub.farmhub.dto.*;
import com.farmhub.farmhub.enums.OrderStatus;
import com.farmhub.farmhub.enums.PaymentStatus;
import com.farmhub.farmhub.models.Order;
import com.farmhub.farmhub.models.OrderItem;
import com.farmhub.farmhub.models.Produce;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.repositories.OrderRepository;
import com.farmhub.farmhub.repositories.ProduceRepository;
import com.farmhub.farmhub.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map; 
import java.util.UUID; 
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProduceRepository produceRepository;

    @Transactional
    public MakeOrderResponseDto createOrder(MakeOrderDto orderDto, User buyer) {

        User farmer = userRepository.findById(orderDto.getFarmer_id())
                .orElseThrow(() -> new EntityNotFoundException("Farmer not found with ID: " + orderDto.getFarmer_id()));

        Order order = new Order();
        order.setBuyer(buyer);
        order.setFarmer(farmer);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setStatus(OrderStatus.PENDING);

        BigDecimal totalOrderPrice = BigDecimal.ZERO;

        Map<UUID, Integer> mergedItems = new HashMap<>();

        for (OrderItemDto itemDto : orderDto.getItems()) {
            mergedItems.merge(
                itemDto.getProduce_id(), 
                itemDto.getQuantity(),   
                Integer::sum            
            );
        }

        for (Map.Entry<UUID, Integer> entry : mergedItems.entrySet()) {
            
            UUID produceId = entry.getKey();
            Integer totalQuantity = entry.getValue();

            Produce produce = produceRepository.findById(produceId)
                    .orElseThrow(() -> new EntityNotFoundException("Produce not found with ID: " + produceId));

            if (!produce.getFarmer().getId().equals(farmer.getId())) {
                throw new IllegalArgumentException("Produce " + produce.getName() + " does not belong to farmer " + farmer.getName());
            }

            if (totalQuantity <= 0) {
                 throw new IllegalArgumentException("Quantity for " + produce.getName() + " must be greater than 0.");
            }

            if (totalQuantity > produce.getQuantity()) {
                throw new IllegalArgumentException("Cannot order quantity " + totalQuantity + " of " + produce.getName()
                        + ". Only " + produce.getQuantity() + " is available.");
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setProduce(produce);
            orderItem.setQuantity(totalQuantity); 
            orderItem.setPricePerUnit(produce.getPricePerUnit()); 

            order.addOrderItem(orderItem);

            BigDecimal itemTotalPrice = produce.getPricePerUnit().multiply(BigDecimal.valueOf(totalQuantity));
            totalOrderPrice = totalOrderPrice.add(itemTotalPrice);

            double newQuantity = produce.getQuantity() - totalQuantity;
            produce.setQuantity(newQuantity);
            if (newQuantity <= 0) {
                produce.setAvailability(com.farmhub.farmhub.enums.AvailabilityStatus.UNAVAILABLE);
            }
            produceRepository.save(produce);
        }

        order.setTotalPrice(totalOrderPrice);
        Order savedOrder = orderRepository.save(order);

        return convertToResponseDto(savedOrder);
    }

   private MakeOrderResponseDto convertToResponseDto(Order order) {
        MakeOrderResponseDto dto = new MakeOrderResponseDto(); 
        
        dto.setId(order.getId());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setStatus(order.getStatus());
        dto.setPaymentStatus(order.getPaymentStatus());

        UserResponseDto buyerDto = new UserResponseDto();
        buyerDto.setId(order.getBuyer().getId());
        buyerDto.setName(order.getBuyer().getName());
        buyerDto.setEmail(order.getBuyer().getEmail());
        buyerDto.setPhone(order.getBuyer().getPhone());
        dto.setBuyer(buyerDto);

        UserResponseDto farmerDto = new UserResponseDto();
        farmerDto.setId(order.getFarmer().getId());
        farmerDto.setName(order.getFarmer().getName());
        farmerDto.setEmail(order.getFarmer().getEmail());
        farmerDto.setPhone(order.getFarmer().getPhone());
        dto.setFarmer(farmerDto);

        List<OrderItemResponseDto> itemDtos = order.getOrderItems().stream()
                .map(this::convertOrderItemToDto)
                .collect(Collectors.toList());
        dto.setItems(itemDtos);

        return dto;
    }
    
    private OrderItemResponseDto convertOrderItemToDto(OrderItem item) {
        OrderItemResponseDto dto = new OrderItemResponseDto();
        dto.setProduceId(item.getProduce().getId());
        dto.setProduceName(item.getProduce().getName());
        dto.setQuantity(item.getQuantity());
        dto.setPricePerUnit(item.getPricePerUnit());
        return dto;
    }
}