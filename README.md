# Challenge Adrián Montoya

Por favor tener en cuenta las consideraciones básicas para el correcto funcionamiento de los contenedores. De manera informativa se dejan algunas consideraciones de decisiones que se tomaron por practicidad del proyecto.

### Consideraciones básicas

1) Se usaron 3 stacks para tener separados y ordenados los recursos, en ese orden
    - docker-compose -f docker-compose-generic.yml up
    - docker-compose -f docker-compose-elastic.yml up
    - docker-compose -f docker-compose-solutions.yml up

2) Configurar docker con 8GB de RAM.

### Visualización de data

3) URL de acceso a la aplicación: http://localhost:9900/
   
4) Acceso a Postgres (No funciona SQLServer con Mac M1)
    - Url pgAdmin4: http://localhost:5050/
    - Usuario pgAdmin4: admin@gmail.conm
    - Password pgAdmin4: root

5) Acceso al servidor de Postgre dentro de pgAdmin4 (visualizador)
   - Nombre de conección: N5 Challenge.
   - Hostname: postgres
   - Username: root
   - Password: root
   - DB: n5
  
6) Acceso a Elastic
   - Url: http://localhost:5601/app/home#/
   - Usuario: elastic
   - Password: changeme
   - Índice: permisos

7) Visualización en Kafka (Usar herramienta de su preferencia (Yo uso offset explorer)
   - Hostname: localhost:29092
   - Tópico: permission-operations
  
### Consideraciones generales

Hice algunos apuntes sobre algunos puntos que fui observando para dar mayor claridad por si surgen preguntas revisando el código

8) El enunciado dice que debe haber 3 servicios, “Request Permission”, “Modify Permission” and “Get Permissions”.
En rest no se estila poner el verbo a los recursos salvo sean operaciones especiales. Bajo el estándar REST
el api quedó de la siguiente manera:/api-permissions/v1/
    - POST  -> request permission
    - GET   -> get permissions
    - PATCH -> modify permission

9) Se añadió un recurso para obtener los tipos de permisos /api-permissions/v1/types
    - GET   -> get all permission types

10) Se agregó un api-login para emular la funcionalidad de un autenticador y autorizador, sin embargo, quedó inconclusa

11) La anotación @Transactional de spring maneja todo internamente como un Unit Of Work, no tuve que implementarlo de cero, aplicando el principio DRY (Dont Repeat Yoursel) 
SIEMPRE Y CUANDO spring maneje las transacciones, sin embargo:
    - Como tengo la versión 8.7 de Elastic, la librería de spring-data-elastic da errores de conexión, la librería
    de high-level-client de Elastic es para la versión 7 y dado que la v8 de elastic trae configuración de SSL por
    default, opté por hacer una llamada http simple (con el cliente HttpClient de apache) 
    al api de elastic para insertar el documento.
    - El evento a Kafka debe ser llamado luego del UOW ya que el @Transactional maneja
    lo que son peticiones a base de datos, Kafka es un llamado HTTP y eso no se puede
    mantener en hold hasta hacerle un commit. 
        
12) Se está creando el índice por Elastic API usando postman (se adjunta proyecto).

13) Se usó este tutorial para instalar elastic 
https://www.elastic.co/blog/getting-started-with-the-elastic-stack-and-docker-compose

14) Se trabajó todo por practicidad en un mismo microservicios, lo ideal es tenerlos separados.

15) La arquitectura hexagonal manifiesta puertos de entrada y de salida para nuestra aplicación, 
se adaptó el CRQS dentro de los puertos de salida ya que vendrían a ser comandos o querys
    - Por practicidad se dejó todo dentro de unla misma API, en un ambiente productivo deberían ser APIS separadas
    - Se usó una misma base de datos por practicidad, en producción deberían ser 2 y aplicar CDC.
    - Se podría implementar una interfaz "Command" y otra "Query" para poner métodos comunes

16) Se dejó todas las dependencias para dejar el micro listo para instalar en K8S

17) Se usa el JpaRepository de forma nativa directamente en la interfaz por practicidad
en casos específicos se puede usar una implementación custom.

18) Se mantienen dos entidades de negocio diferentes "Permission" para Postgre y 
"PermissionDocument" para Elastic, esto permite escalabilidad por si mañana se cambia el índice
y no se afecta directamente a la entidad que ya se guarda en BD ya que es poco probabl que cambie la BD

19) Las contraseñas están en duro dentro del micro. Lo correcto es inyectarlas por pipeline al momento
de la compilación. Los secretos deben estar almacenados en un Vault y ser tomados únicamente con acceso
al agente del pipeline sea Jenkins, GithubActions, etc.

20) No llegó a alcanzar el tiempo para hacer las pruebas unitarias del backend

