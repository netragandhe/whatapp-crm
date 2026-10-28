-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Temps de generació: 11-03-2026 a les 12:21:43
-- Versió del servidor: 10.4.32-MariaDB
-- Versió de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `crm_db`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `leadId` int(11) DEFAULT NULL,
  `action` varchar(191) NOT NULL,
  `details` text DEFAULT NULL,
  `timestamp` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `action` varchar(191) NOT NULL,
  `module` varchar(191) DEFAULT NULL,
  `leads` varchar(191) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `status` enum('Success','Failed') NOT NULL DEFAULT 'Success',
  `ip` varchar(191) DEFAULT NULL,
  `device` varchar(191) DEFAULT NULL,
  `timestamp` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `userId`, `action`, `module`, `leads`, `details`, `status`, `ip`, `device`, `timestamp`) VALUES
(38, 10, 'System Login', 'Auth', NULL, 'User logged in', 'Success', '192.168.1.10', 'Chrome / Windows', '2026-03-11 11:02:28.022'),
(39, 11, 'Lead Created', 'Leads', NULL, 'New inbound lead recorded', 'Success', '192.168.1.11', 'Safari / iPhone', '2026-03-11 11:02:28.022'),
(40, 10, 'Lead Updated', 'Leads', NULL, 'Lead stage changed', 'Success', '192.168.1.12', 'Firefox / Mac', '2026-03-11 11:02:28.022'),
(41, 11, 'Channel Created', 'Channels', NULL, 'Protocol provisioned', 'Success', '192.168.1.13', 'Chrome / Windows', '2026-03-11 11:02:28.022'),
(42, 10, 'Routing Rule Added', 'Routing', NULL, 'New distribution logic applied', 'Success', '192.168.1.14', 'Safari / iPhone', '2026-03-11 11:02:28.022'),
(43, 11, 'Password Reset', 'Auth', NULL, 'Credential recovery executed', 'Success', '192.168.1.15', 'Firefox / Mac', '2026-03-11 11:02:28.022'),
(44, 10, 'Lead Reassigned', 'Leads', NULL, 'Ownership transfer complete', 'Success', '192.168.1.16', 'Chrome / Windows', '2026-03-11 11:02:28.022'),
(45, 11, 'System Login', 'Auth', NULL, 'User logged in', 'Success', '192.168.1.17', 'Safari / iPhone', '2026-03-11 11:02:28.022'),
(46, 10, 'Lead Created', 'Leads', NULL, 'New inbound lead recorded', 'Success', '192.168.1.18', 'Firefox / Mac', '2026-03-11 11:02:28.022'),
(47, 11, 'Lead Updated', 'Leads', NULL, 'Lead stage changed', 'Success', '192.168.1.19', 'Chrome / Windows', '2026-03-11 11:02:28.022'),
(48, 10, 'Channel Created', 'Channels', NULL, 'Protocol provisioned', 'Success', '192.168.1.20', 'Safari / iPhone', '2026-03-11 11:02:28.022'),
(49, 11, 'Routing Rule Added', 'Routing', NULL, 'New distribution logic applied', 'Success', '192.168.1.21', 'Firefox / Mac', '2026-03-11 11:02:28.022'),
(50, 10, 'Password Reset', 'Auth', NULL, 'Credential recovery executed', 'Success', '192.168.1.22', 'Chrome / Windows', '2026-03-11 11:02:28.022'),
(51, 11, 'Lead Reassigned', 'Leads', NULL, 'Ownership transfer complete', 'Success', '192.168.1.23', 'Safari / iPhone', '2026-03-11 11:02:28.022'),
(52, 10, 'System Login', 'Auth', NULL, 'User logged in', 'Success', '192.168.1.24', 'Firefox / Mac', '2026-03-11 11:02:28.022'),
(53, 11, 'Lead Created', 'Leads', NULL, 'New inbound lead recorded', 'Success', '192.168.1.25', 'Chrome / Windows', '2026-03-11 11:02:28.022'),
(54, 10, 'Lead Updated', 'Leads', NULL, 'Lead stage changed', 'Success', '192.168.1.26', 'Safari / iPhone', '2026-03-11 11:02:28.022'),
(55, 11, 'Channel Created', 'Channels', NULL, 'Protocol provisioned', 'Success', '192.168.1.27', 'Firefox / Mac', '2026-03-11 11:02:28.022'),
(56, 10, 'Routing Rule Added', 'Routing', NULL, 'New distribution logic applied', 'Success', '192.168.1.28', 'Chrome / Windows', '2026-03-11 11:02:28.022'),
(57, 11, 'Password Reset', 'Auth', NULL, 'Credential recovery executed', 'Success', '192.168.1.29', 'Safari / iPhone', '2026-03-11 11:02:28.022'),
(58, 10, 'Lead Reassigned', 'Leads', NULL, 'Ownership transfer complete', 'Success', '192.168.1.30', 'Firefox / Mac', '2026-03-11 11:02:28.022'),
(59, 11, 'System Login', 'Auth', NULL, 'User logged in', 'Success', '192.168.1.31', 'Chrome / Windows', '2026-03-11 11:02:28.022'),
(60, 10, 'Lead Created', 'Leads', NULL, 'New inbound lead recorded', 'Success', '192.168.1.32', 'Safari / iPhone', '2026-03-11 11:02:28.022'),
(61, 11, 'Lead Updated', 'Leads', NULL, 'Lead stage changed', 'Success', '192.168.1.33', 'Firefox / Mac', '2026-03-11 11:02:28.022'),
(62, 10, 'Channel Created', 'Channels', NULL, 'Protocol provisioned', 'Success', '192.168.1.34', 'Chrome / Windows', '2026-03-11 11:02:28.022'),
(63, 11, 'Routing Rule Added', 'Routing', NULL, 'New distribution logic applied', 'Success', '192.168.1.35', 'Safari / iPhone', '2026-03-11 11:02:28.022'),
(64, 10, 'Password Reset', 'Auth', NULL, 'Credential recovery executed', 'Success', '192.168.1.36', 'Firefox / Mac', '2026-03-11 11:02:28.022'),
(65, 11, 'Lead Reassigned', 'Leads', NULL, 'Ownership transfer complete', 'Success', '192.168.1.37', 'Chrome / Windows', '2026-03-11 11:02:28.022'),
(66, 10, 'System Login', 'Auth', NULL, 'User logged in', 'Success', '192.168.1.38', 'Safari / iPhone', '2026-03-11 11:02:28.022'),
(67, 11, 'Lead Created', 'Leads', NULL, 'New inbound lead recorded', 'Success', '192.168.1.39', 'Firefox / Mac', '2026-03-11 11:02:28.022');

-- --------------------------------------------------------

--
-- Estructura de la taula `admin_dashboard`
--

CREATE TABLE `admin_dashboard` (
  `id` int(11) NOT NULL,
  `connectedWhatsapp` int(11) NOT NULL DEFAULT 0,
  `facebookPages` int(11) NOT NULL DEFAULT 0,
  `websiteLeads` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `ai_config`
--

CREATE TABLE `ai_config` (
  `id` int(11) NOT NULL DEFAULT 1,
  `flow` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`flow`)),
  `threshold` int(11) NOT NULL DEFAULT 75,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  `rules` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`rules`)),
  `scoringRules` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`scoringRules`)),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `calls`
--

CREATE TABLE `calls` (
  `id` int(11) NOT NULL,
  `leadId` int(11) NOT NULL,
  `counselorId` int(11) DEFAULT NULL,
  `type` varchar(191) DEFAULT 'Outbound',
  `outcome` varchar(191) DEFAULT 'Pending',
  `callStatus` varchar(191) NOT NULL DEFAULT 'Pending',
  `duration` int(11) DEFAULT 0,
  `notes` text DEFAULT NULL,
  `date` varchar(191) DEFAULT NULL,
  `time` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `channels`
--

CREATE TABLE `channels` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `number` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `webhook` varchar(191) DEFAULT NULL,
  `type` enum('WhatsApp','Facebook','Website','Instagram','Telegram') NOT NULL,
  `status` enum('Active','Inactive','Error') NOT NULL DEFAULT 'Active',
  `usage_count` int(11) DEFAULT 0,
  `lastActivity` datetime(3) DEFAULT NULL,
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`config`)),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `channels`
--

INSERT INTO `channels` (`id`, `name`, `number`, `country`, `webhook`, `type`, `status`, `usage_count`, `lastActivity`, `config`, `createdAt`) VALUES
(13, 'WhatsApp Business – UK', NULL, NULL, NULL, 'WhatsApp', 'Active', 412, NULL, NULL, '2026-03-11 11:02:27.711'),
(14, 'Facebook Messenger – EU', NULL, NULL, NULL, 'Facebook', 'Active', 280, NULL, NULL, '2026-03-11 11:02:27.711'),
(15, 'Website Chat Widget', NULL, NULL, NULL, 'Website', 'Active', 200, NULL, NULL, '2026-03-11 11:02:27.711'),
(16, 'Instagram DM', NULL, NULL, NULL, 'Instagram', 'Inactive', 45, NULL, NULL, '2026-03-11 11:02:27.711'),
(17, 'Telegram Bot', NULL, NULL, NULL, 'Telegram', 'Active', 130, NULL, NULL, '2026-03-11 11:02:27.711');

-- --------------------------------------------------------

--
-- Estructura de la taula `counselor_dashboard`
--

CREATE TABLE `counselor_dashboard` (
  `id` int(11) NOT NULL,
  `assignedLeads` int(11) NOT NULL DEFAULT 0,
  `followUps` int(11) NOT NULL DEFAULT 0,
  `stageUpdates` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `counselor_notes`
--

CREATE TABLE `counselor_notes` (
  `id` int(11) NOT NULL,
  `leadId` int(11) NOT NULL,
  `authorId` int(11) NOT NULL,
  `text` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `counselor_performance`
--

CREATE TABLE `counselor_performance` (
  `id` int(11) NOT NULL,
  `counselorName` varchar(191) NOT NULL,
  `replies` int(11) NOT NULL DEFAULT 0,
  `conversions` int(11) NOT NULL DEFAULT 0,
  `avgResponse` varchar(191) NOT NULL DEFAULT '0m',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `source` varchar(191) DEFAULT NULL,
  `status` varchar(191) DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `integrations`
--

CREATE TABLE `integrations` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `url` varchar(191) DEFAULT NULL,
  `apiKey` varchar(191) DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `integrations`
--

INSERT INTO `integrations` (`id`, `name`, `type`, `url`, `apiKey`, `status`, `createdAt`) VALUES
(5, 'HubSpot CRM', 'CRM', 'https://api.hubspot.com/v1', 'hs_demo_key_xxx', 'Active', '2026-03-11 11:02:28.015'),
(6, 'Salesforce', 'CRM', 'https://login.salesforce.com', 'sf_demo_key_xxx', 'Inactive', '2026-03-11 11:02:28.015'),
(7, 'Mailchimp', 'Marketing', 'https://us1.api.mailchimp.com/3.0', 'mc_demo_key_xxx', 'Active', '2026-03-11 11:02:28.015'),
(8, 'Slack Notifications', 'Communication', 'https://hooks.slack.com/...', 'slack_webhook_xxx', 'Active', '2026-03-11 11:02:28.015');

-- --------------------------------------------------------

--
-- Estructura de la taula `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `country` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `program` varchar(191) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `stage` varchar(191) DEFAULT 'New',
  `score` int(11) DEFAULT 0,
  `source` varchar(191) DEFAULT 'Website',
  `assignedTo` int(11) DEFAULT NULL,
  `team` varchar(191) DEFAULT 'General',
  `priority` enum('Low','Medium','High') NOT NULL DEFAULT 'Medium',
  `followUpDate` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `leads`
--

INSERT INTO `leads` (`id`, `name`, `country`, `phone`, `email`, `program`, `statusId`, `stage`, `score`, `source`, `assignedTo`, `team`, `priority`, `followUpDate`, `createdAt`, `updatedAt`) VALUES
(53, 'Ahmad Al-Rashid', 'India', '+972837262676', 'ahmad.al-rashid@example.com', 'MBA', NULL, 'New', 64, 'WhatsApp', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.717', '2026-03-11 11:02:27.717'),
(54, 'Priya Sharma', 'USA', '+213358368375', 'priya.sharma@example.com', 'Data Science', NULL, 'Contacted', 25, 'Facebook', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.722', '2026-03-11 11:02:27.722'),
(55, 'James Wilson', 'UK', '+283678983334', 'james.wilson@example.com', 'Finance', NULL, 'Qualified', 17, 'Website', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.729', '2026-03-11 11:02:27.729'),
(56, 'Sophie Dubois', 'UAE', '+858840921741', 'sophie.dubois@example.com', 'Marketing', NULL, 'Proposal', 17, 'Instagram', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.735', '2026-03-11 11:02:27.735'),
(57, 'Carlos Mendez', 'France', '+975171926305', 'carlos.mendez@example.com', 'Engineering', NULL, 'Won', 7, 'Telegram', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.739', '2026-03-11 11:02:27.739'),
(58, 'Yuki Tanaka', 'Spain', '+794140354785', 'yuki.tanaka@example.com', 'Medicine', NULL, 'Lost', 71, 'Referral', 13, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.744', '2026-03-11 11:02:27.744'),
(59, 'Fatima Al-Hassan', 'Japan', '+499114386270', 'fatima.al-hassan@example.com', 'Law', NULL, 'Converted', 21, 'WhatsApp', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.748', '2026-03-11 11:02:27.748'),
(60, 'David Okafor', 'Saudi Arabia', '+835801145865', 'david.okafor@example.com', 'Psychology', NULL, 'New', 42, 'Facebook', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.753', '2026-03-11 11:02:27.753'),
(61, 'Emma Thompson', 'Nigeria', '+739744995247', 'emma.thompson@example.com', 'Architecture', NULL, 'Contacted', 14, 'Website', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.758', '2026-03-11 11:02:27.758'),
(62, 'Luis García', 'Australia', '+960857362166', 'luis.garcía@example.com', 'Computer Science', NULL, 'Qualified', 34, 'Instagram', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.762', '2026-03-11 11:02:27.762'),
(63, 'Zoe Chen', 'Mexico', '+976634931313', 'zoe.chen@example.com', 'MBA', NULL, 'Proposal', 87, 'Telegram', 13, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.767', '2026-03-11 11:02:27.767'),
(64, 'Arjun Patel', 'Canada', '+579188372811', 'arjun.patel@example.com', 'Data Science', NULL, 'Won', 89, 'Referral', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.771', '2026-03-11 11:02:27.771'),
(65, 'Elena Rossi', 'Germany', '+684648957619', 'elena.rossi@example.com', 'Finance', NULL, 'Lost', 73, 'WhatsApp', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.776', '2026-03-11 11:02:27.776'),
(66, 'Mohammed Ali', 'Italy', '+735495565801', 'mohammed.ali@example.com', 'Marketing', NULL, 'Converted', 19, 'Facebook', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.780', '2026-03-11 11:02:27.780'),
(67, 'Sarah Miller', 'Brazil', '+362687983975', 'sarah.miller@example.com', 'Engineering', NULL, 'New', 86, 'Website', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.784', '2026-03-11 11:02:27.784'),
(68, 'Ivan Petrov', 'India', '+755452333904', 'ivan.petrov@example.com', 'Medicine', NULL, 'Contacted', 95, 'Instagram', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.788', '2026-03-11 11:02:27.788'),
(69, 'Lucia Ferrari', 'USA', '+819550982948', 'lucia.ferrari@example.com', 'Law', NULL, 'Qualified', 18, 'Telegram', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.792', '2026-03-11 11:02:27.792'),
(70, 'Hans Schmidt', 'UK', '+446649187211', 'hans.schmidt@example.com', 'Psychology', NULL, 'Proposal', 66, 'Referral', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.796', '2026-03-11 11:02:27.796'),
(71, 'Anna Kowalski', 'UAE', '+813794549404', 'anna.kowalski@example.com', 'Architecture', NULL, 'Won', 22, 'WhatsApp', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.800', '2026-03-11 11:02:27.800'),
(72, 'Jean Dupont', 'France', '+701577695103', 'jean.dupont@example.com', 'Computer Science', NULL, 'Lost', 83, 'Facebook', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.804', '2026-03-11 11:02:27.804'),
(73, 'Maria Rodriguez', 'Spain', '+529516352852', 'maria.rodriguez@example.com', 'MBA', NULL, 'Converted', 31, 'Website', 13, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.808', '2026-03-11 11:02:27.808'),
(74, 'Kim Min-su', 'Japan', '+535934386590', 'kim.min-su@example.com', 'Data Science', NULL, 'New', 51, 'Instagram', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.813', '2026-03-11 11:02:27.813'),
(75, 'Chen Wei', 'Saudi Arabia', '+103349756441', 'chen.wei@example.com', 'Finance', NULL, 'Contacted', 92, 'Telegram', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.817', '2026-03-11 11:02:27.817'),
(76, 'Sato Kenji', 'Nigeria', '+240260416473', 'sato.kenji@example.com', 'Marketing', NULL, 'Qualified', 98, 'Referral', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.822', '2026-03-11 11:02:27.822'),
(77, 'Ravi Kumar', 'Australia', '+482953692668', 'ravi.kumar@example.com', 'Engineering', NULL, 'Proposal', 38, 'WhatsApp', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.826', '2026-03-11 11:02:27.826'),
(78, 'Amara Diallo', 'Mexico', '+714661084471', 'amara.diallo@example.com', 'Medicine', NULL, 'Won', 54, 'Facebook', 13, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.831', '2026-03-11 11:02:27.831'),
(79, 'Kwame Nkrumah', 'Canada', '+358983949687', 'kwame.nkrumah@example.com', 'Law', NULL, 'Lost', 34, 'Website', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.854', '2026-03-11 11:02:27.854'),
(80, 'Beatriz Silva', 'Germany', '+326108259176', 'beatriz.silva@example.com', 'Psychology', NULL, 'Converted', 64, 'Instagram', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.893', '2026-03-11 11:02:27.893'),
(81, 'Jorge Santos', 'Italy', '+434200753844', 'jorge.santos@example.com', 'Architecture', NULL, 'New', 90, 'Telegram', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.898', '2026-03-11 11:02:27.898'),
(82, 'Isabella Costa', 'Brazil', '+364165082272', 'isabella.costa@example.com', 'Computer Science', NULL, 'Contacted', 45, 'Referral', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.902', '2026-03-11 11:02:27.902'),
(83, 'William Brown', 'India', '+654644081640', 'william.brown@example.com', 'MBA', NULL, 'Qualified', 64, 'WhatsApp', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.906', '2026-03-11 11:02:27.906'),
(84, 'Oliver Smith', 'USA', '+778459862007', 'oliver.smith@example.com', 'Data Science', NULL, 'Proposal', 63, 'Facebook', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.910', '2026-03-11 11:02:27.910'),
(85, 'Charlotte Jones', 'UK', '+782148383341', 'charlotte.jones@example.com', 'Finance', NULL, 'Won', 89, 'Website', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.915', '2026-03-11 11:02:27.915'),
(86, 'Noah Williams', 'UAE', '+434181968486', 'noah.williams@example.com', 'Marketing', NULL, 'Lost', 56, 'Instagram', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.919', '2026-03-11 11:02:27.919'),
(87, 'Amelia Taylor', 'France', '+201771963007', 'amelia.taylor@example.com', 'Engineering', NULL, 'Converted', 45, 'Telegram', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.924', '2026-03-11 11:02:27.924'),
(88, 'Liam Johnson', 'Spain', '+639733698202', 'liam.johnson@example.com', 'Medicine', NULL, 'New', 2, 'Referral', 13, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.929', '2026-03-11 11:02:27.929'),
(89, 'Sophia White', 'Japan', '+976993183326', 'sophia.white@example.com', 'Law', NULL, 'Contacted', 59, 'WhatsApp', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.933', '2026-03-11 11:02:27.933'),
(90, 'Lucas Martin', 'Saudi Arabia', '+153458848022', 'lucas.martin@example.com', 'Psychology', NULL, 'Qualified', 25, 'Facebook', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.937', '2026-03-11 11:02:27.937'),
(91, 'Mia Thompson', 'Nigeria', '+155828771050', 'mia.thompson@example.com', 'Architecture', NULL, 'Proposal', 69, 'Website', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.941', '2026-03-11 11:02:27.941'),
(92, 'Ethan Moore', 'Australia', '+964558787750', 'ethan.moore@example.com', 'Computer Science', NULL, 'Won', 14, 'Instagram', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.944', '2026-03-11 11:02:27.944'),
(93, 'Ava Wilson', 'Mexico', '+218876622123', 'ava.wilson@example.com', 'MBA', NULL, 'Lost', 16, 'Telegram', 13, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.948', '2026-03-11 11:02:27.948'),
(94, 'Mason Anderson', 'Canada', '+969326404041', 'mason.anderson@example.com', 'Data Science', NULL, 'Converted', 22, 'Referral', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.953', '2026-03-11 11:02:27.953'),
(95, 'Isabella Harris', 'Germany', '+117808891008', 'isabella.harris@example.com', 'Finance', NULL, 'New', 21, 'WhatsApp', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.957', '2026-03-11 11:02:27.957'),
(96, 'Logan Clark', 'Italy', '+717995622248', 'logan.clark@example.com', 'Marketing', NULL, 'Contacted', 14, 'Facebook', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.961', '2026-03-11 11:02:27.961'),
(97, 'Sophia Lewis', 'Brazil', '+974618614694', 'sophia.lewis@example.com', 'Engineering', NULL, 'Qualified', 23, 'Website', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.965', '2026-03-11 11:02:27.965'),
(98, 'Jackson Young', 'India', '+299714219820', 'jackson.young@example.com', 'Medicine', NULL, 'Proposal', 0, 'Instagram', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.969', '2026-03-11 11:02:27.969'),
(99, 'Olivia Walker', 'USA', '+745193756581', 'olivia.walker@example.com', 'Law', NULL, 'Won', 77, 'Telegram', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.973', '2026-03-11 11:02:27.973'),
(100, 'Aiden Hall', 'UK', '+734125180305', 'aiden.hall@example.com', 'Psychology', NULL, 'Lost', 68, 'Referral', NULL, 'Alpha Squad', 'Low', NULL, '2026-03-11 11:02:27.978', '2026-03-11 11:02:27.978'),
(101, 'Mia Allen', 'UAE', '+855589541656', 'mia.allen@example.com', 'Architecture', NULL, 'Converted', 77, 'WhatsApp', 14, 'Alpha Squad', 'High', NULL, '2026-03-11 11:02:27.982', '2026-03-11 11:02:27.982'),
(102, 'Lucas Wright', 'France', '+916713830775', 'lucas.wright@example.com', 'Computer Science', NULL, 'New', 85, 'Facebook', NULL, 'Alpha Squad', 'Medium', NULL, '2026-03-11 11:02:27.987', '2026-03-11 11:02:27.987');

-- --------------------------------------------------------

--
-- Estructura de la taula `lead_statuses`
--

CREATE TABLE `lead_statuses` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `color` varchar(191) DEFAULT '#CBD5E1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `manager_dashboard`
--

CREATE TABLE `manager_dashboard` (
  `id` int(11) NOT NULL,
  `leadsToday` int(11) NOT NULL DEFAULT 0,
  `qualifiedLeads` int(11) NOT NULL DEFAULT 0,
  `convertedLeads` int(11) NOT NULL DEFAULT 0,
  `enrolledLeads` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `label` varchar(191) NOT NULL,
  `icon` varchar(191) NOT NULL,
  `path` varchar(191) DEFAULT NULL,
  `roleId` int(11) NOT NULL DEFAULT 1,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `menu`
--

INSERT INTO `menu` (`id`, `label`, `icon`, `path`, `roleId`, `order`, `createdAt`, `updatedAt`) VALUES
(52, 'Overview', 'LayoutDashboard', '/super-admin', 7, 1, '2026-03-11 11:02:28.031', '2026-03-11 11:02:28.031'),
(53, 'All Channels', 'MessageSquare', '/super-admin/channels', 7, 2, '2026-03-11 11:02:28.039', '2026-03-11 11:02:28.039'),
(54, 'Global Users', 'Users', '/super-admin/users', 7, 3, '2026-03-11 11:02:28.045', '2026-03-11 11:02:28.045'),
(55, 'Admin Management', 'UserPlus', '/super-admin/admins', 7, 4, '2026-03-11 11:02:28.051', '2026-03-11 11:02:28.051'),
(56, 'Billing & Plans', 'CreditCard', '/super-admin/billing', 7, 5, '2026-03-11 11:02:28.057', '2026-03-11 11:02:28.057'),
(57, 'System Analytics', 'BarChart3', '/super-admin/analytics', 7, 6, '2026-03-11 11:02:28.062', '2026-03-11 11:02:28.062'),
(58, 'Audit Logs', 'ScrollText', '/super-admin/audit', 7, 7, '2026-03-11 11:02:28.067', '2026-03-11 11:02:28.067'),
(59, 'Security', 'ShieldCheck', '/super-admin/security', 7, 8, '2026-03-11 11:02:28.072', '2026-03-11 11:02:28.072'),
(60, 'Inbox', 'Inbox', '/inbox', 7, 9, '2026-03-11 11:02:28.077', '2026-03-11 11:02:28.077'),
(61, 'Leads', 'Users', '/leads', 7, 10, '2026-03-11 11:02:28.083', '2026-03-11 11:02:28.083'),
(62, 'Dashboard', 'LayoutDashboard', '/admin', 8, 1, '2026-03-11 11:02:28.089', '2026-03-11 11:02:28.089'),
(63, 'Channel Setup', 'MessageSquare', '/admin/channels', 8, 2, '2026-03-11 11:02:28.096', '2026-03-11 11:02:28.096'),
(64, 'Routing Rules', 'Globe', '/admin/routing', 8, 3, '2026-03-11 11:02:28.101', '2026-03-11 11:02:28.101'),
(65, 'User Management', 'Users', '/admin/users', 8, 4, '2026-03-11 11:02:28.106', '2026-03-11 11:02:28.106'),
(66, 'AI Config', 'BrainCircuit', '/admin/ai-config', 8, 5, '2026-03-11 11:02:28.111', '2026-03-11 11:02:28.111'),
(67, 'Working Hours', 'Clock', '/admin/working-hours', 8, 6, '2026-03-11 11:02:28.116', '2026-03-11 11:02:28.116'),
(68, 'CRM Integration', 'Link2', '/admin/crm-settings', 8, 7, '2026-03-11 11:02:28.120', '2026-03-11 11:02:28.120'),
(69, 'Templates', 'FileText', '/admin/templates', 8, 8, '2026-03-11 11:02:28.124', '2026-03-11 11:02:28.124'),
(70, 'Inbox', 'Inbox', '/inbox', 8, 9, '2026-03-11 11:02:28.128', '2026-03-11 11:02:28.128'),
(71, 'Leads', 'Users', '/leads', 8, 10, '2026-03-11 11:02:28.133', '2026-03-11 11:02:28.133'),
(72, 'Dashboard', 'LayoutDashboard', '/manager', 9, 1, '2026-03-11 11:02:28.136', '2026-03-11 11:02:28.136'),
(73, 'Lead Funnel', 'PieChart', '/manager/funnel', 9, 2, '2026-03-11 11:02:28.140', '2026-03-11 11:02:28.140'),
(74, 'Country Analysis', 'Globe', '/manager/country', 9, 3, '2026-03-11 11:02:28.143', '2026-03-11 11:02:28.143'),
(75, 'SLA Metrics', 'TrendingUp', '/manager/sla', 9, 4, '2026-03-11 11:02:28.147', '2026-03-11 11:02:28.147'),
(76, 'Conversion', 'Activity', '/manager/conversion', 9, 5, '2026-03-11 11:02:28.151', '2026-03-11 11:02:28.151'),
(77, 'Team Overview', 'Users2', '/manager/team', 9, 6, '2026-03-11 11:02:28.156', '2026-03-11 11:02:28.156'),
(78, 'Call Reports', 'PhoneCall', '/manager/calls', 9, 7, '2026-03-11 11:02:28.160', '2026-03-11 11:02:28.160'),
(79, 'Leads', 'Users', '/leads', 9, 8, '2026-03-11 11:02:28.164', '2026-03-11 11:02:28.164'),
(80, 'Dashboard', 'LayoutDashboard', '/team-leader', 10, 1, '2026-03-11 11:02:28.168', '2026-03-11 11:02:28.168'),
(81, 'Team Inbox', 'Inbox', '/team-leader/inbox', 10, 2, '2026-03-11 11:02:28.172', '2026-03-11 11:02:28.172'),
(82, 'Assigned Leads', 'Users', '/team-leader/leads', 10, 3, '2026-03-11 11:02:28.176', '2026-03-11 11:02:28.176'),
(83, 'Performance', 'UserCheck', '/team-leader/performance', 10, 4, '2026-03-11 11:02:28.180', '2026-03-11 11:02:28.180'),
(84, 'Reassign Leads', 'RefreshCcw', '/team-leader/reassign', 10, 5, '2026-03-11 11:02:28.184', '2026-03-11 11:02:28.184'),
(85, 'SLA Alerts', 'AlertTriangle', '/team-leader/sla', 10, 6, '2026-03-11 11:02:28.188', '2026-03-11 11:02:28.188'),
(86, 'Activity Logs', 'FileText', '/team-leader/logs', 10, 7, '2026-03-11 11:02:28.192', '2026-03-11 11:02:28.192'),
(87, 'My Dashboard', 'LayoutDashboard', '/counselor', 11, 1, '2026-03-11 11:02:28.196', '2026-03-11 11:02:28.196'),
(88, 'My Leads', 'Target', '/leads', 11, 2, '2026-03-11 11:02:28.200', '2026-03-11 11:02:28.200'),
(89, 'Inbox', 'Inbox', '/inbox', 11, 3, '2026-03-11 11:02:28.204', '2026-03-11 11:02:28.204'),
(90, 'Lead Stages', 'Layers', '/counselor/stages', 11, 4, '2026-03-11 11:02:28.207', '2026-03-11 11:02:28.207'),
(91, 'Lead Notes', 'FileEdit', '/counselor/notes', 11, 5, '2026-03-11 11:02:28.211', '2026-03-11 11:02:28.211'),
(92, 'AI Summary', 'Sparkles', '/counselor/ai-summary', 11, 6, '2026-03-11 11:02:28.215', '2026-03-11 11:02:28.215'),
(93, 'Call History', 'Phone', '/counselor/calls', 11, 7, '2026-03-11 11:02:28.219', '2026-03-11 11:02:28.219'),
(94, 'Support Dash', 'LayoutDashboard', '/support', 12, 1, '2026-03-11 11:02:28.223', '2026-03-11 11:02:28.223'),
(95, 'Lead Assignment', 'UserCheck', '/support/assign', 12, 2, '2026-03-11 11:02:28.228', '2026-03-11 11:02:28.228'),
(96, 'AI Status', 'Zap', '/support/ai-status', 12, 3, '2026-03-11 11:02:28.232', '2026-03-11 11:02:28.232'),
(97, 'Templates', 'FileText', '/support/templates', 12, 4, '2026-03-11 11:02:28.237', '2026-03-11 11:02:28.237'),
(98, 'Inbox', 'Inbox', '/inbox', 12, 5, '2026-03-11 11:02:28.241', '2026-03-11 11:02:28.241');

-- --------------------------------------------------------

--
-- Estructura de la taula `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `leadId` int(11) NOT NULL,
  `channel` varchar(191) DEFAULT NULL,
  `message` text NOT NULL,
  `sender` varchar(191) DEFAULT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `timestamp` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `messages`
--

INSERT INTO `messages` (`id`, `leadId`, `channel`, `message`, `sender`, `isRead`, `timestamp`) VALUES
(16, 53, NULL, 'Inquiry from Ahmad Al-Rashid regarding MBA', 'Ahmad Al-Rashid', 0, '2026-03-11 10:17:27.990'),
(17, 54, NULL, 'Inquiry from Priya Sharma regarding Data Science', 'Priya Sharma', 0, '2026-03-11 10:17:27.991'),
(18, 55, NULL, 'Inquiry from James Wilson regarding Finance', 'James Wilson', 0, '2026-03-11 10:17:27.991'),
(19, 56, NULL, 'Inquiry from Sophie Dubois regarding Marketing', 'Sophie Dubois', 0, '2026-03-11 10:17:27.991'),
(20, 57, NULL, 'Inquiry from Carlos Mendez regarding Engineering', 'Carlos Mendez', 0, '2026-03-11 10:17:27.991'),
(21, 58, NULL, 'Inquiry from Yuki Tanaka regarding Medicine', 'Yuki Tanaka', 0, '2026-03-11 10:42:27.991'),
(22, 59, NULL, 'Inquiry from Fatima Al-Hassan regarding Law', 'Fatima Al-Hassan', 0, '2026-03-11 10:42:27.991'),
(23, 60, NULL, 'Inquiry from David Okafor regarding Psychology', 'David Okafor', 0, '2026-03-11 10:42:27.991'),
(24, 61, NULL, 'Inquiry from Emma Thompson regarding Architecture', 'Emma Thompson', 0, '2026-03-11 10:42:27.991'),
(25, 62, NULL, 'Inquiry from Luis García regarding Computer Science', 'Luis García', 0, '2026-03-11 10:42:27.991'),
(26, 63, NULL, 'Inquiry from Zoe Chen regarding MBA', 'Zoe Chen', 0, '2026-03-11 10:57:27.991'),
(27, 64, NULL, 'Inquiry from Arjun Patel regarding Data Science', 'Arjun Patel', 1, '2026-03-11 10:57:27.991'),
(28, 65, NULL, 'Inquiry from Elena Rossi regarding Finance', 'Elena Rossi', 1, '2026-03-11 10:57:27.991'),
(29, 66, NULL, 'Inquiry from Mohammed Ali regarding Marketing', 'Mohammed Ali', 1, '2026-03-11 10:57:27.991'),
(30, 67, NULL, 'Inquiry from Sarah Miller regarding Engineering', 'Sarah Miller', 1, '2026-03-11 10:57:27.991');

-- --------------------------------------------------------

--
-- Estructura de la taula `message_templates`
--

CREATE TABLE `message_templates` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(191) DEFAULT NULL,
  `variable_count` int(11) DEFAULT 0,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `message_templates`
--

INSERT INTO `message_templates` (`id`, `name`, `content`, `category`, `variable_count`, `createdBy`, `createdAt`) VALUES
(1, 'Welcome Message', 'Hello {{name}}, welcome to our CRM! How can we help you today?', 'greeting', 1, NULL, '2026-03-06 10:11:39.059'),
(2, 'Follow Up', 'Hi {{name}}, just following up on your inquiry about {{program}}. Are you still interested?', 'follow-up', 2, NULL, '2026-03-06 10:11:39.059'),
(3, 'Proposal Sent', 'Dear {{name}}, we have sent you a detailed proposal for {{program}}. Please review it at your earliest convenience.', 'proposal', 2, NULL, '2026-03-06 10:11:39.059'),
(4, 'Closure', 'Thank you {{name}} for choosing us! Your application for {{program}} is confirmed.', 'closure', 2, NULL, '2026-03-06 10:11:39.059'),
(5, 'Meeting Invite', 'Hi {{name}}, I would like to invite you for a discovery call regarding {{program}}.', 'scheduling', 2, NULL, '2026-03-06 10:11:39.059'),
(6, 'Welcome Message', 'Hello {{name}}, welcome to our CRM! How can we help you today?', 'greeting', 1, 11, '2026-03-11 11:02:28.004'),
(7, 'Follow Up', 'Hi {{name}}, just following up on your inquiry about {{program}}. Are you still interested?', 'follow-up', 2, 11, '2026-03-11 11:02:28.004'),
(8, 'Proposal Sent', 'Dear {{name}}, we have sent you a detailed proposal for {{program}}. Please review it at your earliest convenience.', 'proposal', 2, 14, '2026-03-11 11:02:28.004'),
(9, 'Closure', 'Thank you {{name}} for choosing us! Your application for {{program}} is confirmed.', 'closure', 2, 14, '2026-03-11 11:02:28.004'),
(10, 'Meeting Invite', 'Hi {{name}}, I would like to invite you for a discovery call regarding {{program}}.', 'scheduling', 2, 13, '2026-03-11 11:02:28.004');

-- --------------------------------------------------------

--
-- Estructura de la taula `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Unread',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(7, 'SUPER_ADMIN', 'System owner with full access'),
(8, 'ADMIN', 'Institutional administrator'),
(9, 'MANAGER', 'Operational performance monitor'),
(10, 'TEAM_LEADER', 'Team supervisor and lead reassigner'),
(11, 'COUNSELOR', 'Frontline lead handler'),
(12, 'SUPPORT', 'First point of contact and routing');

-- --------------------------------------------------------

--
-- Estructura de la taula `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `module` varchar(191) NOT NULL,
  `canView` tinyint(1) NOT NULL DEFAULT 1,
  `canEdit` tinyint(1) NOT NULL DEFAULT 0,
  `canDelete` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `rota`
--

CREATE TABLE `rota` (
  `id` int(11) NOT NULL,
  `publicId` varchar(191) NOT NULL,
  `date` varchar(191) NOT NULL,
  `teamMember` varchar(191) NOT NULL,
  `serviceUser` varchar(191) NOT NULL,
  `shiftTime` varchar(191) NOT NULL,
  `shiftStart` varchar(191) NOT NULL,
  `shiftEnd` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL DEFAULT '',
  `notes` varchar(191) DEFAULT '',
  `status` varchar(191) NOT NULL DEFAULT 'Scheduled',
  `createdBy` varchar(191) NOT NULL DEFAULT 'System',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `routing_rules`
--

CREATE TABLE `routing_rules` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `team` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `counselor` varchar(191) DEFAULT NULL,
  `type` enum('Country Based','Round Robin','Load Based','Weightage','Direct') NOT NULL DEFAULT 'Round Robin',
  `status` enum('Active','Paused') NOT NULL DEFAULT 'Active',
  `priority` int(11) DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `routing_rules`
--

INSERT INTO `routing_rules` (`id`, `name`, `team`, `country`, `counselor`, `type`, `status`, `priority`, `createdAt`) VALUES
(7, 'UAE–MBA Route', 'Gulf Team', 'UAE', NULL, 'Round Robin', 'Active', 1, '2026-03-11 11:02:27.998'),
(8, 'India–Tech Route', 'South Asia', 'India', NULL, 'Weightage', 'Active', 2, '2026-03-11 11:02:27.998'),
(9, 'UK–Finance Route', 'Europe', 'UK', NULL, 'Direct', 'Active', 1, '2026-03-11 11:02:27.998'),
(10, 'Facebook All', 'Social Team', NULL, NULL, 'Round Robin', 'Paused', 3, '2026-03-11 11:02:27.998'),
(11, 'USA Admissions', 'North America', 'USA', NULL, 'Direct', 'Active', 1, '2026-03-11 11:02:27.998'),
(12, 'Global Support', 'Support', NULL, NULL, 'Round Robin', 'Active', 5, '2026-03-11 11:02:27.998');

-- --------------------------------------------------------

--
-- Estructura de la taula `security_settings`
--

CREATE TABLE `security_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `force2FA` tinyint(1) NOT NULL DEFAULT 1,
  `sessionTimeout` varchar(191) NOT NULL DEFAULT '60 mins',
  `passwordExpiry` varchar(191) NOT NULL DEFAULT '90 days',
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` text NOT NULL,
  `group` varchar(191) DEFAULT 'general',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `submenu`
--

CREATE TABLE `submenu` (
  `id` int(11) NOT NULL,
  `label` varchar(191) NOT NULL,
  `path` varchar(191) NOT NULL,
  `menuId` int(11) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `clientName` varchar(191) NOT NULL,
  `plan` varchar(191) NOT NULL,
  `status` enum('Active','Expired','Suspended') NOT NULL DEFAULT 'Active',
  `renewalDate` date DEFAULT NULL,
  `messagesCount` int(11) DEFAULT 0,
  `contactsCount` int(11) DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `clientName`, `plan`, `status`, `renewalDate`, `messagesCount`, `contactsCount`, `createdAt`) VALUES
(7, 'EDU Corp Global', 'Enterprise', 'Active', '2026-12-31', 45000, 12000, '2026-03-11 11:02:28.009'),
(8, 'LearnPath Academy', 'Professional', 'Active', '2026-06-30', 18000, 3500, '2026-03-11 11:02:28.009'),
(9, 'SkillBridge Institute', 'Starter', 'Active', '2026-03-31', 4200, 800, '2026-03-11 11:02:28.009'),
(10, 'GlobalEd Partners', 'Enterprise', 'Suspended', '2025-12-31', 0, 0, '2026-03-11 11:02:28.009'),
(11, 'TechSkills Ltd', 'Professional', 'Active', '2026-08-15', 12000, 2500, '2026-03-11 11:02:28.009');

-- --------------------------------------------------------

--
-- Estructura de la taula `super_admin_dashboard`
--

CREATE TABLE `super_admin_dashboard` (
  `id` int(11) NOT NULL,
  `totalClients` int(11) NOT NULL DEFAULT 0,
  `totalLeads` int(11) NOT NULL DEFAULT 0,
  `totalRevenue` double NOT NULL DEFAULT 0,
  `activeChannels` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `support_dashboard`
--

CREATE TABLE `support_dashboard` (
  `id` int(11) NOT NULL,
  `openTickets` int(11) NOT NULL DEFAULT 0,
  `newMessages` int(11) NOT NULL DEFAULT 0,
  `assignedChats` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `support_dashboard`
--

INSERT INTO `support_dashboard` (`id`, `openTickets`, `newMessages`, `assignedChats`, `createdAt`) VALUES
(1, 25, 15, 0, '2026-03-07 07:40:17.512'),
(2, 25, 15, 0, '2026-03-07 07:41:04.099'),
(3, 25, 15, 0, '2026-03-07 08:48:50.135'),
(4, 25, 15, 0, '2026-03-07 08:52:18.329'),
(5, 25, 15, 0, '2026-03-07 09:05:18.962'),
(6, 25, 15, 0, '2026-03-07 09:05:52.231'),
(7, 25, 15, 0, '2026-03-07 09:33:16.862'),
(8, 25, 15, 0, '2026-03-07 11:45:37.943'),
(9, 25, 15, 0, '2026-03-07 11:45:49.067'),
(10, 25, 15, 0, '2026-03-07 11:51:19.152'),
(11, 25, 15, 0, '2026-03-07 11:52:32.098'),
(12, 25, 15, 0, '2026-03-07 12:11:07.861'),
(13, 25, 15, 0, '2026-03-07 12:17:49.369'),
(14, 25, 15, 0, '2026-03-07 12:19:54.326'),
(15, 25, 15, 0, '2026-03-07 13:03:13.951'),
(16, 25, 15, 0, '2026-03-07 13:10:04.537'),
(17, 25, 15, 0, '2026-03-09 05:49:26.912'),
(18, 25, 15, 0, '2026-03-09 05:56:26.799'),
(19, 25, 15, 0, '2026-03-09 06:03:24.586'),
(20, 25, 15, 0, '2026-03-09 06:10:51.732'),
(21, 25, 15, 0, '2026-03-09 06:16:42.614'),
(22, 25, 15, 0, '2026-03-09 06:59:41.594'),
(23, 25, 15, 0, '2026-03-09 07:03:15.093'),
(24, 25, 15, 0, '2026-03-09 07:06:57.946'),
(25, 25, 15, 0, '2026-03-09 07:10:32.581'),
(26, 25, 15, 0, '2026-03-09 07:12:59.365'),
(27, 25, 15, 0, '2026-03-09 07:20:58.075'),
(28, 24, 15, 0, '2026-03-09 09:52:56.412'),
(29, 24, 15, 0, '2026-03-09 09:53:01.107'),
(30, 24, 15, 0, '2026-03-09 09:53:01.118'),
(31, 24, 15, 0, '2026-03-09 09:53:45.068'),
(32, 23, 15, 0, '2026-03-09 09:54:19.013'),
(33, 23, 15, 0, '2026-03-09 09:54:19.027'),
(34, 23, 15, 0, '2026-03-09 09:59:21.424'),
(35, 23, 15, 0, '2026-03-09 09:59:59.425'),
(36, 23, 15, 0, '2026-03-09 10:01:17.322'),
(37, 23, 15, 0, '2026-03-09 11:25:28.766'),
(38, 23, 15, 0, '2026-03-09 11:26:38.978'),
(39, 23, 15, 0, '2026-03-09 11:38:29.305'),
(40, 23, 15, 0, '2026-03-10 12:26:31.540'),
(41, 23, 15, 0, '2026-03-11 09:29:21.370'),
(42, 23, 15, 0, '2026-03-11 09:48:59.601'),
(43, 23, 15, 0, '2026-03-11 09:49:19.495'),
(44, 23, 15, 0, '2026-03-11 09:49:19.510'),
(45, 22, 15, 0, '2026-03-11 10:03:30.703'),
(46, 22, 15, 0, '2026-03-11 10:04:04.057'),
(47, 23, 15, 0, '2026-03-11 10:04:26.279'),
(48, 23, 15, 0, '2026-03-11 10:04:26.290');

-- --------------------------------------------------------

--
-- Estructura de la taula `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Pending',
  `priority` varchar(191) NOT NULL DEFAULT 'Medium',
  `dueDate` datetime(3) DEFAULT NULL,
  `assignedTo` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `team_leader_dashboard`
--

CREATE TABLE `team_leader_dashboard` (
  `id` int(11) NOT NULL,
  `teamLeads` int(11) NOT NULL DEFAULT 0,
  `pendingReplies` int(11) NOT NULL DEFAULT 0,
  `slaBreaches` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `template`
--

CREATE TABLE `template` (
  `id` int(11) NOT NULL,
  `publicId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'Daily',
  `tasks` int(11) NOT NULL DEFAULT 0,
  `duration` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT '',
  `taskList` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`taskList`)),
  `createdBy` varchar(191) NOT NULL DEFAULT 'System',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `roleId` int(11) NOT NULL DEFAULT 1,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `country` varchar(191) DEFAULT 'India',
  `team` varchar(191) DEFAULT 'General',
  `client` varchar(191) DEFAULT 'Global Entity',
  `assignedChannels` int(11) DEFAULT 0,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`permissions`)),
  `refreshToken` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `roleId`, `status`, `country`, `team`, `client`, `assignedChannels`, `permissions`, `refreshToken`, `createdAt`, `updatedAt`) VALUES
(10, 'Super Admin', 'super.admin@crm.com', '$2b$10$jk4kUugmbiZFtoZjhnvAa.a4OVVX1pIVibCfDcRW0pZtudRtIoGGW', 7, 'Active', 'India', 'Executive-Super', 'Global Entity', 0, NULL, NULL, '2026-03-11 11:02:27.683', '2026-03-11 11:02:27.683'),
(11, 'EDU Admin', 'admin@edu-corp.com', '$2b$10$jk4kUugmbiZFtoZjhnvAa.a4OVVX1pIVibCfDcRW0pZtudRtIoGGW', 8, 'Active', 'India', 'Central Admin', 'Global Entity', 0, NULL, NULL, '2026-03-11 11:02:27.689', '2026-03-11 11:02:27.689'),
(12, 'Analytics Manager', 'manager@analytics.crm', '$2b$10$jk4kUugmbiZFtoZjhnvAa.a4OVVX1pIVibCfDcRW0pZtudRtIoGGW', 9, 'Active', 'India', 'Ops Management', 'Global Entity', 0, NULL, NULL, '2026-03-11 11:02:27.693', '2026-03-11 11:02:27.693'),
(13, 'Team Leader', 'leader@teams.crm', '$2b$10$jk4kUugmbiZFtoZjhnvAa.a4OVVX1pIVibCfDcRW0pZtudRtIoGGW', 10, 'Active', 'India', 'Alpha Squad', 'Global Entity', 0, NULL, NULL, '2026-03-11 11:02:27.697', '2026-03-11 11:02:27.697'),
(14, 'Sales Counselor', 'counselor@sales.crm', '$2b$10$jk4kUugmbiZFtoZjhnvAa.a4OVVX1pIVibCfDcRW0pZtudRtIoGGW', 11, 'Active', 'India', 'Alpha Squad', 'Global Entity', 0, NULL, NULL, '2026-03-11 11:02:27.702', '2026-03-11 11:02:27.702'),
(15, 'Support Agent', 'support@help.crm', '$2b$10$jk4kUugmbiZFtoZjhnvAa.a4OVVX1pIVibCfDcRW0pZtudRtIoGGW', 12, 'Active', 'India', 'Alpha Squad', 'Global Entity', 0, NULL, NULL, '2026-03-11 11:02:27.706', '2026-03-11 11:02:27.706');

-- --------------------------------------------------------

--
-- Estructura de la taula `whatsapp_messages`
--

CREATE TABLE `whatsapp_messages` (
  `id` int(11) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Sent',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `working_hours`
--

CREATE TABLE `working_hours` (
  `id` int(11) NOT NULL,
  `day` varchar(191) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `startTime` varchar(191) NOT NULL DEFAULT '09:00',
  `endTime` varchar(191) NOT NULL DEFAULT '18:00',
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('31ec5aba-8244-4c6b-be23-5f4d35cf4b7c', '077ea90eaa9f17aa3b2289bd338c30a2bbc920268dcca1ea2dc2baea90296d1d', '2026-03-06 10:08:20.877', '20260306100817_init_crm_db', NULL, NULL, '2026-03-06 10:08:18.015', 1);

--
-- Índexs per a les taules bolcades
--

--
-- Índexs per a la taula `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activities_userId_fkey` (`userId`),
  ADD KEY `activities_leadId_fkey` (`leadId`);

--
-- Índexs per a la taula `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_logs_userId_fkey` (`userId`);

--
-- Índexs per a la taula `admin_dashboard`
--
ALTER TABLE `admin_dashboard`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `ai_config`
--
ALTER TABLE `ai_config`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `calls`
--
ALTER TABLE `calls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `calls_leadId_fkey` (`leadId`),
  ADD KEY `calls_counselorId_fkey` (`counselorId`);

--
-- Índexs per a la taula `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `counselor_dashboard`
--
ALTER TABLE `counselor_dashboard`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `counselor_notes`
--
ALTER TABLE `counselor_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `counselor_notes_leadId_fkey` (`leadId`),
  ADD KEY `counselor_notes_authorId_fkey` (`authorId`);

--
-- Índexs per a la taula `counselor_performance`
--
ALTER TABLE `counselor_performance`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_key` (`email`);

--
-- Índexs per a la taula `integrations`
--
ALTER TABLE `integrations`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leads_assignedTo_fkey` (`assignedTo`),
  ADD KEY `leads_statusId_fkey` (`statusId`);

--
-- Índexs per a la taula `lead_statuses`
--
ALTER TABLE `lead_statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lead_statuses_name_key` (`name`);

--
-- Índexs per a la taula `manager_dashboard`
--
ALTER TABLE `manager_dashboard`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Menu_roleId_fkey` (`roleId`);

--
-- Índexs per a la taula `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_leadId_fkey` (`leadId`);

--
-- Índexs per a la taula `message_templates`
--
ALTER TABLE `message_templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `message_templates_createdBy_fkey` (`createdBy`);

--
-- Índexs per a la taula `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_userId_fkey` (`userId`);

--
-- Índexs per a la taula `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_key` (`name`);

--
-- Índexs per a la taula `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_permissions_roleId_module_key` (`roleId`,`module`);

--
-- Índexs per a la taula `rota`
--
ALTER TABLE `rota`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Rota_publicId_key` (`publicId`);

--
-- Índexs per a la taula `routing_rules`
--
ALTER TABLE `routing_rules`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `security_settings`
--
ALTER TABLE `security_settings`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_key` (`key`);

--
-- Índexs per a la taula `submenu`
--
ALTER TABLE `submenu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Submenu_menuId_fkey` (`menuId`);

--
-- Índexs per a la taula `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `super_admin_dashboard`
--
ALTER TABLE `super_admin_dashboard`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `support_dashboard`
--
ALTER TABLE `support_dashboard`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `team_leader_dashboard`
--
ALTER TABLE `team_leader_dashboard`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Template_publicId_key` (`publicId`);

--
-- Índexs per a la taula `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD KEY `users_roleId_fkey` (`roleId`);

--
-- Índexs per a la taula `whatsapp_messages`
--
ALTER TABLE `whatsapp_messages`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `working_hours`
--
ALTER TABLE `working_hours`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `working_hours_day_key` (`day`);

--
-- Índexs per a la taula `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la taula `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT per la taula `admin_dashboard`
--
ALTER TABLE `admin_dashboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `calls`
--
ALTER TABLE `calls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la taula `channels`
--
ALTER TABLE `channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT per la taula `counselor_dashboard`
--
ALTER TABLE `counselor_dashboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `counselor_notes`
--
ALTER TABLE `counselor_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la taula `counselor_performance`
--
ALTER TABLE `counselor_performance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `integrations`
--
ALTER TABLE `integrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la taula `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT per la taula `lead_statuses`
--
ALTER TABLE `lead_statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `manager_dashboard`
--
ALTER TABLE `manager_dashboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT per la taula `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT per la taula `message_templates`
--
ALTER TABLE `message_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT per la taula `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la taula `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `rota`
--
ALTER TABLE `rota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `routing_rules`
--
ALTER TABLE `routing_rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la taula `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `submenu`
--
ALTER TABLE `submenu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT per la taula `super_admin_dashboard`
--
ALTER TABLE `super_admin_dashboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `support_dashboard`
--
ALTER TABLE `support_dashboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT per la taula `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `team_leader_dashboard`
--
ALTER TABLE `team_leader_dashboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `template`
--
ALTER TABLE `template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT per la taula `whatsapp_messages`
--
ALTER TABLE `whatsapp_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `working_hours`
--
ALTER TABLE `working_hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restriccions per a les taules bolcades
--

--
-- Restriccions per a la taula `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `leads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `activities_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restriccions per a la taula `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restriccions per a la taula `calls`
--
ALTER TABLE `calls`
  ADD CONSTRAINT `calls_counselorId_fkey` FOREIGN KEY (`counselorId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `calls_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `leads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriccions per a la taula `counselor_notes`
--
ALTER TABLE `counselor_notes`
  ADD CONSTRAINT `counselor_notes_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `counselor_notes_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `leads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriccions per a la taula `leads`
--
ALTER TABLE `leads`
  ADD CONSTRAINT `leads_assignedTo_fkey` FOREIGN KEY (`assignedTo`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leads_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `lead_statuses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restriccions per a la taula `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `Menu_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriccions per a la taula `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `leads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriccions per a la taula `message_templates`
--
ALTER TABLE `message_templates`
  ADD CONSTRAINT `message_templates_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restriccions per a la taula `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriccions per a la taula `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriccions per a la taula `submenu`
--
ALTER TABLE `submenu`
  ADD CONSTRAINT `Submenu_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriccions per a la taula `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
