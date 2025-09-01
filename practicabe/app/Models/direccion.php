<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class direccion extends Model
{
protected $table = 'direcciones';

protected $fillable = [
    'calle',
    'numero',
    'colonia',
    'ciudad',
    'estado',
    'codigo_postal'
    ];
}
