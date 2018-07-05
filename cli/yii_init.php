<?php

defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV') or define('YII_ENV', 'dev');


require __DIR__ . '/../api/vendor/autoload.php';
require __DIR__ . '/../api/vendor/yiisoft/yii2/Yii.php';
require  __DIR__ . '/../config/audiomanager.php';


//require all models
foreach (scandir(__DIR__ . '/../api/models/') as $filename) {
    $path = __DIR__ . '/../api/models/' . $filename;
    if (is_file($path)) {
        require $path;
    }
}

$db = require __DIR__ . '/../config/db.php';

$config = [
    'id' => 'myapp',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'dsfsg',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
    ],
    'params' => [],
];


new yii\web\Application($config);


