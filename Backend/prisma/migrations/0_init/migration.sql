-- CreateTable
CREATE TABLE `brands` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `criteria` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `atribut` ENUM('cost', 'benefit') NOT NULL,
    `default_bobot` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `founders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foto` VARCHAR(255) NULL,
    `nama` VARCHAR(100) NOT NULL,
    `status` VARCHAR(150) NOT NULL,
    `universitas` VARCHAR(150) NOT NULL,
    `framework` VARCHAR(150) NOT NULL,
    `username_ig` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `github` VARCHAR(100) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `criteria_value` (
    `id` INTEGER NOT NULL,
    `label` VARCHAR(100) NOT NULL,
    `nilai` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `criteria_id` INTEGER NOT NULL,

    INDEX `criteria_value_criteria_FK`(`criteria_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(100) NULL,
    `harga` INTEGER NOT NULL,
    `ram` INTEGER NOT NULL,
    `penyimpanan` INTEGER NOT NULL,
    `baterai` INTEGER NOT NULL,
    `update_os` INTEGER NOT NULL,
    `resolusi_kamera` INTEGER NOT NULL,
    `chipset` VARCHAR(100) NOT NULL,
    `os` VARCHAR(50) NOT NULL,
    `tahun_rilis` DATETIME(0) NOT NULL,
    `fast_charging` VARCHAR(50) NOT NULL,
    `display` VARCHAR(100) NOT NULL,
    `foto` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `brands_id` INTEGER NOT NULL,

    INDEX `products_brands_FK`(`brands_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recommendation_session` (
    `id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `recommendation_session_user_FK`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembobotan` (
    `id` INTEGER NOT NULL,
    `nilai_bobot` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `recommendation_session_id` INTEGER NOT NULL,
    `criteria_id` INTEGER NOT NULL,

    INDEX `pembobotan_criteria_FK`(`criteria_id`),
    INDEX `pembobotan_recommendation_session_FK`(`recommendation_session_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_preferences` (
    `id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `recommendation_session_id` INTEGER NOT NULL,
    `criteria_value_id` INTEGER NOT NULL,

    INDEX `user_preferences_criteria_value_FK`(`criteria_value_id`),
    INDEX `user_preferences_recommendation_session_FK`(`recommendation_session_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('admin', 'customers') NOT NULL DEFAULT 'customers',
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `user_email_UN`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `criteria_value` ADD CONSTRAINT `criteria_value_criteria_FK` FOREIGN KEY (`criteria_id`) REFERENCES `criteria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_brands_FK` FOREIGN KEY (`brands_id`) REFERENCES `brands`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recommendation_session` ADD CONSTRAINT `recommendation_session_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pembobotan` ADD CONSTRAINT `pembobotan_criteria_FK` FOREIGN KEY (`criteria_id`) REFERENCES `criteria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pembobotan` ADD CONSTRAINT `pembobotan_recommendation_session_FK` FOREIGN KEY (`recommendation_session_id`) REFERENCES `recommendation_session`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_preferences` ADD CONSTRAINT `user_preferences_criteria_value_FK` FOREIGN KEY (`criteria_value_id`) REFERENCES `criteria_value`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_preferences` ADD CONSTRAINT `user_preferences_recommendation_session_FK` FOREIGN KEY (`recommendation_session_id`) REFERENCES `recommendation_session`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

