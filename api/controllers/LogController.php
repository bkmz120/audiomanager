<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\filters\AccessControl;

class LogController extends ActiveController
{
    public function checkAccess($action, $model = null, $params = [])
    {
        if (Yii::$app->user->isGuest) {
            throw new \yii\web\ForbiddenHttpException(sprintf('You can only %s articles that you\'ve created.', $action));
        }
    }

    public $modelClass = 'app\models\Logs';

}