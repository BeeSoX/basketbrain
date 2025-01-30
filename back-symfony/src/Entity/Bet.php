<?php

namespace App\Entity;

use App\Repository\BetRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BetRepository::class)]
class Bet
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer', name: 'bet_id')]
    private int $id;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'user_id', nullable: false, onDelete: 'CASCADE')]
    private User $user;

    #[ORM\Column(type: 'date', name: 'bet_date')]
    private \DateTimeInterface $betDate;

    #[ORM\Column(type: 'integer', name: 'bet_game')]
    private int $betGame;

    #[ORM\Column(type: 'boolean', name: 'bet_win')]
    private bool $betWin;

    #[ORM\Column(type: 'float', name: 'bet_amount')]
    private float $betAmount;

    #[ORM\Column(type: 'float', name: 'bet_odd')]
    private float $betOdd;


    public function getId(): int
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getBetDate(): \DateTimeInterface
    {
        return $this->betDate;
    }

    public function setBetDate(\DateTimeInterface $betDate): self
    {
        $this->betDate = $betDate;

        return $this;
    }

    public function getBetGame(): int
    {
        return $this->betGame;
    }

    public function setBetGame(int $betGame): self
    {
        $this->betGame = $betGame;

        return $this;
    }

    public function getBetWin(): bool
    {
        return $this->betWin;
    }

    public function setBetWin(bool $betWin): self
    {
        $this->betWin = $betWin;

        return $this;
    }

    public function getBetAmount(): float
    {
        return $this->betAmount;
    }

    public function setBetAmount(float $betAmount): self
    {
        $this->betAmount = $betAmount;

        return $this;
    }

    public function getBetOdd(): float
    {
        return $this->betOdd;
    }

    public function setBetOdd(float $betOdd): self
    {
        $this->betOdd = $betOdd;

        return $this;
    }

    public function isBetWin(): ?bool
    {
        return $this->betWin;
    }
}
