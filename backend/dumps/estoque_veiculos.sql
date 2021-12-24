-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: estoque_veiculos
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `idMarca` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`idMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Cadillac'),(2,'Honda'),(3,'Saturn'),(4,'Dodge'),(5,'Kia'),(6,'Plymouth'),(7,'Lotus'),(8,'Ferrari'),(9,'GMC'),(10,'Ford'),(11,'Toyota'),(12,'Land Rover'),(13,'Mitsubishi'),(14,'Mercedes-Benz'),(15,'Infiniti'),(16,'Lamborghini'),(17,'Bugatti'),(18,'Peugeot'),(19,'Chevrolet'),(20,'Subaru');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelos`
--

DROP TABLE IF EXISTS `modelos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modelos` (
  `idModelo` int unsigned NOT NULL AUTO_INCREMENT,
  `idMarca` int unsigned NOT NULL,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`idModelo`),
  KEY `idMarca` (`idMarca`),
  CONSTRAINT `modelos_ibfk_1` FOREIGN KEY (`idMarca`) REFERENCES `marcas` (`idMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelos`
--

LOCK TABLES `modelos` WRITE;
/*!40000 ALTER TABLE `modelos` DISABLE KEYS */;
INSERT INTO `modelos` VALUES (1,1,'SRX'),(2,1,'CTS'),(3,2,'Civic'),(4,3,'VUE'),(5,4,'Lancer'),(6,4,'Neon'),(7,5,'Sportage'),(8,5,'Soul'),(9,5,'Cerato'),(10,6,'Laser'),(11,7,'128'),(12,7,'129'),(13,8,'F50'),(14,9,'Canyon'),(15,9,'Sierra'),(16,10,'Focus'),(17,11,'Supra'),(18,12,'Defender'),(19,13,'Eclipse'),(20,16,'Gallardo'),(21,2,'CRV'),(22,2,'Fit'),(23,2,'Accord'),(24,2,'City'),(25,3,'ION'),(26,3,'Relay'),(27,7,'Evora GT'),(28,7,'Evija'),(29,7,'Evora 400'),(30,4,'Dart'),(31,4,'Demon'),(32,4,'Diplomat'),(33,8,'488'),(34,8,'Portofino'),(35,8,'F8'),(36,10,'Mustang'),(37,10,'Ecosport'),(38,10,'KA'),(39,10,'Edge'),(40,11,'Corolla'),(41,11,'Etios'),(42,11,'S10'),(43,12,'Outlander'),(44,12,'Pajero'),(45,12,'ASX'),(46,16,'Murciélago'),(47,16,'Reventón');
/*!40000 ALTER TABLE `modelos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veiculos`
--

DROP TABLE IF EXISTS `veiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veiculos` (
  `idVeiculo` int unsigned NOT NULL AUTO_INCREMENT,
  `idMarca` int unsigned NOT NULL,
  `idModelo` int unsigned NOT NULL,
  `ano` int NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `vendido` tinyint NOT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`idVeiculo`),
  KEY `idMarca` (`idMarca`),
  KEY `idModelo` (`idModelo`),
  CONSTRAINT `veiculos_ibfk_1` FOREIGN KEY (`idMarca`) REFERENCES `marcas` (`idMarca`),
  CONSTRAINT `veiculos_ibfk_2` FOREIGN KEY (`idModelo`) REFERENCES `modelos` (`idModelo`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veiculos`
--

LOCK TABLES `veiculos` WRITE;
/*!40000 ALTER TABLE `veiculos` DISABLE KEYS */;
INSERT INTO `veiculos` VALUES (1,8,13,2000,'',0,'2020-10-12 00:41:49','2020-10-12 00:41:49'),(2,2,3,2003,'Carro preto',1,'2020-10-12 00:42:22',NULL),(3,13,19,1996,'Carro rebaixado e com neon',1,'2020-10-12 00:42:49',NULL),(4,16,20,2000,'Carro prateado',0,'2020-10-12 00:43:07',NULL),(5,1,1,2010,'Documentação atrasada.',0,'2020-10-12 00:43:31','2020-10-12 11:30:49'),(6,9,15,1985,'Carro clássico',1,'2020-10-12 00:43:55',NULL),(7,3,4,2006,'Aceito dinheiro ou troca',0,'2020-10-12 00:44:19',NULL),(8,10,16,2004,'Apenas dinheiro',0,'2020-10-12 00:44:33',NULL),(9,1,1,2005,'Em bom estado',0,'2020-10-12 10:04:02',NULL),(10,1,1,1997,'',0,'2020-10-05 18:30:32',NULL),(11,1,1,2003,'',0,'2020-10-07 02:26:34',NULL),(12,1,1,1989,'',0,'2020-10-05 09:01:27',NULL),(13,1,1,1991,'',0,'2020-10-05 12:23:46',NULL),(14,2,3,1986,'',0,'2020-10-05 12:45:30',NULL),(15,2,21,2004,'',0,'2020-10-05 07:01:49',NULL),(16,2,21,2007,'',0,'2020-10-05 21:07:18',NULL),(17,2,3,2007,'',1,'2020-10-05 02:16:19',NULL),(18,3,25,1986,'',0,'2020-10-06 19:28:42',NULL),(19,3,26,1993,'',0,'2020-10-05 17:25:02',NULL),(20,3,26,2014,'',0,'2020-10-06 14:04:47',NULL),(21,4,6,1994,'',0,'2020-10-05 23:58:43',NULL),(22,4,30,2003,'',0,'2020-10-07 22:10:42',NULL),(23,4,30,1984,'',1,'2020-10-08 04:11:18',NULL),(24,4,31,1981,'',0,'2020-10-08 14:56:59',NULL),(25,5,8,1984,'',0,'2020-10-06 19:36:56',NULL),(26,5,8,2009,'',1,'2020-10-05 06:36:00',NULL),(27,7,11,1994,'',0,'2020-10-06 04:36:48',NULL),(28,7,29,1991,'',1,'2020-10-07 20:01:05',NULL),(29,7,11,2010,'',1,'2020-10-06 09:26:44',NULL),(30,7,12,2002,'',0,'2020-10-08 17:41:30',NULL),(31,7,28,1996,'',0,'2020-10-06 05:27:29',NULL),(32,7,27,1984,'',1,'2020-10-06 00:12:19',NULL),(33,7,29,1983,'',1,'2020-10-07 10:05:32',NULL),(34,8,34,2001,'',1,'2020-10-07 07:59:23',NULL),(35,8,34,1990,'',1,'2020-10-06 07:20:15',NULL),(36,8,13,1997,'',0,'2020-10-07 03:02:30',NULL),(37,8,33,2012,'',1,'2020-10-06 09:26:55',NULL),(38,8,13,1983,'',0,'2020-10-08 04:20:21',NULL),(39,8,34,2000,'',0,'2020-10-07 13:26:47',NULL),(40,9,15,1999,'',0,'2020-10-06 01:22:46',NULL),(41,10,39,1999,'',0,'2020-10-05 08:04:09',NULL),(42,11,41,2008,'',0,'2020-10-06 16:39:21',NULL),(43,11,41,2017,'',1,'2020-10-05 04:10:55',NULL),(44,11,42,2018,'',0,'2020-10-08 15:26:08',NULL),(45,11,40,2008,'',0,'2020-10-06 16:38:58',NULL),(46,11,41,1994,'',1,'2020-10-08 16:31:58',NULL),(47,11,42,2010,'',1,'2020-10-06 20:43:43',NULL),(48,11,41,1998,'',1,'2020-10-07 00:50:22',NULL),(49,11,17,2003,'',0,'2020-10-06 16:41:16',NULL),(50,11,17,1991,'',1,'2020-10-05 19:16:37',NULL),(51,12,43,1981,'',0,'2020-10-08 23:36:21',NULL),(52,12,45,1984,'',0,'2020-10-07 09:56:53',NULL),(53,12,43,1992,'',1,'2020-10-06 20:27:15',NULL),(54,12,18,1989,'',0,'2020-10-07 14:58:34',NULL),(55,12,45,2001,'',0,'2020-10-06 11:51:41',NULL),(56,12,18,1986,'',1,'2020-10-05 04:26:26',NULL),(57,12,45,1982,'',1,'2020-10-07 23:35:53',NULL),(58,13,47,2006,'',1,'2020-10-05 09:17:29',NULL),(59,13,47,2003,'',1,'2020-10-05 17:41:23',NULL),(60,13,46,1993,'',0,'2020-10-05 14:10:42',NULL),(61,13,46,2019,'',0,'2020-10-05 07:33:46',NULL),(62,13,46,2019,'',0,'2020-10-05 04:03:33',NULL),(63,13,19,2018,'',0,'2020-10-05 01:11:39',NULL),(64,13,19,2002,'',0,'2020-10-07 16:06:50',NULL),(65,13,46,1993,'',0,'2020-10-06 22:49:42',NULL),(66,13,46,2003,'',0,'2020-10-06 23:16:01',NULL),(67,16,46,1992,'',0,'2020-10-08 00:38:34',NULL),(68,16,47,2013,'',0,'2020-10-05 06:42:32',NULL),(69,16,46,1992,'',0,'2020-10-07 19:49:41',NULL),(70,16,47,2013,'',0,'2020-10-07 09:04:21',NULL);
/*!40000 ALTER TABLE `veiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-12 13:04:55
