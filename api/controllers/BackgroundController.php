<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Playlists;

class BackgroundController extends ActiveController
{
    public $modelClass = 'app\models\Backgrounds';

    public function checkAccess($action, $model = null, $params = [])
    {
        if (Yii::$app->user->isGuest) {
            throw new \yii\web\ForbiddenHttpException(sprintf('ForbiddenHttpException.', $action));
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

    public function actionCheck_use_default_background() {
        $playlist = Playlists::find()
            ->where(['current'=>1])
            ->one();
        
        if ($playlist===null) {
            $response = ['status'=>true, 'usedefault'=>false, 'enableUsedefault'=>false];
        }
        else {
            if ($playlist->current_background_id===-1) {                
                $usedefault = true;
            }
            else {
                $usedefault = false;
            }

            $response = ['status'=>true, 'usedefault'=>$usedefault, 'enableUsedefault'=>true];            
        }
                
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        return $response;        
    }

    public function actionSet_use_default_background() {
        $request = \Yii::$app->request;
        $usedefault = $request->post('usedefault');

        $playlist = Playlists::find()
            ->where(['current'=>1])
            ->one();

        if ($playlist===null) {
            $response = ['status'=>true, 'usedefault'=>false,'enableUsedefault' => false];
        }
        else {
            if ($usedefault) {
                $playlist->current_background_id = -1;
            }
            else {
                $playlist->current_background_id = 0;
            }
            $playlist->update();

            $response = ['status'=>true, 'usedefault'=>$usedefault,'enableUsedefault' => true];
        }

        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        return $response;        
    }


}