<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;

class TrackController extends ActiveController
{
    public $modelClass = 'app\models\Tracks';

    public function checkAccess($action, $model = null, $params = [])
    {
        if (Yii::$app->user->isGuest) {
            throw new \yii\web\ForbiddenHttpException(sprintf('You can only %s articles that you\'ve created.', $action));
        }
    }

    public function actionUploadtrack() {
        //first upload to tmp dir
        $uploadDir = UPLOAD_TRACKS_DIR.'tmp/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir);
        }

        $uploadFilePath = $uploadDir . basename($_FILES['trackFile']['name']);
        $result = move_uploaded_file($_FILES['trackFile']['tmp_name'], $uploadFilePath);
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $response = ['status'=>$result];
        return $response;
    }
}