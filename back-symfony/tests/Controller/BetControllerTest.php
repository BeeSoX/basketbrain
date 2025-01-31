<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class BetControllerTest extends WebTestCase
{

    public function testIndex(): void
    {

        $client = static::createClient();
        $client->request('GET', '/api/bet/all');
        $this->assertResponseIsSuccessful();
    }

    public function testShow(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/bet/user/1');
        $this->assertResponseIsSuccessful();
    }

    // public function testCreate(): void
    // {
    //     // create our http client (Guzzle)
    //     $client = new Client('http://localhost:8000', array(
    //         'request.options' => array(
    //             'exceptions' => false,
    //         )
    //     ));

    //     $nickname = 'ObjectOrienter' . rand(0, 999);
    //     $data = array(
    //         'nickname' => $nickname,
    //         'avatarNumber' => 5,
    //         'tagLine' => 'a test dev!'
    //     );

    //     $request = $client->post('/api/programmers', null, json_encode($data));
    //     $response = $request->send();
    // }
}
