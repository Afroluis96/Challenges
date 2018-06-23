# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.58)
# Database: week3Test
# Generation Time: 2018-06-22 20:34:47 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table movies
# ------------------------------------------------------------

create schema Test;

use Test;

DROP TABLE IF EXISTS `movies`;

CREATE TABLE `movies` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `rated` varchar(30) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `genre` varchar(250) DEFAULT NULL,
  `directedBy` varchar(250) DEFAULT NULL,
  `runtime` int(11) DEFAULT NULL,
  `enable` tinyint(1) DEFAULT NULL,
  `favs` int DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;

INSERT INTO `movies` (`id`, `name`, `rated`, `description`, `genre`, `directedBy`, `runtime`, `enable`)
VALUES
	(1,'Pacific Rim Uprising','PG-13','John Boyega (Star Wars: The Force Awakens) stars as the rebellious Jake Pentecost, a once-promising Jaeger pilot whose legendary father gave his life to secure humanity\'s victory against the monstrous \"Kaiju.\" Jake has since abandoned his training on','Action & Adventure','Stevens S. DeKnight',111,1),
	(2,'Incredibles 2','PG','Everyone\'s favorite family of superheroes is back in \"Incredibles 2\"--but this time Helen (voice of Holly Hunter) is in the spotlight, leaving Bob (voice of Craig T. Nelson) at home with Violet (voice of Sarah Vowell) and Dash (voice of Huck Milner) ','Action & Adventure','Brad Bird',118,1),
	(3,'Solo: A Star Wars Story','PG','Board the Millennium Falcon and journey to a galaxy far, far away in Solo: A Star Wars Story, an all-new adventure with the most beloved scoundrel in the galaxy. Through a series of daring escapades deep within a dark and dangerous criminal underworl','Action & Adventure, Drama','Ron Howard',120,1),
	(4,'Deadpool 2','R','After surviving a near fatal bovine attack, a disfigured cafeteria chef (Wade Wilson) struggles to fulfill his dream of becoming Miami\'s hottest bartender, while also learning to cope with his lost sense of taste. Searching to regain his spice for li','Action & Adventure, Comedy','David Leitch',119,1),
	(5,'The Social Network','PG-13','\"The Social Network\" explores the moment at which Facebook, the most revolutionary social phenomena of the new century, was invented -- through the warring perspectives of the super-smart young men who each claimed to be there at its inception. The r','Drama','David Fincher',120,1),
	(6,'Avenger Infinity War','PG-13','An unprecedented cinematic journey ten years in the making and spanning the entire Marvel Cinematic Universe, Marvel Studios\' \"Avengers: Infinity War\" brings to the screen the ultimate, deadliest showdown of all time. The Avengers and their Super Her','Action & Adventure, Science Fiction & Fantasy','Anthony Russo',156,0),
	(7,'The little Prince','PG','Kung-fu Panda director Mark Osborne teams with producers Aton Soumache and Dimitri Rassam for this animated take on Antoine de Saint-Exupery\'s beloved novella about a pilot (voice of Jeff Bridges) who crash lands in the Sahara desert and encounters a','Animation, Science Fiction & Fantasy','Mark Osborne',106,1);

/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `secondName` varchar(50) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `firstName`, `secondName`, `password`)
VALUES
	(1,'jaimes.franco','Jaimes','Franco','jaimesfranco'),
	(2,'Tony.Stars','Tony','Stars','ironman'),
	(3,'mark.zuckerberg','Mark','Zuckerberg','facebook');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

CREATE TABLE `favorites` (
	`id` int(11) unsigned not null auto_increment,
    `id_user` int(11) unsigned not null,
    `id_movie` int(11) unsigned not null,
    `state` tinyint(1) default 0,
    FOREIGN KEY (`id_user`) REFERENCES `users`(`id`),
    FOREIGN KEY (`id_movie`) REFERENCES `movies`(`id`),
    PRIMARY KEY (`Id`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
