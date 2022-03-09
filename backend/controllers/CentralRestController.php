<?php

namespace backend\controllers;

use backend\components\filters\BearerFilter;
use yii\rest\Controller;

class CentralRestController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        unset($behaviors['authenticator']);
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Access-Control-Allow-Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age' => 86400,
                'Access-Control-Expose-Headers' => [],

            ]
        ];
        $behaviors['authenticator'] = [
            // 'class' => Bearer::className(), //работающий bearer
            'class' => BearerFilter::className(),
            'except' => ['index', 'login', 'signup', 'guest', 'options']
        ];

        return $behaviors;
    }


}