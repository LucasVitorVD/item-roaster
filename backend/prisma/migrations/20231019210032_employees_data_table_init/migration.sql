-- CreateTable
CREATE TABLE `Epis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `epi` VARCHAR(191) NOT NULL,
    `ca` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeEpis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activity` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employees_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NULL DEFAULT false,
    `employeeName` VARCHAR(40) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NOT NULL,
    `gender` ENUM('M', 'F') NOT NULL,
    `birthDate` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `hasEpi` BOOLEAN NULL DEFAULT false,
    `employeeFile` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Employees_data_cpf_key`(`cpf`),
    UNIQUE INDEX `Employees_data_rg_key`(`rg`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeeEpisToEpis` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmployeeEpisToEpis_AB_unique`(`A`, `B`),
    INDEX `_EmployeeEpisToEpis_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeeEpisToEmployees_data` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmployeeEpisToEmployees_data_AB_unique`(`A`, `B`),
    INDEX `_EmployeeEpisToEmployees_data_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EmployeeEpisToEpis` ADD CONSTRAINT `_EmployeeEpisToEpis_A_fkey` FOREIGN KEY (`A`) REFERENCES `EmployeeEpis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeEpisToEpis` ADD CONSTRAINT `_EmployeeEpisToEpis_B_fkey` FOREIGN KEY (`B`) REFERENCES `Epis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeEpisToEmployees_data` ADD CONSTRAINT `_EmployeeEpisToEmployees_data_A_fkey` FOREIGN KEY (`A`) REFERENCES `EmployeeEpis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeEpisToEmployees_data` ADD CONSTRAINT `_EmployeeEpisToEmployees_data_B_fkey` FOREIGN KEY (`B`) REFERENCES `Employees_data`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
