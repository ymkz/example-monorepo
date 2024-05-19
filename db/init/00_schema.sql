-- apps/api/db/schema.sql

CREATE TABLE users (
	id INT AUTO_INCREMENT NOT NULL,
	display_name VARCHAR(40) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL,
	deleted_at TIMESTAMP NULL,
  PRIMARY KEY (id)
);
