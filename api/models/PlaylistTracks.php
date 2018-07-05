<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "playlist_tracks".
 *
 * @property int $id
 * @property int $playlist_id
 * @property int $track_id
 *
 * @property Playlists $playlist
 * @property Tracks $track
 */
class PlaylistTracks extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'playlist_tracks';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['playlist_id', 'track_id'], 'required'],
            [['playlist_id', 'track_id'], 'integer'],
            [['playlist_id'], 'exist', 'skipOnError' => true, 'targetClass' => Playlists::className(), 'targetAttribute' => ['playlist_id' => 'id']],
            [['track_id'], 'exist', 'skipOnError' => true, 'targetClass' => Tracks::className(), 'targetAttribute' => ['track_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'playlist_id' => 'Playlist ID',
            'track_id' => 'Track ID'
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPlaylist()
    {
        return $this->hasOne(Playlists::className(), ['id' => 'playlist_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTrack()
    {
        return $this->hasOne(Tracks::className(), ['id' => 'track_id']);
    }

}
