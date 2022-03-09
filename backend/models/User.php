<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use \yii\web\IdentityInterface;

class User extends ActiveRecord implements IdentityInterface
{
    public const ROLE_MANAGER = 'manager';

    public static function tableName()
    {
        return 'a_user';
    }

    public function rules()
    {
        return [
            [['first_name', 'surname', 'phone', 'password', 'role'], 'required'],
            [['first_name', 'surname', 'email'], 'string', 'max' => 80],
            [['phone'], 'string', 'max' => 11],
            [['phone'], 'unique'],
            [['email'], 'email'],
            [['password'], 'string', 'max' => 255],
            [['register_date'], 'string', 'max' => 50],
            [['token'], 'string', 'max' => 20],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => 'id',
            'first_name' => 'First name',
            'surname' => 'Surname',
            'phone' => 'Phone',
            'email' => 'Email',
            'password' => 'Password',
            'register_date' => 'Register Date',
            'token' => 'Token',
            'role' => 'User role'
        ];
    }

    public static function findIdentity($id)
    {
        echo 'text';
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return User::findOne(['token' => $token]);
    }

    public function getId()
    {

    }

    public function getAuthKey()
    {

    }

    public function validateAuthKey($authKey)
    {

    }

}
