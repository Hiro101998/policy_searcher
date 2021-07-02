<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePoliciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('policies', function (Blueprint $table) {
            $table->increments('policy_id');
            $table->integer('subject_id');
            $table->text('diploma_policy');
            $table->string('dp_url');
            $table->text('curriculum_policy');
            $table->string('cp_url');
            $table->text('admission_policy');
            $table->string('ap_url');
            $table->boolean('is_deleted')->default('0');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('policies');
    }
}
