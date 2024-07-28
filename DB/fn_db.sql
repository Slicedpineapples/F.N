CREATE TABLE `services`(
    `service_ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `service_Image` VARCHAR(255) NOT NULL,
    `service_Title` VARCHAR(255) NOT NULL,
    `service_Description` TEXT NOT NULL,
    `Date` DATE NOT NULL
);
CREATE TABLE `About`(
    `About_ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `About_Year` DATE NOT NULL,
    `About_Title` VARCHAR(255) NOT NULL,
    `About_Description` TEXT NOT NULL,
    `About_Image` VARCHAR(255) NOT NULL
);
CREATE TABLE `Partners`(
    `Partner_ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Partner_Image` VARCHAR(255) NOT NULL,
    `Partner_Name` VARCHAR(255) NOT NULL,
    `Partner_Role` VARCHAR(255) NOT NULL,
    `Partner_Social1` VARCHAR(255) NOT NULL,
    `Partner_Social2` BIGINT NOT NULL,
    `Partner_Social3` BIGINT NOT NULL
);
CREATE TABLE `Portfolio`(
    `portfolio_ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Portfolio_Image` VARCHAR(255) NOT NULL,
    `Portfolio_Short_Description` VARCHAR(255) NOT NULL,
    `Portfolio_Long_Description` TEXT NOT NULL,
    `Client` VARCHAR(255) NOT NULL,
    `Category` VARCHAR(255) NOT NULL
);