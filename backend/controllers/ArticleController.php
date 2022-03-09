<?php
namespace backend\controllers;

use Yii;
use app\models\Article;
use yii\web\Controller;
use yii\web\Response;

class ArticleController extends Controller
{

    public function behaviors()
    {
        return [
            'access' => [
                'class' => \yii\filters\AccessControl::className(),
                'rules' => [
                    [
                        'allow' => false,
                        'roles' => ['?'],
                        'controllers' => ['admin/default'],
                        'actions' => ['user', 'data', 'index'],
                    ],
                    [
                        'allow' => true,
                        'roles' => ['@'],
                        'controllers' => ['admin/default'],
                        'actions' => ['user', 'data', 'index'],
                    ],
                ],
            ],
        ];
    }

    public function actionIndex()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        /*
         * до определения контроллера нужно добавить use yii\web\Response
         */
        $products = Article::find()->asArray()->all();

        Yii::info($products, 'dev-logs');

        return $products;
    }

    public function actionInsert()
    {
        $model = new Article();
        $model->title = 'Название статьи';
        $model->date = '2020-05-21 15:40:00';
        $model->dateUpdate = '2020-05-14 14:00:00';
        $model->description = 'Дескрипшн';
        $model->content = 'Тут будет моооре текста';
        $model->tags = 'tags';
        $model->category = 'general';
        $model->accessAdmin = '1';
        $model->accessClient = '1';
        $model->accessBuyer = '1';
        $model->accessPlaner = '1';
        $model->accessPrintManager = '1';
        $model->accessContractor = '1';
        $model->save();


        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $article_result = Article::find()->all();

        return $article_result;
    }
}
