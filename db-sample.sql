-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-09-2025 a las 00:28:16
-- Versión del servidor: 10.1.24-MariaDB
-- Versión de PHP: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `productsapi`
--
CREATE DATABASE IF NOT EXISTS `productsapi` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `productsapi`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(4) NOT NULL,
  `name` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `price` decimal(4,0) NOT NULL,
  `stock` int(4) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `stock`, `active`) VALUES
(1, 'iPhone 10', '199', 1, 1),
(2, 'iPhone 11', '299', 2, 1),
(3, 'Samsung Galaxy S3', '249', 5, 1),
(4, 'PlayStation 4', '249', 2, 0),
(5, 'PlayStation 5', '499', 6, 1),
(6, 'Xbox One', '199', 2, 1),
(7, 'Xbox Series S', '299', 7, 1),
(8, 'Motorola G5', '199', 2, 1),
(9, 'Laptop Hp Pavilion 11', '399', 5, 1),
(10, 'Console r36s', '39', 12, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
