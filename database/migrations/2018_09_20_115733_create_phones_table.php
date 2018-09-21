<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('fio')->nullable();
            $table->string('position')->nullable();
            $table->string('phone')->nullable();
            $table->string('ip_phone')->nullable();
            $table->integer('building_id')->nullable()->unsigned();
            $table->integer('group_id')->nullable()->unsigned();
            $table->string('room')->nullable();
            $table->string('room_type')->nullable();
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
        Schema::dropIfExists('phones');
    }
}
