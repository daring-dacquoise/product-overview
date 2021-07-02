-- ---
-- Globals
-- ---

-- SET SQL_MODE="";
-- SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE if exists products;

CREATE DATABASE products;

USE products;


-- DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `slogan` VARCHAR(1000) NOT NULL,
  `description` VARCHAR(10000) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `default_price` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);


-- DROP TABLE IF EXISTS `features`;

CREATE TABLE `features` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `product_id` INTEGER NOT NULL,
  `feature` VARCHAR(50) DEFAULT NULL,
  `value` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- DROP TABLE IF EXISTS `styles`;

CREATE TABLE `styles` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `product_id` INTEGER NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `sale_price` VARCHAR(10) DEFAULT NULL,
  `original_price` INTEGER DEFAULT NULL,
  `default_style` TINYINT(1),
  PRIMARY KEY (`id`)
);

-- DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `style_id` INTEGER DEFAULT NULL,
  `url` VARCHAR(500) DEFAULT NULL,
  `thumbnail_url` VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- DROP TABLE IF EXISTS `skus`;

CREATE TABLE `skus` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `style_id` INTEGER NOT NULL,
  `size` VARCHAR(20) NOT NULL,
  `quantity` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);


-- DROP TABLE IF EXISTS `related_products`;

CREATE TABLE `related_products` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `current_product_id` INTEGER DEFAULT NULL,
  `related_product_id` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);


LOAD DATA INFILE '/csv/related.csv'
  INTO TABLE related_products
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  ;

LOAD DATA INFILE '/csv/product.csv'
  INTO TABLE products
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  ;

LOAD DATA INFILE '/csv/styles.csv'
  INTO TABLE styles
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  ;

LOAD DATA INFILE '/csv/skus.csv'
  INTO TABLE skus
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  ;

LOAD DATA INFILE '/csv/features.csv'
  INTO TABLE features
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  ;

LOAD DATA INFILE '/csv/photos.csv'
  INTO TABLE photos
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  ;

-- Foreign Keys

-- ALTER TABLE `features` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
-- ALTER TABLE `styles` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
-- ALTER TABLE `photos` ADD FOREIGN KEY (styles_id) REFERENCES `styles` (`id`);
-- ALTER TABLE `skus` ADD FOREIGN KEY (style_id) REFERENCES `styles` (`id`);
-- ALTER TABLE `related_products` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
-- ALTER TABLE `related_products` ADD FOREIGN KEY (related_product_id) REFERENCES `products` (`id`);

-- --
-- -- Add Index
-- ---

-- CREATE INDEX related_product_id_index ON related_products (related_product_id);
-- CREATE INDEX features_product_id_index ON features (product_id);
-- CREATE INDEX styles_product_id_index ON styles (product_id);
-- CREATE INDEX photos_style_id_index ON photos (style_id);
-- CREATE INDEX skus_style_id_index ON skus (style_id);
