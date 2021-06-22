-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'products'
--
-- ---

DROP DATABASE if exists products;
CREATE DATABASE products;

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `slogan` VARCHAR(100) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `default_price` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'features'
--
-- ---

DROP TABLE IF EXISTS `features`;

CREATE TABLE `features` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `feature` VARCHAR(50) NOT NULL,
  `value` VARCHAR(50) NOT NULL,
  `products_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'styles'
--
-- ---

DROP TABLE IF EXISTS `styles`;

CREATE TABLE `styles` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `style_name` VARCHAR(50) NOT NULL,
  `original_price` INTEGER NOT NULL,
  `sale_price` INTEGER NOT NULL,
  `default` TINYINT(1) NOT NULL,
  `products_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `thumbnail` VARCHAR(50) NOT NULL,
  `url` VARCHAR(50) NOT NULL,
  `styles_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE IF EXISTS `skus`;

CREATE TABLE `skus` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `quantity` INTEGER NOT NULL,
  `size` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'style_skus'
--
-- ---

DROP TABLE IF EXISTS `style_skus`;

CREATE TABLE `style_skus` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `styles_id` INTEGER NOT NULL,
  `skus_id` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'related_products'
--
-- ---

DROP TABLE IF EXISTS `related_products`;

CREATE TABLE `related_products` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `products_id` INTEGER NOT NULL,
  `related_product_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `features` ADD FOREIGN KEY (products_id) REFERENCES `products` (`id`);
ALTER TABLE `styles` ADD FOREIGN KEY (products_id) REFERENCES `products` (`id`);
ALTER TABLE `photos` ADD FOREIGN KEY (id_styles) REFERENCES `styles` (`id`);
ALTER TABLE `style_skus` ADD FOREIGN KEY (id_styles) REFERENCES `styles` (`id`);
ALTER TABLE `style_skus` ADD FOREIGN KEY (skus_id) REFERENCES `skus` (`id`);
ALTER TABLE `related_products` ADD FOREIGN KEY (products_id) REFERENCES `products` (`id`);
ALTER TABLE `related_products` ADD FOREIGN KEY (related_product_id) REFERENCES `products` (`id`);

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

-- ---
-- Test Data
-- ---

-- INSERT INTO `products` (`id`,`name`,`slogan`,`description`,`category`,`default_price`) VALUES
-- ('','','','','','');
-- INSERT INTO `features` (`id`,`feature`,`value`,`products_id`) VALUES
-- ('','','','');
-- INSERT INTO `styles` (`id`,`style_name`,`original_price`,`sale_price`,`default`,`products_id`) VALUES
-- ('','','','','','');
-- INSERT INTO `photos` (`id`,`thumbnail`,`url`,`styles_id`) VALUES
-- ('','','','');
-- INSERT INTO `skus` (`id`,`quantity`,`size`) VALUES
-- ('','','');
-- INSERT INTO `style_skus` (`id`,`styles_id`,`skus_id`) VALUES
-- ('','','');
-- INSERT INTO `related_products` (`id`,`products_id`,`related_product_id`) VALUES
-- ('','','');
