<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer', name: 'user_id')]
    private int $id;

    #[ORM\Column(type: 'string', length: 50, name: 'user_firstname')]
    private string $userFirstname;

    #[ORM\Column(type: 'string', length: 50, name: 'user_lastname')]
    private string $userLastname;

    #[ORM\Column(type: 'string', length: 50, unique: true, name: 'user_email')]
    private string $userEmail;

    #[ORM\Column(type: 'string', length: 255, name: 'user_password')]
    private string $userPassword;

    #[ORM\Column(type: 'date', name: 'user_birthdate')]
    private \DateTimeInterface $userBirthdate;

    #[ORM\Column(type: 'float', name: 'user_credit')]
    private float $userCredit;

    public function getId(): int
    {
        return $this->id;
    }

    public function getUserFirstname(): string
    {
        return $this->userFirstname;
    }

    public function setUserFirstname(string $userFirstname): self
    {
        $this->userFirstname = $userFirstname;

        return $this;
    }

    public function getUserLastname(): string
    {
        return $this->userLastname;
    }

    public function setUserLastname(string $userLastname): self
    {
        $this->userLastname = $userLastname;

        return $this;
    }

    public function getUserEmail(): string
    {
        return $this->userEmail;
    }

    public function setUserEmail(string $userEmail): self
    {
        $this->userEmail = $userEmail;

        return $this;
    }

    public function getUserPassword(): string
    {
        return $this->userPassword;
    }

    public function setUserPassword(string $userPassword): self
    {
        $this->userPassword = $userPassword;

        return $this;
    }

    public function getUserBirthdate(): \DateTimeInterface
    {
        return $this->userBirthdate;
    }

    public function setUserBirthdate(\DateTimeInterface $userBirthdate): self
    {
        $this->userBirthdate = $userBirthdate;

        return $this;
    }

    public function getUserCredit(): float
    {
        return $this->userCredit;
    }

    public function setUserCredit(float $userCredit): self
    {
        $this->userCredit = $userCredit;

        return $this;
    }

    public function getRoles(): array
    {
        return ['ROLE_USER'];
    }

    public function getSalt(): ?string
    {
        return null;
    }

    public function eraseCredentials(): void
    {
        // coucou
    }

    public function getUserIdentifier(): string
    {
        return $this->userEmail; // ... aucune idée mais il fait la tete sans cette fonction
    }
    public function getPassword(): ?string
    {
        return $this->userPassword;
    }
}
