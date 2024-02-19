<p align="center" style="font-size: 35px; font-weight: bold">
API Login
</p>

### Introducción N5


> **Nota** : Se pretende utilizar el API como authorization y authentication server, 
> generando el JWT y a su vez validando el JWT siendo consultado por otras APIs.
> 
> **Estado actual**: Pendiente de solución de bugs para pruebas de integración.



El api login ha sido desarrollada exclusivamente para el challenge de N5 bajo arquitectura hexagonal,
la cual tiene la siguiente representación gráfica:
<p align="center">
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1628328886812/p_4uCQKna.png?auto=compress,format&format=webp" width="400"/>
</p>

A nivel conceptual, se tienen las siguientes definiciones:
- **Puerto**: Definición de una interfaz pública. Define comportamiento de integración
- **Adapter**: Implementación de un puerto para un contexto concreto.
- **Dominio**: Todo lo referente a entidades y lógicas de negocio.


> **Nota** : La arquitectura hexagonal no te define un modelo exacto de carpetas, más si define un conjunto de normas, patrones y reglas, expresadas en capas que se añaden para identificar responsabilidades,
> definir la forma en que se accede a ellas y el flujo que tendrán a lo largo del proyecto.
>
> Esto es una adaptación personalizada.
>
Se definió la siguiente estructura de archivos.

```php
├── Main.java
├── application
│   └── port
│       ├── input
│       │   ├── GeneratedCodeOtpPort.java
│       │   └── ValidateCodeOtpPort.java
│       └── output
│           ├── DbConnectorPort.java
│           ├── EventConnectorPort.java
│           ├── ExternalConfigPort.java
│           └── HttpClientPort.java
├── domain
│   ├── event
│   │     ├── BaseEvent.java
│   │     └── SampleEvent.java
│   ├── model
│   │     ├── GeneratedCodeOtpRequest.java
│   │     ├── GeneratedCodeResponse.java
│   │     └── ValidateCodeOtpResponse.java
│   └── service
│       ├── BusinessUseCase.java
│       └── SampleDomain.java
└── infrastructure
    ├── adapter
    │   ├── input
    │   │   ├── GeneratedCodeOtpAdapter.java
    │   │   └── ValidateCodeOtpAdapter.java
    │   └── output
    │       ├── DbConnectorAdapter.java
    │       ├── EventConnectorAdapter.java
    │       ├── ExternalConfigAdapter.java
    │       └── HttpClientAdapter.java
    └── dto
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
