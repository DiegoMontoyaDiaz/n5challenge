CREATE USER n5 WITH PASSWORD 'n5' CREATEDB;
CREATE DATABASE n5
    WITH 
    OWNER = n5
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\c n5

CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    nombreEmpleado TEXT NOT NULL,
    apellidoEmpleado TEXT NOT NULL ,
    tipoPermiso INTEGER NOT NULL,
    fechapermiso TIMESTAMP WITH TIME ZONE NOT NULL  
);

COMMENT ON TABLE permissions is 'Table to save permission registries';
COMMENT ON COLUMN permissions.id is 'Unique ID';
COMMENT ON COLUMN permissions.nombreEmpleado is 'Employee Forename';
COMMENT ON COLUMN permissions.apellidoEmpleado is 'Employee Surname';
COMMENT ON COLUMN permissions.tipoPermiso is 'Permission Type';
COMMENT ON COLUMN permissions.fechaPermiso is 'Permission Granted';

CREATE TABLE permission_type (
    id SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL    
);

COMMENT ON TABLE permission_type is 'Table to handle permissions types';
COMMENT ON COLUMN permission_type.id is 'Unique ID';
COMMENT ON COLUMN permission_type.id is 'Permission Description';

INSERT INTO public.permission_type(id, descripcion) VALUES (1, 'Read');
INSERT INTO public.permission_type(id, descripcion) VALUES (2, 'Write');
INSERT INTO public.permission_type(id, descripcion) VALUES (3, 'Delete');
INSERT INTO public.permission_type(id, descripcion) VALUES (4, 'Update');


ALTER TABLE permissions
ADD CONSTRAINT fk_tipoPermiso
FOREIGN KEY (tipoPermiso) REFERENCES permission_type(id);

GRANT ALL PRIVILEGES ON TABLE permissions TO n5;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO n5;
GRANT USAGE, SELECT ON SEQUENCE permissions_id_seq TO n5;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO n5;

