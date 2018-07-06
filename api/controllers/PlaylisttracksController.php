<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;

class PlaylisttracksController extends ActiveController
{
    public $modelClass = 'app\models\PlaylistTracks';

    public function checkAccess($action, $model = null, $params = [])
    {
        if (Yii::$app->user->isGuest) {
            throw new \yii\web\ForbiddenHttpException(sprintf('ForbiddenHttpException.', $action));
        }
    }

}