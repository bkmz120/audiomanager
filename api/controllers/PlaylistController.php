<?php

namespace app\controllers;

use yii\rest\ActiveController;
use app\models\Playlists;

class PlaylistController extends ActiveController
{
    public $modelClass = 'app\models\Playlists';

    public function actionUploadtrack() {
        echo "ok!";
    }

    public function actionTest() {
      $playlists = Playlists::find()->with('tracks')->all();
      var_dump($playlists);
    }


}