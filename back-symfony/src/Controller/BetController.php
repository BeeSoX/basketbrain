<?php

namespace App\Controller;

use App\Repository\BetRepository;
use App\Entity\Bet;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class BetController extends AbstractController
{
    #[Route('/bets', name: 'app_bet', methods: ['GET'])]
    public function index(BetRepository $betRepository, SerializerInterface $serializer): JsonResponse
    {
        $bets = $betRepository->findAll();
        $allbets = $serializer->serialize($bets, 'json');
        return new JsonResponse($allbets, 200, [], true);
    }

    #[Route('/bet', name: 'app_bet_create', methods: ['POST'])]
    public function create(EntityManagerInterface $entityManager, SerializerInterface $serializer, Request $request): JsonResponse
    {
        $data = $serializer->deserialize($request->getContent(), Bet::class, 'json');
        $bet = new Bet();
        $bet->setUser($this->getUser());
        $bet->setBetDate($data->getBetDate());
        $bet->setBetGame($data->getBetGame());
        $bet->setBetWin($data->getBetWin());
        $bet->setBetAmount($data->getBetAmount());
        $bet->setBetOdd($data->getBetOdd());

        $entityManager->persist($bet);
        $entityManager->flush();

        return new JsonResponse($serializer->serialize($bet, 'json'), Response::HTTP_CREATED, [], true);
    }
}
