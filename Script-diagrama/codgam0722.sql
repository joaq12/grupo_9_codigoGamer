-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: codgamdb
-- ------------------------------------------------------
-- Server version	8.0.29

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

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(55) NOT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Todos los Productos','1657318249405.jpeg'),(14,'Mouse','1657162884046.png'),(15,'Sillas Gammer','1657162918139.png'),(16,'Noteboooks','1657163157905.png'),(17,'Accesorios','1657163180213.png'),(18,'Microfonos','1657163209988.png'),(19,'Auriculares','1657163232235.png'),(20,'Parlantes','1657163285624.png'),(21,'PC Armadas','1657163380131.png'),(22,'Conectividad','1657163398646.png'),(23,'Teclados','1657163432783.png'),(24,'Joysticks','1657163479457.png'),(25,'Memorias','1657163531039.png'),(26,'Microprocesadores','1657163548787.png'),(27,'Fan Coolers','1657163591902.jpeg'),(28,'Ofertas','1657163739290.png'),(29,'Monitores','1657164008946.png'),(30,'Consolas','1657229647275.png');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(55) NOT NULL,
  `photo1` varchar(100) DEFAULT NULL,
  `photo2` varchar(100) DEFAULT NULL,
  `photo3` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `price` int NOT NULL,
  `shipping` tinyint DEFAULT '0',
  `discount` tinyint NOT NULL DEFAULT '0',
  `id_category` int NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `discountAply` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `category_idx` (`id_category`,`id`),
  KEY `product_idx` (`id`),
  CONSTRAINT `category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (19,'Mouse 1','1657164428783.png','1657164428783.png','1657164428784.png','Descripción de Mouse 1  ',1000,1,1,14,20,10),(24,'Mouse 2','1657199955742.png','1657199955743.png','1657199955744.png','descripción mouse 2',2000,1,1,14,20,0),(25,'Mouse 3','1657201273778.png','1657201273780.png','1657201273781.png','Descripción mouse 3',1250,1,1,14,50,15),(26,'Mouse 4','1657201841676.png','1657201841678.png','1657201841680.png','Descripción mouse 4',995,0,1,14,50,5),(27,'Silla Gammer 1','1657228515391.png','1657228515392.png','1657228515392.png','Descripción silla gamer 1 ',32000,1,0,15,20,0),(28,'Silla Gamer 2','1657228763451.png','1657228763452.png','1657228763453.png','Descripción silla gammer 2 ',26000,0,1,15,35,10),(29,'Silla Gamer 3','1657228993313.png','1657228993314.png','1657228993315.png','Descripción silla gammer 3',17999,1,0,15,50,0),(30,'Silla Gamer 4','1657229198929.png','1657229198930.png','1657229198930.png','Descripción silla gammer 4',35800,1,1,15,9,15),(31,'Notebook 1','1657229736409.png','1657229736410.png','1657229736410.png','Descripción notebook 1',95000,1,1,16,15,5),(32,'Notebook 2','1657229772998.png','1657229772998.png','1657229772999.png','Descripción notebook 2',250000,1,1,16,5,10),(33,'Notebook 3','1657229923261.png','1657229923261.png','1657229923262.png','Descripción notebook 3',120000,1,0,16,5,0),(34,'Accesorio 1','1657303125815.png','1657303125816.png','1657303125817.png','Descripción accesorio 1',600,0,0,17,50,0),(35,'Accesorio 2','1657303219976.png','1657303219976.png','1657303219980.png','Descripción accesorio 2',950,0,1,17,20,5),(36,'Accesorio 3','1657303325836.png','1657303325837.png','1657303325837.png','Descripción accesorio 2  ',600,1,0,17,40,0),(37,'Accesorio 4','1657303407081.png','1657303407081.png','1657303407082.png','Descripción accesorio 4  ',1200,1,1,17,20,8),(38,'Micrófono 1','1657744820673.png','1657744820677.png','1657744820678.png','Descripción micrófono 1',3850,1,0,18,50,0),(39,'Micrófono 2','1657745052573.png','1657745052579.png','1657745052581.png','Descripción micrófono 2',970,0,0,18,100,15),(40,'Micrófono 3','1657745376867.png','1657745376869.png','1657745376871.png','Descripción producto 3',2699,1,0,18,20,0),(41,'Micrófono 4','1657745554562.png','1657745504735.png','1657745504737.png','Descripción micrófono 4 ',1500,0,0,18,60,0),(42,'Auriculares 1','1657745731449.png','1657745731450.png','1657745731450.png','Descripción auriculares 1',9500,1,1,19,20,5),(43,'Auriculares 2','1657745842458.png','1657745842459.png','1657745842459.png','Descripción auriculares 2',3500,1,0,19,10,0),(44,'Auriculares 3','1657746219671.png','1657746219671.png','1657746219679.png','Descripción auriculares 3',2500,0,1,19,20,25),(45,'Auriculares 4','1657751690642.png','1657751690643.png','1657751690643.png','Descripción auriculares 4',6000,1,1,19,25,40),(46,'Notebook 4','1657751834129.png','1657751834130.png','1657751834130.png','Descripción Notebook 4',450000,1,1,16,55,12);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(55) NOT NULL,
  `lastName` varchar(55) NOT NULL,
  `dni` bigint NOT NULL,
  `bDate` date NOT NULL,
  `phone` bigint NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `email` varchar(70) NOT NULL,
  `password` char(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `userType` varchar(20) NOT NULL,
  `gender` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userType_idx` (`userType`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Usuario 1','db',34354878,'1988-06-15',2324548788,'1657434969414.jpg','primerusuario@gmail.com','$2a$10$jLY30yRzISMKi4j3ZlyZUu3KBTrAleUY9jJA2O3GCOrZKOMC8/uRa','Administrador','Masculino'),(2,'Rodrigo Ezequiel','Saccone',33498382,'1988-01-06',1165047598,'1657466643113.png','sacconerodrigoe@gmail.com','$2a$10$wYBEPPhQ8qwrkI6I4RKQ9u2gG6vNIqrekn8uLMaO0VsszwssCUTH2','Adminsitrador','Masculino');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-14 16:09:01
