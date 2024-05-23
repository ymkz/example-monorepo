-- apps/api/db/schema.sql

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	display_name varchar(40) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
	deleted_at timestamp NULL,
  PRIMARY KEY (id)
);
