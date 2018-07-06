<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Playlists;
use yii\helpers\Json;

class PlaylistController extends ActiveController
{
    public $modelClass = 'app\models\Playlists';

    public function checkAccess($action, $model = null, $params = [])
    {
        if (Yii::$app->user->isGuest) {
            throw new \yii\web\ForbiddenHttpException(sprintf('You can only %s articles that you\'ve created.', $action));
        }
    }

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


}