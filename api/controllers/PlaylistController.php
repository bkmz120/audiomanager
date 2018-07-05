<?php

namespace app\controllers;

use yii\rest\ActiveController;
use app\models\Playlists;
use yii\helpers\Json;

class PlaylistController extends ActiveController
{
    public $modelClass = 'app\models\Playlists';

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['view']);
        return $actions;
    }

    public function actionView($id){
      $playlist = Playlists::find()->where(['id'=>$id])->with('playlisttracks.track')->asArray()->one();

      $playlist['tracks'] = [];
      foreach ($playlist['playlisttracks'] as $key=>$playlisttrack) {
        $track = $playlisttrack['track'];
        $track['idInPlaylist'] = $playlisttrack['id'];
        $playlist['tracks'][] = $track;
      }

      unset($playlist['playlisttracks']);

      \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
      return $playlist;
    }

    public function actionTest() {
      $playlists = Playlists::find()->with('playlisttracks.track')->asArray()->all();

      \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
      return $playlists;
    }


}