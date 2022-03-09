<?php

namespace backend\controllers;

use Yii;
use app\models\Login;
use app\models\User;
use backend\components\filters\BearerFilter;
use backend\controllers\CentralRestController;

class SiteController extends CentralRestController
{
    //public $enableCsrfValidation = false;

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
            'except' => ['index', 'login', 'signup', 'guestpath', 'options']
        ];

        return $behaviors;
    }


    // TODO позже рассмотреть подробнее способы использования
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }


    public function actionIndex()
    {
        return $this->render('index');
    }


    /*
    * Регистрация
    */
    public function actionSignup()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $model = new User();

        // если же сделать GET запрос, то в ответ придёт null, надо это указать в коде
        if (Yii::$app->request->isPost) {
            $model->first_name = $_POST['first_name'];
            $model->surname = $_POST['surname'];
            $model->phone = $_POST['phone'];
            $model->email = $_POST['email'];
            $model->password = $_POST['password'];
            $model->register_date = date('d-m-Y-H:i:s');
            $model->role = User::ROLE_MANAGER;


            if ($model->validate()) {
                Yii::$app->response->setStatusCode(201);
                $model->save();
                $data = $model::findOne(
                    ['phone' => $model->phone]
                );
                return [
                    'id' => $data['id'],
                    'register_date' => $data['register_date']
                ];

            } else {
                Yii::$app->response->setStatusCode(422);
                return $model->getErrors();
            }
        }

    }

    /*
    * Авторизация
    */
    public function actionLogin()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        // инициализируется объект Login
        $model = new Login();

        // если пришел POST запрос, то выполняется следующий код
        if (Yii::$app->request->isPost) {
            // значение из POST запроса сохраняется в переменные phone и password
            // но данные не сохраняются в БД, а просто хранятся в объекте
            $model->phone = $_POST['phone'];
            $model->password = $_POST['password'];

            // в переменную $user записывается найденный массив из класса User через статическую функцию
            $user = User::findOne([
                'phone' => $model->phone
            ]);

            // если не проходит валидация данных, то в ответ должен вернуться HTTP код 422
            // и список ошибок
            if (!$model->validate()) {
                Yii::$app->response->setStatusCode(422);
                return $model->getErrors();
            }

            // если не нашлась запись по номеру телефона
            // и значение пароля в запросе не совпадает с тем, что в БД
            // то возвращается ошибка 404 и соответствующее сообщение
            if (empty($user) || $model->password !== $user['password']) {
                Yii::$app->response->getStatusCode(404);
                return 'Incorrect login or password';
            } else {
                // теперь ищется юзер чтобы по нему сгенерировать токен и записать в БД
                $user = User::findOne($user['id']);

                // генерируется csrf токен и обрезается до 20 символов
                $token = substr(Yii::$app->getRequest()->getCsrfToken(), 0, 20);

                // запись токена в модель
                $user->token = $token;
                // сохранение модели в БД для данного юзера. Параметр false говорит о том, что валидация отключается
                $user->save(false);


                return ['token' => $user->token];

            }
        }
        // TODO: дописать return до корректного отображения
    }


    // если обратиться через GET запрос, то перекинет на экшен login
    public function actionLogout()
    {
        // берётся токен из заголовка
        $token = Yii::$app->request->headers->get('Authorization');

        // обрезается строка с нуля и до 7 символа
        $token = substr($token, 7);

        // поиск пользователя по токену
        $user = User::findOne(['token' => $token]);

        // перезапись значения токена в объекте User
        $user->token = '';

        // сохранение значения
        $user->save(false);

        return 'You were successfully logged out';
    }

    public function actionGood()
    {

        // берётся токен из заголовка
        $token = Yii::$app->request->headers->get('Authorization');

        // обрезается строка с нуля и до 7 символа
        $token = substr($token, 7);

        $user = User::find()->where(['token' => $token])->one();

        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        // return ['message' => 'Congratulations it is work!'];

        
        return $user->token ?? 'User is not found';
    }

    public function actionGuest()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        return ['message' => 'for not authentificated users'];
    }






}
