-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2021 at 08:02 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `token`, `createdAt`, `updatedAt`) VALUES
(39, 'anksusss@gmail.com', '$2y$10$VSuB8sEl6fQZdYXaP8FPlubdJc5sXFgUzzLosIiYj6jzuuBhAu.IO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua3N1c3NzQGdtYWlsLmNvbSIsImlhdCI6MTYyNzk2NzM5MywiZXhwIjoxNjI3OTc0NTkzfQ.4tF8bkQbtfr06XcLvO1_PVQA2jWS9ngPMjmPq5lfCes', '2021-08-03 05:09:53', '2021-08-03 05:09:53'),
(40, 'anksus7ss@gmail.com', '$2y$10$i/VfB5DRpItTA4sdAFXtJOxrxqOPshFVAKvbskLv8TN810gsupuU.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua3N1czdzc0BnbWFpbC5jb20iLCJpYXQiOjE2Mjc5Njc1MDMsImV4cCI6MTYyNzk3NDcwM30.bPAUkU1lZIFY-YdMYOSK0_AVYvB5k1Wkpfa1BQqWPGw', '2021-08-03 05:11:43', '2021-08-03 05:11:43'),
(41, 'anksus97ss@gmail.com', '$2y$10$lSzB7ukQxe2ZUqkP5b5Ti.uxaShMT159Ir7bi8yNQdg6rOAlltYwm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua3N1czk3c3NAZ21haWwuY29tIiwiaWF0IjoxNjI3OTY3NTgwLCJleHAiOjE2Mjc5NzQ3ODB9.ekAy1vO0xsuxdWL1pyp1NuRYtb8BKAGIqUIZIcRNQbg', '2021-08-03 05:13:00', '2021-08-03 05:13:00'),
(42, 'anksus997ss@gmail.com', '$2y$10$MW1vf4cO3llNSlWoPQ4.jeT8RFQEkSvYajPxE0Mrs8pc9grSZg2V6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua3N1czk5N3NzQGdtYWlsLmNvbSIsImlhdCI6MTYyNzk2NzY0NSwiZXhwIjoxNjI3OTc0ODQ1fQ.HcyIfoHzeyvOAMq9frSiIlNG6lkx3PlCbpQODIfmDKI', '2021-08-03 05:14:05', '2021-08-03 05:14:05'),
(43, 'div@gmail.com', '$2y$10$dwqlYBM3lWS7Vrz6rhiVgO7K/5J59.c4K4pNgeiHdNleQMDt7wgsa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpdkBnbWFpbC5jb20iLCJpYXQiOjE2Mjc5Njg5NjEsImV4cCI6MTYyNzk3NjE2MX0.jZ9b6-G874uqLudC6jJhv8Afefb7LMk8az6LlzHgKFY', '2021-08-03 05:28:05', '2021-08-03 05:36:01'),
(44, 'dims@gmail.com', '$2y$10$1LNKVHnl0RFMtcdCFJ.LXexVR8lbi07hbeoGkmgsPTAv8ygOm9Hfe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbXNAZ21haWwuY29tIiwiaWF0IjoxNjI3OTcwNDQ1LCJleHAiOjE2Mjc5Nzc2NDV9.MYG6Gl_E9MXvlYjvFl3QSnWRWOWKauZN4puvVVMV4vo', '2021-08-03 06:00:30', '2021-08-03 06:00:45');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `zipcode` bigint(11) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `mobile` bigint(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `userId`, `name`, `image`, `phone`, `zipcode`, `lat`, `lng`, `mobile`, `createdAt`, `updatedAt`) VALUES
(7, 41, 'ankush', '', 344462622232, 5445, 0, 0, 0, '2021-08-03 05:13:00', '2021-08-03 05:13:00'),
(8, 42, 'ankush', '', 344462622232, 5445, 0, 0, 0, '2021-08-03 05:14:05', '2021-08-03 05:14:05'),
(9, 43, 'divyanshu', '2e2d6743-9ed1-44f2-9e8a-65600217d2c4.jpg', 5464565456, 71, 0, 0, 53453453, '2021-08-03 05:28:05', '2021-08-03 05:28:05'),
(10, 44, 'dims york', '80dcc5f7-4a59-4f80-a9b8-be512247227d.png', 66456456456, 71, 0, 0, 654645645, '2021-08-03 06:00:30', '2021-08-03 06:00:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
