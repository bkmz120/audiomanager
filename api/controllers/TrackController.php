<?php

namespace app\controllers;

use yii\rest\ActiveController;


class TrackController extends ActiveController
{
    public $modelClass = 'app\models\Tracks';

    public function actionUploadtrack() {
        $uploadDir = UPLOAD_TRACKS_DIR;
        $uploadFilePath = $uploadDir . basename($_FILES['trackFile']['name']);
        $result = move_uploaded_file($_FILES['trackFile']['tmp_name'], $uploadFilePath);
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $response = ['status'=>$result];
        return $response;
    }
}