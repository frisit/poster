<?php

namespace backend\components\filters;

use yii;
use yii\filters\auth\HttpBearerAuth;

class BearerFilter extends HttpBearerAuth
{
    public function handleFailure($response)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        Yii::$app->response->setStatusCode('403');

        return Yii::$app->response->data = [
            'message' => 'You need authorization'
        ];
    }
}







