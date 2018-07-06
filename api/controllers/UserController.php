<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use app\models\Users;

class UserController extends Controller
{
    public function actionLogin() {
        $request = \Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $username = $request->post('username');
        $password = $request->post('password');

        $identity = Users::findOne(['username' => $username]);

        if ($identity===null || !$identity->validatePassword($password)) {
            $response = [
                'status'=>false,
                'message'=>'Incorrect username or password'
            ];

            return $response;
        }

        $status = Yii::$app->user->login($identity, 60*60*24*365);

        $response = ['status'=>$status];
        return $response;
    }
}