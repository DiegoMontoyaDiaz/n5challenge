package com.n5.permission.application.port.output.command;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.n5.permission.domain.model.event.EventTypesEnum;

public interface PermissionEventCommand {
  void publishEvent(EventTypesEnum eventTypesEnum) throws JsonProcessingException;

}
