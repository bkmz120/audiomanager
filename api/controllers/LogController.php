<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\filters\AccessControl;

class LogController extends ActiveController
{
    public $modelClass = 'app\models\Logs';

    public function checkAccess($action, $model = null, $params = [])
    {
        if (Yii::$app->user->isGuest) {
            throw new \yii\web\ForbiddenHttpException(sprintf('ForbiddenHttpException.', $action));
        }
    }

    public function actionClear() {
        \app\models\Logs::deleteAll();
    }

    public function actionCsv() {
        $filename = "history".date("d-m-Y").".csv";

        $logs = \app\models\Logs::find()->all();
        $output = "";
        foreach ($logs as $log) {
            $lineItems = json_decode($log->log);
            $output_line = "";
            for($i=0;$i<count($lineItems);$i++) {
                $output_line .= $lineItems[$i];
                if ($i!=count($lineItems)-1) {
                    $output_line .= ';';
                }
            }
            $output .= $output_line."\n\r";
            $output .= $output_line."\n\r";
        }

        return Yii::$app->response->sendContentAsFile($output,$filename);
    }

}