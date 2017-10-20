-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2017 at 01:41 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apparels2`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `parent` varchar(255) NOT NULL,
  `count` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `parent`, `count`) VALUES
(15, 'Men', 'None', 2),
(18, 'TShirt', 'Men', 1),
(26, 'Women', 'None', 1),
(27, 'Saree', 'Women', 1),
(30, 'Panjabi', 'Men', 1),
(31, 'Kids', 'None', 1);

-- --------------------------------------------------------

--
-- Table structure for table `chart`
--

CREATE TABLE `chart` (
  `id` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `pricee` int(11) NOT NULL,
  `sku` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `filter`
--

CREATE TABLE `filter` (
  `id` int(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `parent` varchar(255) NOT NULL,
  `count` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `filter`
--

INSERT INTO `filter` (`id`, `name`, `parent`, `count`) VALUES
(2, 'Size', 'None', 0),
(5, 'Colors', 'None', 0),
(6, 'Red', 'Colors', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `customer` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `pricee` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `sku`, `customer`, `address`, `phone`, `quantity`, `date`, `pricee`, `status`) VALUES
(3, 'ys001', 'asif', 'dhaka', '913823', 1, '17.8.2017', 900, 'Delivered'),
(4, 'rt0030', 'sun', 'dhaka', '2049304', 1, '18.8.2017', 400, 'Pending'),
(5, 'bp001', 'asif', 'mirpur,Dhaka', '9849238423', 1, '18.8.2017', 1000, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `price` int(200) NOT NULL,
  `description` varchar(255) NOT NULL,
  `quantity` int(100) NOT NULL,
  `image1` varchar(255) NOT NULL,
  `category1` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `sku`, `price`, `description`, `quantity`, `image1`, `category1`) VALUES
(36, 'tshirt', 'rt0030', 400, 'Shirt Colour Red', 7, '/image/redTshirt.jpg', 'TShirt'),
(53, 'saree', 'ys001', 900, 'Saree Colour Yellow', 6, '/image/saree.jpg', 'Saree'),
(56, 'kids', 'ks001', 600, 'Dress colour Red', 3, '/image/kidDress.jpg', 'Kids'),
(57, 'panjabi', 'bp001', 1000, 'Panjabi Colour Black', 6, '/image/panjabi.jpeg', 'Panjabi');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(200) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `user_name`, `user_email`, `user_password`, `user_role`) VALUES
(1, 'admin', 'admin@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'admin'),
(2, 'asif', 'a@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'user'),
(3, 'sun', 'sun@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'user'),
(5, 'asdf', 'asdf@gmail.com', 'c69874b898abb180ac71bd99bc16f8fb', 'user'),
(8, 'qwer', 'qwer@gmail.com', '22d7fe8c185003c98f97e5d6ced420c7', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `chart`
--
ALTER TABLE `chart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `filter`
--
ALTER TABLE `filter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`,`sku`),
  ADD UNIQUE KEY `sku` (`sku`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`,`user_name`),
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `chart`
--
ALTER TABLE `chart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `filter`
--
ALTER TABLE `filter`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
