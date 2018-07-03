<?php

namespace app\controllers;

use yii\rest\ActiveController;

class BackgroundController extends ActiveController
{
    public $modelClass = 'app\models\Backgrounds';

    public function actionUploadfile() {
        $uploadDir = UPLOAD_BACKGROUNDS_DIR;
        $uploadFilePath = $uploadDir . basename($_FILES['file']['name']);
        $result = move_uploaded_file($_FILES['file']['tmp_name'], $uploadFilePath);
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $response = ['status'=>$result];
        return $response;
    }


}