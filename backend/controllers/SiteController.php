<?php

namespace backend\controllers;

use Yii;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
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
    
    /**
    * Регистрация
    */
    public function actionSignup()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $model = new User();

        if (Yii::$app->request->isPost) {
            $request = Yii::$app->request->post();

            $model->first_name = $request['first_name'];
            $model->surname = $request['surname'];
            $model->phone = $request['phone'];
            $model->email = $request['email'];
            $model->password = $request['password'];
            $model->register_date = date('d-m-Y-H:i:s');
            $model->role = User::ROLE_MANAGER;


            if ($model->validate()) {
                Yii::$app->response->setStatusCode(201);
                $model->save();
                $data = $model::findOne(['phone' => $model->phone]);
                return [
                    'id' => $data['id'],
                    'register_date' => $data['register_date']
                ];

            } else {
                Yii::$app->response->setStatusCode(422);
                return $model->getErrors();
            }
        }

        return ['message' => 'Incorrect data'];
    }

    /**
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
            $request = \Yii::$app->request->post();
//            var_dump($request);

            $model->email = $request['email'];
            $model->password = $request['password'];

            // в переменную $user записывается найденный массив из класса User через статическую функцию
            $user = User::findOne([
                'email' => $model->email
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
                Yii::$app->response->setStatusCode(404);
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


                $data = new Response();

                return ['token' => $user->token];

            }
        }

        return ['message' => [
           'error' => 'Invalid parameters'
        ]];
    }

    // если обратиться через GET запрос, то перекинет на экшен login

    /**
     *
     * @return string[]
     */
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

        // TODO: прописать вариант сообщения, в котором в случае успеха, очистится значение куки на фронтее
        return ['message' => 'You were successfully logged out'];
    }

    public function actionGetToken()
    {
        $token = Yii::$app->request->headers->get('Authorization');

        $user = User::find()->where(['token' => substr($token, 7)])->one();

        return 'Your users token is: ' . $user->token ?? 'User not found';
    }

    public function actionCheckAuth()
    {
        return ['message' => 'If yoy see this message, you is authorized'];
    }


}
