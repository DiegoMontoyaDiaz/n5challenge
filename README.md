

cp n5-elastic-es01-1:/usr/share/elasticsearch/config/certs/ca/ca.crt /tmp/
No usar tildes en los nombres, no incluí la configuración de ES-es en Elastic

Se usa 2 stacks para levantar el proyecto, usar 8GB de ram en Docker
    docker-compose -f docker-compose-generic.yml up
    docker-compose -f docker-compose-elastic.yml up
    docker-compose -f docker-compose-solutions.yml up

El enunciado dice que debe haber 3 servicios, “Request Permission”, “Modify Permission” and “Get Permissions”.
En rest no se estila poner el verbo a los recursos salvo sean operaciones especiales. Bajo el estándar REST
el api quedó de la siguiente manera:
    /api-permissions/v1/
    - POST  -> request permission
    - GET   -> get permissions
    - PATCH -> modify permission

Se añadió un recurso para obtener los tipos de permisos
    /api-permissions/v1/types
    - GET   -> get all permission types

La anotación @Transactional de spring maneja todo internamente como un Unit Of Work,
no tuve que implementarlo de cero, aplicando el principio DRY (Dont Repeat Yoursel) 
SIEMPRE Y CUANDO spring maneje las transacciones

Peeero
    -Como tengo la versión 8.7 de Elastic, la librería de spring-data-elastic da errores de conexión, la librería
    de high-level-client de Elastic es para la versión 7 y dado que la v8 de elastic trae configuración de SSL por
    default, opté por hacer una llamada http simple (con el cliente HttpClient de apache) 
    al api de elastic para insertar el documento.
Por último
    - El evento a Kafka debe ser llamado luego del UOW ya que el @Transactional maneja
    lo que son peticiones a base de datos, Kafka es un llamado HTTP y eso no se puede
    mantener en hold hasta hacerle un commit. 
        
usuario "elastic" password "root"

Se está creando el índice por Elastic API usando postman (se adjunta proyecto).

Se usó este tutorial para instalar elastic 
https://www.elastic.co/blog/getting-started-with-the-elastic-stack-and-docker-compose

Se trabajó todo por practicidad en un mismo microservicios, lo ideal es tenerlos separados.
    - La clase de 

La arquitectura hexagonal manifiesta puertos de entrada y de salida para nuestra aplicación, 
se adaptó el CRQS dentro de los puertos de salida ya que vendrían a ser comandos o querys
    - Por practicidad se dejó todo dentro de unla misma API, en un ambiente productivo deberían ser APIS separadas
    - Se usó una misma base de datos por practicidad, en producción deberían ser 2 y aplicar CDC.
    - Se podría implementar una interfaz "Command" y otra "Query" para poner métodos comunes

Se dejó todas las dependencias para dejar el micro listo para instalar en K8S

Se usa el JpaRepository de forma nativa directamente en la interfaz por practicidad
en casos específicos se puede usar una implementación custom.

Se mantienen dos entidades de negocio diferentes "Permission" para Postgre y 
"PermissionDocument" para Elastic, esto permite escalabilidad por si mañana se cambia el índice
y no se afecta directamente a la entidad que ya se guarda en BD ya que es poco probabl que cambie la BD

Las contraseñas están en duro dentro del micro. Lo correcto es inyectarlas por pipeline al momento
de la compilación. Los secretos deben estar almacenados en un Vault y ser tomados únicamente con acceso
al agente del pipeline sea Jenkins, GithubActions, etc.

