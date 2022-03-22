<?php

namespace backend\controllers\standAloneActions;

//use yii\base\Action;
use yii\rest\Action;

class User extends Action
{
    public function run()
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        return ['message' => 'success'];
    }


}

