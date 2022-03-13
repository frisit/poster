<?php

namespace backend\controllers;

use yii;
use app\models\User;
use backend\controllers\CentralRestController;

class AppController extends CentralRestController
{
    public function actionUserData()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $requestUsersToken = Yii::$app->request->headers->get('Authorization');
        $formattedToken = substr($requestUsersToken, 7);

        $user = User::find()->where(['token' => $formattedToken])->andWhere(['not', ['token' => null]])->one();

        if (!isset($user->token)) {
            return ['message' => 'User is not authorized'];
        }

        $usersData = [
            'name' => $user->getFirstName(),
            'surname' => $user->getSurname(),
            'role' => $user->getRole(),
            'email' => $user->getEmail(),
            'token' => $user->getToken()
        ];

        return $usersData;
    }
}