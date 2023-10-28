<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Job;
use Faker\Generator as Faker;

$factory->define(Job::class, function (Faker $faker) {
    return [
        'title' => "Full Stack Developer",
        'description' => "testing",
        'salary' => 1990,
        'company' => 'Test Company'
    ];
});
