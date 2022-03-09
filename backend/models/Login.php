<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

class Login extends ActiveRecord
{

    public static function tableName()
    {
        return 'a_user';
    }

    public function rules() 
    {
        return [
            [['phone', 'password'], 'required'],
            [['phone'], 'string', 'max' => 11],
            [['password'], 'string', 'max' => 255],
        ];
    }

}
