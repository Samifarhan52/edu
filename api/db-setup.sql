-- ==============================================================================
-- The Edu Consultant - Production MySQL Database Schema
-- Compatible with: Hostinger MySQL 8.x / MariaDB 10.x / phpMyAdmin
-- How to use:
-- 1. In Hostinger hPanel, go to "Databases" -> "phpMyAdmin" -> Select your database
-- 2. Click "Import" or "SQL", paste this entire script and click "Go"
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- Table 1: leads (Student Inquiries, Contact Form, WhatsApp Opt-Ins)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `leads` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) DEFAULT NULL,
  `phone` VARCHAR(64) NOT NULL,
  `destination` VARCHAR(128) DEFAULT NULL,
  `service` VARCHAR(128) DEFAULT NULL,
  `message` TEXT DEFAULT NULL,
  `source` VARCHAR(128) DEFAULT 'Website Inquiry',
  `whatsapp_opt_in` TINYINT(1) DEFAULT 1,
  `status` ENUM('New', 'Contacted', 'In Review', 'Converted', 'Archived') DEFAULT 'New',
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_lead_phone` (`phone`),
  INDEX `idx_lead_email` (`email`),
  INDEX `idx_lead_status` (`status`),
  INDEX `idx_lead_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table 2: meetings (Scheduled Counseling Sessions with Admin Confirm/Reschedule)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `meetings` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) DEFAULT NULL,
  `phone` VARCHAR(64) NOT NULL,
  `preferred_date` VARCHAR(64) DEFAULT NULL,
  `preferred_time` VARCHAR(64) DEFAULT NULL,
  `topic` VARCHAR(128) DEFAULT 'Study Abroad Strategy',
  `notes` TEXT DEFAULT NULL,
  `status` ENUM('Pending', 'Confirmed', 'Rescheduled', 'Completed', 'Cancelled') DEFAULT 'Pending',
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_meeting_date` (`preferred_date`),
  INDEX `idx_meeting_phone` (`phone`),
  INDEX `idx_meeting_status` (`status`),
  INDEX `idx_meeting_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table 3: users (Portal Scholars & Registered Accounts)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `password_hash` VARCHAR(255) DEFAULT NULL,
  `role` VARCHAR(64) DEFAULT 'Student',
  `phone` VARCHAR(64) DEFAULT NULL,
  `target_country` VARCHAR(128) DEFAULT NULL,
  `target_intake` VARCHAR(64) DEFAULT NULL,
  `status` ENUM('Active', 'Suspended', 'Pending Verification') DEFAULT 'Active',
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_user_email` (`email`),
  INDEX `idx_user_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table 4: applications (Student University Applications & Status Tracking)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `applications` (
  `id` VARCHAR(64) NOT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `institution` VARCHAR(128) NOT NULL,
  `program` VARCHAR(128) NOT NULL,
  `intake` VARCHAR(64) DEFAULT NULL,
  `status` ENUM('Draft', 'Submitted', 'In Review', 'Offer Letter Issued', 'Visa Approved', 'Enrolled', 'Rejected') DEFAULT 'In Review',
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_app_user` (`user_id`),
  INDEX `idx_app_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
