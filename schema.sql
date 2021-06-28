-- ---
-- Globals
-- ---

-- SET SQL_MODE="";
-- SET FOREIGN_KEY_CHECKS=0;



-- DROP DATABASE if exists products;

-- CREATE DATABASE products;

-- USE products;

-- ---
-- Table 'products'
-- ---

-- DROP TABLE IF EXISTS `products`;

-- CREATE TABLE `products` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(50) NOT NULL,
--   `slogan` VARCHAR(1000) NOT NULL,
--   `description` VARCHAR(10000) NOT NULL,
--   `category` VARCHAR(50) NOT NULL,
--   `default_price` INTEGER NOT NULL,
--   PRIMARY KEY (`id`)
-- );

-- ---
-- Table 'features'
-- ---

-- DROP TABLE IF EXISTS `features`;

-- CREATE TABLE `features` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `product_id` INTEGER NOT NULL,
--   `feature` VARCHAR(50) DEFAULT NULL,
--   `value` VARCHAR(50) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );

-- ---
-- Table 'styles'
-- ---

-- DROP TABLE IF EXISTS `styles`;

-- CREATE TABLE `styles` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `product_id` INTEGER NOT NULL,
--   `name` VARCHAR(50) NOT NULL,
--   `sale_price` VARCHAR(10) DEFAULT NULL,
--   `original_price` INTEGER DEFAULT NULL,
--   `default_style` TINYINT(1),
--   PRIMARY KEY (`id`)
-- );

-- ---
-- Table 'photos'
-- ---

-- DROP TABLE IF EXISTS `photos`;

-- CREATE TABLE `photos` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `style_id` INTEGER DEFAULT NULL,
--   `url` VARCHAR(500) DEFAULT NULL,
--   `thumbnail_url` VARCHAR(500) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );

-- ---
-- Table 'skus'
-- ---

-- DROP TABLE IF EXISTS `skus`;

-- CREATE TABLE `skus` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `style_id` INTEGER NOT NULL,
--   `size` VARCHAR(20) NOT NULL,
--   `quantity` INTEGER NOT NULL,
--   PRIMARY KEY (`id`)
-- );


-- ---
-- Table 'related_products'
-- ---

-- DROP TABLE IF EXISTS `related_products`;

-- CREATE TABLE `related_products` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `current_product_id` INTEGER DEFAULT NULL,
--   `related_product_id` INTEGER DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );


-- --
-- Foreign Keys
-- ---

-- ALTER TABLE `features` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
-- ALTER TABLE `styles` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
-- ALTER TABLE `photos` ADD FOREIGN KEY (styles_id) REFERENCES `styles` (`id`);
-- ALTER TABLE `skus` ADD FOREIGN KEY (style_id) REFERENCES `styles` (`id`);
-- ALTER TABLE `related_products` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
-- ALTER TABLE `related_products` ADD FOREIGN KEY (related_product_id) REFERENCES `products` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `styles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `skus` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `style_skus` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `related_products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- CREATE INDEX related_product_id_index ON related_products (related_product_id);
