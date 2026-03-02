-- CreateTable
CREATE TABLE `Url` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shortcode` VARCHAR(7) NOT NULL,
    `longUrl` TEXT NOT NULL,
    `clicks` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Url_shortcode_key`(`shortcode`),
    INDEX `Url_shortcode_idx`(`shortcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
