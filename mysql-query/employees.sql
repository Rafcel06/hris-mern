-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2024 at 07:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(255) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `middleName` varchar(20) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` decimal(13,0) NOT NULL,
  `emergencyPhoneNumber` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `currentAddress` varchar(255) NOT NULL,
  `permanentAddress` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `firstName`, `middleName`, `lastName`, `email`, `phone`, `emergencyPhoneNumber`, `password`, `currentAddress`, `permanentAddress`) VALUES
(1, 'Rafcel', 'Bello', 'Teberio', 'trafcel@gmail.com', 9928389941, 2147483647, '$2a$10$FEvUQPp6SQV0tT6C6DdxQOtJW7eqs1FhfUENb6i59ek22gZVqXaqO', 'General Trias', 'General Trias'),
(2, 'Super', 'Admin', 'Admin', 'admin@gmail.com', 9928389941, 0, '$2a$10$v3WOxB.6HDfNqegXvTHCMuw22isZj7dqN4Mtd5081md1k7AC9pN4.', '', ''),
(3, 'TestF', 'TestB', 'TestL', 'test1@gmail.com', 9070699334, 0, '$2a$10$kf4wK9NJyI1p737TiTClkukhs8VaVgasodPnggQW279sQZNtQsoze', '', ''),
(4, 'TestF', 'TestB', 'TestL', 'test2@gmail.com', 9928389, 0, '$2a$10$UmXhdfCLfdU5MeSt0M5F7O2WZSc6JX79xzwZ9fPfxZaZSj/ETUzW6', '', ''),
(5, 'TestF', ' TestB', ' TestL', 'test3@gmail.com', 907069, 0, '$2a$10$uWldWAkvBT8IGIlJpaEVxuhk08iCS08oCnwbeeTcozi8AixssmOGW', '', ''),
(6, 'TestF', 'TestB', 'TestL', 'trafcel@gmail.com', 9928389123, 0, '$2a$10$YfDx0blKhpqyjXFhLh7LrepemiliJqxgGrFmHsrNdXbevD.QzQrxS', '', ''),
(7, 'TestF', 'TestB', 'TestL', 'test7@gmail.com', 9070699334, 0, '$2a$10$AoT37d4XZX.aQfS23rG7fe/dOh6FC1BcSblFhlh3Am2t6e02BPOtW', '', ''),
(8, 'TestF', 'TestB', 'TestL', 'test13@gmail.com', 992838, 0, '$2a$10$bL1dFs/iph7WUmd5YYpjQOrqMHGEYVeYwm9fcD3x9a9raxoZDRW/a', '', ''),
(9, 'TestF', 'TestB', 'TestL', 'test1@gmail.com', 9928389123, 0, '$2a$10$MUXLMxWnovmseNjNJLhYbuncmWtQa4gL/TuMX67METqg/z5JWxUQ2', '', ''),
(10, 'TestF', 'TestB', 'TestL', 'test13@gmail.com', 12312312, 0, '$2a$10$.6y9FSyqdC2cmRSLBHNBauJooF3udEhv0Ek71DFN0QdU2wWtpABLe', '', ''),
(171, 'TestF', 'TestB', 'TestL', 'jr.rafcelbello@gmail.com', 9928389, 0, '$2a$10$STh7u4npdCiCCgryjDzmnOR.7REJKSJi9D//PGPOqEzExBb1LDoZ.', '', ''),
(246, 'TestF', 'TestB', 'TestL', 'test13@gmail.com', 9928389, 0, '$2a$10$Gu0sM7iBXsx4RiKGMag.GeAxZpkYVzTc0J2HhhcyEa/3nckqiqkcS', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
