<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "playlists".
 *
 * @property int $id
 * @property string $title
 * @property int $current
 * @property string $tracks_order
 * @property int $current_track_num
 * @property int $playlist_changed
 * @property int $current_background_id
 * @property int $backgrounds_changed
 *
 * @property PlaylistTracks[] $playlistTracks
 */
class Playlists extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'playlists';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title', 'tracks_order'], 'required'],
            [['current','current_track_num','playlist_changed','current_background_id','backgrounds_changed'], 'integer'],
            [['tracks_order'], 'string'],
            [['title'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'current' => 'Current',
            'tracks_order' => 'Tracks Order',
            'current_track' => 'Current Track',
            'changed' => 'Changed'
        ];
    }

    public function getTracks()
    {
        return $this->hasMany(Tracks::className(), ['id' => 'track_id'])
                    ->viaTable('playlist_tracks', ['playlist_id' => 'id']);
    }

    public function getPlaylisttracks() {
        return $this->hasMany(PlaylistTracks::className(), ['playlist_id' => 'id']);
    }

    public function afterSave($insert, $changedAttributes)
    {
         parent::afterSave($insert, $changedAttributes);
         if(!$insert)
         {
            $needUpdate = false;
            //if playlist set as current than remove current flag from other playlist
            if ($changedAttributes['current']===0) {
                $playlists = Playlists::find()->where(['current' => 1])->all();
                foreach ($playlists as $key => $playlist) {
                    if ($playlist->id!==$this->id) {
                        $playlist->current = 0;
                        $playlist->update();
                    }
                }

                if ($this->current_track_num!=0) {
                    $this->current_track_num = 0;
                    $needUpdate = true;
                }

                if ($this->playlist_changed!=0) {
                    $this->playlist_changed = 0;
                    $needUpdate = true;
                }
            }

            //if playlist is current and tracks_order was changed set playlist_changed flag
            if ($this->current && isset($changedAttributes['tracks_order'])) {
                $this->playlist_changed = 1;
                $needUpdate = true;
            }

            if ($needUpdate) {
                $this->update();
            }
         }
    }
}
