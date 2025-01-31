<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


#[Route('/api/user')]
class UserController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;
    private UserPasswordHasherInterface $passwordHasher;



    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        SerializerInterface $serializer
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->serializer = $serializer;
    }



    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
         var_dump($data);

        if (!isset($data['email'], $data['password'])) {
            return new JsonResponse(['message' => 'Email et mot de passe requis'], JsonResponse::HTTP_BAD_REQUEST);
        }

         $user = new User();
         $user->setUserEmail($data['email']);
         $user->setUserPassword($this->passwordHasher->hashPassword($user, $data['password']));
         $user->setUserFirstname($data['firstname'] ?? '');
         $user->setUserLastname($data['lastname'] ?? '');
         $user->setUserBirthdate(new \DateTime($data['birthdate'] ?? '2000-01-01'));
         $user->setUserCredit(0.0); // Par défaut
         $this->entityManager->persist($user);
         $this->entityManager->flush();

        return new JsonResponse(['message' => json_encode($data)], JsonResponse::HTTP_CREATED);
    }

    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['password'])) {
            return new JsonResponse(['message' => 'Email et mot de passe requis'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['userEmail' => $data['email']]);

        if (!$user || !$this->passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['message' => 'Identifiants invalides'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse([
            'message' => 'Connexion réussie',
            'user' => $this->serializer->normalize($user, null, ['groups' => 'user:read'])
        ], JsonResponse::HTTP_OK);
    }

    #[Route('/me', name: 'user_profile', methods: ['GET'])]
    public function getProfile(UserInterface $user): JsonResponse
    {
        return new JsonResponse([
            'user' => $this->serializer->normalize($user, null, ['groups' => 'user:read'])
        ]);
    }
}
