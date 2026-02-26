-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: university_system
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'cd82fe33-d83c-11f0-8fc2-10ffe033f025:1-942';

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` text NOT NULL,
  `role_id` char(36) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0a90678d-5a1e-48b6-9962-295e704198ff','Admin User','admin@ams.com','$2b$10$MldqgF16546qdW5pBCN/dePV.x/0LaaQLN7Onuc/1VKCCvZKKHCN2','8089e161-1195-11f1-90bd-10ffe033f025','2026-02-25 17:14:54'),('0cc9f673-821a-4fff-b892-af216a48edbf','mortejo','mortejo@gmail.com','$2b$10$XFVtEQHlsp5w5JqDsoLZ.Obq/fELK31l45hEjsSBk15FNR7b9uG8W','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 16:17:00'),('0e302872-c54d-414b-91a8-37eb3ecb75d8','Test User','testuser@example.com','$2b$10$844nQGf7/9Lzxd717Hz/EOEpDrUI2AvHZnlbVIvw768TZkLaJojqS','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 06:14:19'),('11111111-1111-1111-1111-111111111111','Test User','testuser2@example.com','hashedpassword','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 16:04:31'),('12e0fed6-f467-4c1a-8d5d-da918923c7a6','John Doe','john.doe@example.com','$2b$10$tige25kqKnZb4G2WLC04XemfAepj666Ss7qwHRA2I/8h3fkIMQN/K','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 15:19:33'),('238e52b0-4809-4629-a6a4-5d01aac2dabd','Riri','riri@admin.com','$2b$10$L5lHHSe9CxBKOvGgNxzXjOLTKzn/b3GrL/lL0iNNoOJ4sLbFGfPBO','8089e161-1195-11f1-90bd-10ffe033f025','2026-02-25 17:31:58'),('25ed6329-bf6a-40da-9980-e32057b43642','Student Riri','riri@student.com','$2b$10$E/bUZt9wPyr9eTgNEsPQleqLyXt/5fyseQruTR4CvpLRq5xKhUmTO','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 17:49:28'),('33f04ad9-ff78-474e-a731-755be6e880c1','mortskie','akogwapo@gmail.com','$2b$10$KNLY2YSFlwKbyXB9bLqzu.6Av8100oVZJf4ZsRdJg/GTNGlfCvppm','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 16:34:49'),('48ed0176-4b28-4f4d-96c9-6ff4fcc1c691','Riri1','riri1@ams.com','$2b$10$R2X5Za7x2ZzK/jlPrFWXz.Z7.pAq5DB9TJR4TpQaIEnUqs6KlaVbK','8089e161-1195-11f1-90bd-10ffe033f025','2026-02-25 17:47:08'),('534790af-6800-4f2f-a9d7-8c843be8c8c0','John Doe','john1.doe@example.com','$2b$10$dM4Hs4V2pYhOwLd4SNwFbe.mZ5gwOi9ghVMjDAYMz0uWszMKlrQQu','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 17:24:13'),('83be2fe0-85d8-45cd-9ed5-1de9b31a3b7b','Joshua Mortejo','joshua@example.com','$2b$10$JrBPinMnpZR4HdSoapqpRuqoaApSehxgyozymoPpVNO2fuVG/Fu6e','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-24 15:42:49'),('87479c87-5a32-4498-97ab-67cbc7b18540','Admin User','admin@example.com','$2b$10$4E0DavLrDNPDPTnKeJPGsOhAKV3hsKGa6DpW153Sk6mlUDrmrUJ/e','8089e161-1195-11f1-90bd-10ffe033f025','2026-02-25 06:37:04'),('8a8ff7ec-b38e-40e0-85e2-fb7045a2027b','Alice Admin','alice.admin@example.com','$2b$10$saYoHdnIW6b9bnHIqA2S2eyppjoH0tm.8e/MVCALYn9Lua10.cenS','8089e161-1195-11f1-90bd-10ffe033f025','2026-02-24 16:09:10'),('a62ccdde-9084-4046-a190-c212b64ddc8b','Test User','newuser@example.com','$2b$10$argXRzgJNGKBjz.czLl87.hUFioQdXHRiui7JAR4Oe6A2rjKaCWNK','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 06:30:46'),('c77e6e3d-7fb4-420a-a794-8c651fc7a1b6','Student User','student@example.com','$2b$10$SdcavdoE7MnU0ZZRNRA9KewJzDJz0Bu9Jw4fV0BaeRE4Xcw7rTnW6','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 06:36:46'),('cd38d371-9f4d-45a6-901d-f914a58a5295','popo','pop@gmail.com','$2b$10$qOjxTEV3eELteVWNapTrluHUvvMpaNvk0oj/syFqkCOMuMoEV8yMm','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 15:29:58'),('d5d9da81-edaa-4407-964c-73497e358715','testnaman','testnaman@gmail.com','$2b$10$dP94hRrSJK3zzisKfwGMxe6r/fXhirOr1XZlyYPdpMpJDz/QpjnqO','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 17:29:26'),('d6451136-16f3-45ba-921e-be0113b76715','Joseph Mortejo','yehotivated@gmail.com','$2b$10$d4OPfJkEfypvMbOdrIrLd.DMy/A9.TSs5J1QlX0HrBRhcadXpfrGu','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-24 15:44:46'),('dfaa0fef-b94f-4754-9ae1-af0a762c5330','Valid User','valid@example.com','$2b$10$PwHc2T2S1cZ.Ul9iIBELLeEmhkPuQWktTYJuMZO6fWz30F/lXuo82','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-24 16:25:04'),('e7375a80-c30c-49a4-b4a5-44781418c1ce','admintest','admintest123@gmail.com','$2b$10$3V.ZYzFMjgbz42PT0HkH2.4.EHzOPtn86HgSflFtMbPoW7ex8tJO2','8089e161-1195-11f1-90bd-10ffe033f025','2026-02-25 16:54:39'),('fee2ca90-569d-4b11-b8e8-a183838c38e7','teststudent','test123@gmail.com','$2b$10$Z2X07NTY5qpM4fGuiSmyR./eLFYCUgP6BkC92Z/9M/.7VI8XYAvXS','808a1779-1195-11f1-90bd-10ffe033f025','2026-02-25 16:26:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-26 22:16:28
