CREATE DATABASE IF NOT EXISTS burgers_db;

use burgers_db;

CREATE TABLE IF NOT EXISTS burgers(
	id INTEGER AUTO_INCREMENT NOT NULL,
    burger_name VARCHAR(80) NOT NULL,
    devoured BOOL DEFAULT FALSE,
    date TIMESTAMP,
    primary key(id)
);
    
    