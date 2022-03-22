<?php

namespace backend\controllers;

use backend\components\filters\BearerFilter;
use yii\rest\Controller;

class RestController extends Controller
{
    // TODO: указать сюда все остальные behavoirs
    // TODO: Попрбовать сделать чтобы на входе получался symfony/http/request

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
            'except' => ['index', 'login', 'signup', 'guest', 'options', 'user-data']
        ];

        return $behaviors;
    }


}