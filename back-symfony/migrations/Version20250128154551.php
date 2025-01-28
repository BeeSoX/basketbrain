<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250128154551 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE bet (bet_id SERIAL NOT NULL, user_id INT NOT NULL, bet_date DATE NOT NULL, bet_game INT NOT NULL, bet_win BOOLEAN NOT NULL, bet_amount DOUBLE PRECISION NOT NULL, bet_odd DOUBLE PRECISION NOT NULL, PRIMARY KEY(bet_id))');
        $this->addSql('CREATE INDEX IDX_FBF0EC9BA76ED395 ON bet (user_id)');
        $this->addSql('CREATE TABLE "user" (user_id SERIAL NOT NULL, user_firstname VARCHAR(50) NOT NULL, user_lastname VARCHAR(50) NOT NULL, user_email VARCHAR(50) NOT NULL, user_password VARCHAR(50) NOT NULL, user_birthdate DATE NOT NULL, user_credit DOUBLE PRECISION NOT NULL, PRIMARY KEY(user_id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649550872C ON "user" (user_email)');
        $this->addSql('ALTER TABLE bet ADD CONSTRAINT FK_FBF0EC9BA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (user_id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE bet DROP CONSTRAINT FK_FBF0EC9BA76ED395');
        $this->addSql('DROP TABLE bet');
        $this->addSql('DROP TABLE "user"');
    }
}
