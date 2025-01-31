<?php

namespace App\Controller;

use App\Repository\BetRepository;
use App\Entity\Bet;
use App\Repository\UserRepository;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/bet')]
class BetController extends AbstractController
{
    #[Route('/all', name: 'app_bet', methods: ['GET'])]
    public function index(BetRepository $betRepository, SerializerInterface $serializer): JsonResponse
    {
        $bets = $betRepository->findAll();
        $allbets = $serializer->serialize($bets, 'json');
        return new JsonResponse($allbets, 200, [], true);
    }

    #[Route('/user/{id}', name: 'app_bet_user', methods: ['GET'])]
    public function show(BetRepository $betRepository, UserRepository $userRepository, SerializerInterface $serializer, $id): JsonResponse
    {
        $user = $userRepository->find($id);
        $bet = $betRepository->findBy(['user' => $user]);
        $bet = $serializer->serialize($bet, 'json');
        $data = json_decode($bet, true); // Decode JSON into an associative array

        // Remove the "user" entry from each object
        foreach ($data as &$bet) {
            unset($bet['user']);
        }

        // Re-encode the modified data back to JSON
        $bet = json_encode($data, JSON_PRETTY_PRINT);
        return new JsonResponse($bet, 200, [], true);
    }

    #[Route('/new', name: 'app_bet_create', methods: ['POST'])]
    public function create(EntityManagerInterface $entityManager, SerializerInterface $serializer, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $entityManager->getRepository(User::class)->findOneBy(['userEmail' => $data['email']]);
        $bet = new Bet();
        $bet->setUser($user);
        $bet->setBetDate(new \DateTime($data['betDate']));
        $bet->setBetGame($data['betGame']);
        $bet->setBetWin($data['betWin']);
        $bet->setBetAmount($data['betAmount']);
        $bet->setBetOdd($data['betOdd']);
        $entityManager->persist($bet);
        $entityManager->flush();
        $user->setUserCredit($user->getUserCredit()+$bet->getBetAmount()*$bet->getBetOdd());
        $entityManager->persist($user);
        $entityManager->flush();
        $userData = [
            'firstname' => $user->getUserFirstname(),
            'lastname' => $user->getUserLastname(),
            'email' => $user->getUserEmail(),
            'credit' => $user->getUserCredit(),
        ];

        return new JsonResponse([
            'message' => 'Paris ajouté avec succès',
            'user' => $userData,
        ], JsonResponse::HTTP_OK);
    }
}
