CREATE TABLE `Artists`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Cover_img` TEXT NOT NULL,
    `Upload_at` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);
CREATE TABLE `Albums`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Artist_id` INT NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Created_at` DATETIME NOT NULL,
    `Upload_at` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);
CREATE TABLE `Songs`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Youtube_link` TEXT NOT NULL,
    `Album_id` INT NOT NULL,
    `Artist_id` INT NOT NULL,
    `Title` VARCHAR(255) NOT NULL,
    `Length` TIME NOT NULL,
    `track_number` INT NOT NULL,
    `Lyrics` TEXT NOT NULL,
    `Created_at` DATE NOT NULL,
    `Upload_at` DATETIME NOT NULL,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`Album_id`) REFERENCES Albums (`id`)
    );
CREATE TABLE `Playlists`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `Cover_img` TEXT NOT NULL,
    `Created_at` DATETIME NOT NULL,
    `Upload_at` DATETIME NOT NULL,
    `List_of_songs` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);
CREATE TABLE `Users`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Name` TEXT NOT NULL,
    `Email` TEXT NOT NULL,
    `Upload_at` DATETIME NOT NULL,
    `Password` TEXT NOT NULL,
    `Is_admin` TINYINT(1) NOT NULL,
    `Preferences` TEXT NOT NULL,
    `Remember_token` TINYINT(1) NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `Songs_in_playlists`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Playlist_id` INT NOT NULL,
    `Song_id` INT NOT NULL,
    PRIMARY KEY (`id`),
	FOREIGN KEY (`Playlist_id`) REFERENCES playlists (`id`),
    FOREIGN KEY (`Song_id`) REFERENCES songs (`id`)
);

CREATE TABLE `Intereactions`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `User_id` INT NOT NULL,
    `Song_id` INT NOT NULL,
    `Is_liked` TINYINT(1) NOT NULL,
    `Play_count` INT NOT NULL,
    `Created_at` DATETIME NOT NULL,	
    PRIMARY KEY (`id`),
	FOREIGN KEY (`User_id`) REFERENCES Users (`id`),
    FOREIGN KEY (`Song_id`) REFERENCES Songs (`id`)
);

CREATE TABLE `Songs_by_artists`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Artist_id` INT NOT NULL,
    `Song_id` INT NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`Artist_id`) REFERENCES Artists (`id`),
    FOREIGN KEY (`Song_id`) REFERENCES songs (`id`)
);
CREATE TABLE `User_playlists`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Playlist_id` INT NOT NULL,
    `User_id` INT NOT NULL,
    PRIMARY KEY (`id`),
	FOREIGN KEY (`User_id`) REFERENCES Users (`id`),
    FOREIGN KEY (`Playlist_id`) REFERENCES playlists (`id`)
);

CREATE TABLE `Albums_by_artists`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Artist_id` INT NOT NULL,
    `Albums_id` INT NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`Albums_id`) REFERENCES albums (`id`),
    FOREIGN KEY (`Artist_id`) REFERENCES artists (`id`)
);