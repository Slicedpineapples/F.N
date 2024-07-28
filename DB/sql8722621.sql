-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql8.freemysqlhosting.net
-- Generation Time: Jul 28, 2024 at 03:30 PM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql8722621`
--

-- --------------------------------------------------------

--
-- Table structure for table `About`
--

CREATE TABLE `About` (
  `About_ID` bigint(20) UNSIGNED NOT NULL,
  `About_Year` date NOT NULL,
  `About_Title` varchar(255) NOT NULL,
  `About_Description` text NOT NULL,
  `About_Image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Partners`
--

CREATE TABLE `Partners` (
  `Partner_ID` bigint(20) UNSIGNED NOT NULL,
  `Partner_Image` varchar(255) NOT NULL,
  `Partner_Name` varchar(255) NOT NULL,
  `Partner_Role` varchar(255) NOT NULL,
  `Partner_Social1` varchar(255) NOT NULL,
  `Partner_Social2` bigint(20) NOT NULL,
  `Partner_Social3` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Portfolio`
--

CREATE TABLE `Portfolio` (
  `portfolio_ID` bigint(20) UNSIGNED NOT NULL,
  `Portfolio_Image` varchar(255) NOT NULL,
  `Portfolio_Short_Description` varchar(255) NOT NULL,
  `Portfolio_Long_Description` text NOT NULL,
  `Client` varchar(255) NOT NULL,
  `Category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_ID` bigint(20) UNSIGNED NOT NULL,
  `service_Image` varchar(255) NOT NULL,
  `service_Title` varchar(255) NOT NULL,
  `service_Description` text NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_ID` int(11) NOT NULL,
  `user_Name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `About`
--
ALTER TABLE `About`
  ADD PRIMARY KEY (`About_ID`);

--
-- Indexes for table `Partners`
--
ALTER TABLE `Partners`
  ADD PRIMARY KEY (`Partner_ID`);

--
-- Indexes for table `Portfolio`
--
ALTER TABLE `Portfolio`
  ADD PRIMARY KEY (`portfolio_ID`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_ID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `About`
--
ALTER TABLE `About`
  MODIFY `About_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Partners`
--
ALTER TABLE `Partners`
  MODIFY `Partner_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Portfolio`
--
ALTER TABLE `Portfolio`
  MODIFY `portfolio_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_ID` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
