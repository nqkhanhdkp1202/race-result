-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th6 23, 2023 lúc 10:49 PM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `race_result`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `driver`
--

CREATE TABLE `driver` (
  `driver_id` int(11) NOT NULL,
  `driver_name` varchar(255) NOT NULL,
  `nationaly` varchar(255) NOT NULL,
  `team` varchar(255) NOT NULL,
  `pts` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `races`
--

CREATE TABLE `races` (
  `race_id` int(11) NOT NULL,
  `race_place` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `winner` varchar(255) NOT NULL,
  `team` varchar(255) NOT NULL,
  `laps` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `teams`
--

CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL,
  `team_name` varchar(255) NOT NULL,
  `pts` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `years`
--

CREATE TABLE `years` (
  `year_id` int(11) NOT NULL,
  `year` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`driver_id`);

--
-- Chỉ mục cho bảng `races`
--
ALTER TABLE `races`
  ADD PRIMARY KEY (`race_id`);

--
-- Chỉ mục cho bảng `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`);

--
-- Chỉ mục cho bảng `years`
--
ALTER TABLE `years`
  ADD PRIMARY KEY (`year_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `driver`
--
ALTER TABLE `driver`
  MODIFY `driver_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `races`
--
ALTER TABLE `races`
  MODIFY `race_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `teams`
--
ALTER TABLE `teams`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `years`
--
ALTER TABLE `years`
  MODIFY `year_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
