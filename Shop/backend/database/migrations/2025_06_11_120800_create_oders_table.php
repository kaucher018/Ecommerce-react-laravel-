<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('oders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->double('subtotal',10,2);
            $table->double('grand_total',10,2);
            $table->double('shipping',10,2);
            $table->double('discount',10,2)->nullable();
            $table->enum('payment_status', ['paid', 'not paid'])->default('not paid');
            $table->enum('status', ['pending', 'shipped', 'delivered', 'canceled'])->default('pending');
            $table->string('name');
            $table->string('email');
            $table->string('mobile');
            $table->string('address');
           
             $table->string('city');
              $table->string('zip');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oders');
    }
};
