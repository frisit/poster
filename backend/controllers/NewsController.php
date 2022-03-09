<?php

namespace backend\controllers;

use Yii;
use app\models\News;
use yii\rest\ActiveController;
use yii\rest\Controller;
use yii\filters\AccessControl;

//class NewsController extends ActiveController
class NewsController extends Controller
{
//    public $modelClass = News::class;
    //public $modelClass = 'app\models\News'; //можно написать как сверху, а можно здесь, результат будет тот же

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'actions' => ['index'],
                        'allow' => true,
                        'roles' => ['?'],
                        'verbs' => ['GET', 'POST']
                    ],
                    [
                        'actions' => ['index'],
                        'allow' => true,
                        'roles' => ['@'],
                        'verbs' => ['GET', 'POST']
                    ],
                ],
            ]
        ];
    }


    public function actionIndex()
    {
//        $response = Yii::$app->getResponse();
//        $response->format = $response::FORMAT_JSON; //почему-то этот параметр не срабатывает...
//        return $response;

//        \Yii::$app->request->post();
//        $request = json_decode(\Yii::$app->request->post());

//        Yii::info("text $request", 'dev-logs');

        $data = [];
        $isPost = \Yii::$app->request->isPost;
        $isGet = \Yii::$app->request->isGet;

        if ($isGet) {
            $data = News::find()->asArray()->all();
        } elseif ($isPost) {
            $postData = json_decode(\Yii::$app->request->post());

            Yii::info("text $postData", 'dev-logs');
        }


        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        return $data;
    }

    public function actionTest()
    {

        // Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $arr = [
            'information' => ['name' => 'Vasya'],
            'coordinats' => ['phone' => 8912124124],
        ];

        return $arr;
    }
}