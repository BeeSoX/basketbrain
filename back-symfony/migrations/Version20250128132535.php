<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250128132535 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE user_id_seq CASCADE');
        $this->addSql('DROP INDEX uniq_identifier_login');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT "user_pkey"');
        $this->addSql('ALTER TABLE "user" ADD user_firstname VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD user_lastname VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD user_email VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD user_password VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD user_birthdate DATE NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD user_credit DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE "user" DROP login');
        $this->addSql('ALTER TABLE "user" DROP roles');
        $this->addSql('ALTER TABLE "user" DROP password');
        $this->addSql('ALTER TABLE "user" RENAME COLUMN id TO user_id');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649550872C ON "user" (user_email)');
        $this->addSql('ALTER TABLE "user" ADD PRIMARY KEY (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE user_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('DROP INDEX UNIQ_8D93D649550872C');
        $this->addSql('DROP INDEX user_pkey');
        $this->addSql('ALTER TABLE "user" ADD login VARCHAR(180) NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD roles JSON NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD password VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "user" DROP user_firstname');
        $this->addSql('ALTER TABLE "user" DROP user_lastname');
        $this->addSql('ALTER TABLE "user" DROP user_email');
        $this->addSql('ALTER TABLE "user" DROP user_password');
        $this->addSql('ALTER TABLE "user" DROP user_birthdate');
        $this->addSql('ALTER TABLE "user" DROP user_credit');
        $this->addSql('ALTER TABLE "user" RENAME COLUMN user_id TO id');
        $this->addSql('CREATE UNIQUE INDEX uniq_identifier_login ON "user" (login)');
        $this->addSql('ALTER TABLE "user" ADD PRIMARY KEY (id)');
    }
}
