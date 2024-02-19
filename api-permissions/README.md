<p align="center" style="font-size: 35px; font-weight: bold">
API Permissions
</p>

### Introducción N5

El api permissions ha sido desarrollada exclusivamente para el challenge de N5 bajo arquitectura hexagonal, 
la cual tiene la siguiente representación gráfica:
<p align="center">
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1628328886812/p_4uCQKna.png?auto=compress,format&format=webp" width="400"/>
</p>

A nivel conceptual, se tienen las siguientes definiciones: 
- **Puerto**: Definición de una interfaz pública. Define comportamiento de integración.
- **Adapter**: Implementación de un puerto para un contexto concreto.
- **Dominio**: Todo lo referente a entidades y lógicas de negocio.


> **Nota** : La arquitectura hexagonal no te define un modelo exacto de carpetas, más si define un conjunto de normas, patrones y reglas, expresadas en capas que se añaden para identificar responsabilidades, 
> definir la forma en que se accede a ellas y el flujo que tendrán a lo largo del proyecto. 
> 
> Esto es una adaptación personalizada.
>  
Se definió la siguiente estructura de archivos.

```php
.
├── README.md
├── mvnw
├── mvnw.cmd
├── pom.xml
└── src
    └── main
        ├── java
        │ └── com
        │     └── n5
        │         └── permission
        │             ├── Main.java
        │             ├── application
        │             │ └── port
        │             │     ├── input
        │             │     │ ├── PermissionTypesInputPort.java
        │             │     │ └── PermissionsInputPort.java
        │             │     └── output
        │             │         ├── command
        │             │         │ ├── PermissionDatabaseCommand.java
        │             │         │ ├── PermissionEventCommand.java
        │             │         │ └── PermissionIndexedDocumentsCommand.java
        │             │         └── query
        │             │             ├── PermissionDatabaseQuery.java
        │             │             └── PermissionTypeDatabaseQuery.java
        │             ├── domain
        │             │ ├── model
        │             │ │ ├── database
        │             │ │ │ ├── Permission.java
        │             │ │ │ └── PermissionType.java
        │             │ │ ├── datatransfer
        │             │ │ │ ├── GetPermissionResponse.java
        │             │ │ │ ├── GetPermissionTypesResponse.java
        │             │ │ │ ├── ModifyPermissionRequest.java
        │             │ │ │ ├── PermissionType.java
        │             │ │ │ ├── RequestPermissionRequest.java
        │             │ │ │ └── RequestPermissionResponse.java
        │             │ │ ├── document
        │             │ │ │ └── PermissionDocument.java
        │             │ │ └── event
        │             │ │     ├── EventTypesEnum.java
        │             │ │     └── GenericEvent.java
        │             │ └── usecase
        │             │     ├── CommandUseCase.java
        │             │     └── QueryUseCase.java
        │             └── infrastructure
        │                 ├── adapter
        │                 │ ├── input
        │                 │ │ ├── PermissionTypesInputPortHttpAdapter.java
        │                 │ │ └── PermissionsInputPortHttpAdapter.java
        │                 │ └── output
        │                 │     └── command
        │                 │         ├── PermissionIndexedDocumentsElasticSearchAdapter.java
        │                 │         └── PermissionKafkaAdapter.java
        │                 ├── config
        │                 │ ├── Constants.java
        │                 │ ├── CorsConfig.java
        │                 │ ├── ElasticSearchConfiguration.java
        │                 │ ├── JWTAuthorizationFilter.java
        │                 │ └── WebSecurityConfig.java
        │                 ├── mapper
        │                 │ ├── MapperService.java
        │                 │ └── MapperServiceDozerImpl.java
        │                 └── util
        │                     └── BaseController.java
        └── resources
            ├── application.yml
            ├── banner.txt
            └── bootstrap.yml

```

### Tecnologías usadas

1) SpringBoot v3.0.1
2) PostgreSQL v16.2 
   1) Estuve investigando y haciendo POCs y no hay versión compatible de SQL Server para Mac con ARM64.
   2) PostgreSQL tienen casi las mismas sintaxis core que SQL Server.
   3) Se usa pgadmin4 como GUI para acceder.
3) Confluent Kafka, latest
4) Redis, latest (just in case).


<p align="center">
<img src="https://media.licdn.com/dms/image/C4E0BAQHVHVjKl7jwvA/company-logo_200_200/0/1631361700150/n5now_logo?e=1716422400&v=beta&t=r3hnwapbkKSO6NRHExudZK0jkp27tLa0zQEANWkGSdU" width="100"/>
<br>N5 now
<br>Adrián Montoya
<br> Development Manager Challenge
</p>
