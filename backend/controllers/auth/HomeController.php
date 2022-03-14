<?php

namespace backend\controllers\auth;

use yii\filters\auth\HttpBearerAuth;
use yii\rest\Controller as ControllerRest;
use yii\web\Response;
use yii\web\Controller;

class HomeController extends Controller
{

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::className(),
            'except' => ['index', 'login']
        ];
        return $behaviors;
    }


    public function actionIndex()
    {
        return 'index page';
    }

    public function actionLogin()
    {
        $result = ['message' => 'home/login'];

        return 'text';
    }



}
