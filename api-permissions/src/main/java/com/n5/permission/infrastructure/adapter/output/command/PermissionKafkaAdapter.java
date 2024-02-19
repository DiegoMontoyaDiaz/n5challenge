package com.n5.permission.infrastructure.adapter.output.command;

import com.n5.permission.application.port.output.command.PermissionEventCommand;
import com.n5.permission.domain.model.event.EventTypesEnum;
import com.n5.permission.domain.model.event.GenericEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class PermissionKafkaAdapter implements PermissionEventCommand {

  @Value("${spring.kafka.producer.topic-name}")
  String topicName;
  @Autowired
  private KafkaTemplate<String, String> kafkaTemplate;

  @Override
  public void publishEvent(EventTypesEnum eventTpe) throws JsonProcessingException {
    System.out.println("\nStarting method PermissionKafkaAdapter.publishEvent(EventTypesEnum eventTpe) for type: "+eventTpe.toString());

    GenericEvent genericEvent = new GenericEvent(UUID.randomUUID().toString(), eventTpe.toString());
    String jsonMessage = new ObjectMapper().writeValueAsString(genericEvent);
    kafkaTemplate.send(topicName,jsonMessage);

  }
}
