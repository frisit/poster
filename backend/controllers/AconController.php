<?php

namespace backend\controllers;

use Yii;
use yii\rest\ActiveController;

class AconController extends ActiveController
{
    public $modelClass = 'app\models\News';


    public function actions()
    {
        $actions = parent::actions();

        return $actions;
    }


    public function actionIndex()
    {
        return 'action index';
    }

    public function actionTest()
    {
        return 'test action';
    }

}

