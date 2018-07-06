<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;

class BackgroundController extends ActiveController
{
    public $modelClass = 'app\models\Backgrounds';

    public function checkAccess($action, $model = null, $params = [])
    {
        if (Yii::$app->user->isGuest) {
            throw new \yii\web\ForbiddenHttpException(sprintf('You can only %s articles that you\'ve created.', $action));
        }
    }

    public function actionUploadfile() {
        //first upload to tmp dir
        $uploadDir = UPLOAD_BACKGROUNDS_DIR.'tmp/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir);
        }

        $uploadFilePath = $uploadDir . basename($_FILES['file']['name']);
        $result = move_uploaded_file($_FILES['file']['tmp_name'], $uploadFilePath);

        $response = ['status'=>$result];

        $size = getimagesize($uploadFilePath);
        $width = $size[0];
        $height = $size[1];

        if ($width != BACKGROUND_WIDTH || $height != BACKGROUND_HEIGHT) {
          $response['status'] = false;
          $response['message'] = 'Incorrect image resolution. Should be '.BACKGROUND_WIDTH.'*'.BACKGROUND_HEIGHT;
        }

        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        return $response;
    }


}