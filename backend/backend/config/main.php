<?php
$params = array_merge(
    require __DIR__ . '/../../common/config/params.php',
    require __DIR__ . '/../../common/config/params-local.php',
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'id' => 'app-backend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',
    'bootstrap' => ['log'],
    'modules' => [],
    'components' => [
        'request' => [
            'csrfParam' => '_csrf-backend',
        ],
        'user' => [
            //'identityClass' => 'common\models\User',  // TODO: разобраться
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
            'enableSession' => true,
            'identityCookie' => ['name' => '_identity-backend', 'httpOnly' => true],  //закомментил из-за видео
        ],
        'session' => [
            // this is the name of the session cookie used for login on the backend
            'name' => 'rest_t',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
                [
                    'class' => 'yii\log\FileTarget',
                    'categories' => ['dev-logs'],                   // чтобы данные записывались только при вызове категории test
                    'levels' => ['error', 'warning', 'info'],   // перечисление используемых методов
                    'logVars' => [],                            // отключить запись глобальных переменных
                    'logFile' => '@runtime/logs/dev-logs.log',  // файл в который будут сохраняться логи
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            //'enableStrictParsing' => false,// параметр задаёт строгое связывание адреса
            'showScriptName' => false,
            'rules' => [

                //'OPTIONS <action:\w+>' => 'options',
                //'OPTIONS api/<module:\w+>s/<action>' => 'api/default/options',
                ['class' => 'yii\rest\UrlRule', 'controller' => 'user'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'location'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'news'],
                //['class' => 'yii\rest\UrlRule', 'controller' => 'auth\home'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'article'],
                'index' => 'site/index',
                'signup' => 'site/signup',
                'login' => 'site/login',
                'logout' => 'site/logout',
                'get-token' => 'site/get-token',
                'check-auth' => 'site/check-auth',

                //попытка замутить active controller
                'acon' => 'acon/index',
                'acon/test' => 'acon/test',

                // app actions
                // TODO: перевести в одиночный action следующие методы
                'user-data' => 'app/user-data',

            ],
        ],
//         Нужен ли этот параметр? Прость он уже указан в 16-17 строках
//        'request' => [
//            'parsers' => [
//                'application/json' => 'yii\web\JsonParser',
//            ]
//        ],
    ],
    'params' => $params,
];
