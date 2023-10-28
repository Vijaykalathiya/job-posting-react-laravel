<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Job;

class JobTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->getJson('/api/job');
        $response->assertStatus(200);
    }

    public function testCreate() {
        $response = $this->postJson('/api/job', [
            'title' => 'Full Stack Developer',
            'description' => 'Job for Full Stack Developer',
            'salary' => 1990,
            'company' => 'Test Company'
        ]);
     
        $response->assertStatus(200)
                 ->assertJson([
                    'message' => 'Job created successfully.',
                    'data' => [
                        'title' => 'Full Stack Developer',
                        'description' => 'Job for Full Stack Developer',
                        'salary' => 1990,
                        'company' => 'Test Company'
                    ],
                    "success" => true
                ]);
    }

    public function testShow()
    {
        $job = factory(Job::class)->create();
        $response = $this->getJson('/api/job/' . $job->id);
        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'title' => $job->title,
                    'description' => $job->description,
                    'salary' => $job->salary,
                    'company' => $job->company
                ]
            ]);
    }

    public function testUpdate() {
        $job = factory(Job::class)->create();
        $response = $this->putJson('/api/job/' . $job->id, [
            'title' => 'Full Stack Developer',
            'description' => 'Job for Full Stack Developer',
            'salary' => 1990,
            'company' => 'Test Company'
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Job updated successfully.',
                'data' => [
                    'title' => 'Full Stack Developer',
                    'description' => 'Job for Full Stack Developer',
                    'salary' => 1990,
                    'company' => 'Test Company'
                ],
                "success" => true
            ]);
    }

    public function testDestroy()
    {
        $job = factory(Job::class)->create();
        $response = $this->deleteJson('/api/job/' . $job->id);
        $response->assertStatus(200)
            ->assertJson([
                "success" => true,
                "data" => [],
                "message" => "Job deleted successfully."
            ]);

        $this->assertDatabaseMissing('jobs', ['id' => $job->id]);
    }

    public function testCreateJobValidation()
    {
        $response = $this->postJson('/api/job', [
                'title' => '',
                'description' => ''
        ]);
        $response->assertStatus(422)
            ->assertJsonStructure([
                "data"=>
                    ["title", "description", "salary", "company"]
                ]
        );
    }
}
