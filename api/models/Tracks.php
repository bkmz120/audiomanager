<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tracks".
 *
 * @property int $id
 * @property string $title
 * @property string $artist
 * @property string $description
 * @property string $fileName
 */
class Tracks extends \yii\db\ActiveRecord
{

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'tracks';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title', 'fileName'], 'required'],
            [['description'], 'string'],
            [['title', 'artist', 'fileName'], 'string', 'max' => 255],
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
            'artist' => 'Artist',
            'description' => 'Description',
            'fileName' => 'File Name',
        ];
    }

    public function getPlaylisttrack() {
        return $this->hasMany(PlaylistTracks::className(), ['track_id' => 'id']);
    }

    public function beforeDelete()
    {
        if (!parent::beforeDelete()) {
            return false;
        }

        //check is there the track in some playlist
        $playlistTracks = PlaylistTracks::find()
            ->where(['track_id'=>$this->id])
            ->all();

        $playlists = [];

        foreach ($playlistTracks as $key => $playlistTrack) {
            if (!isset($playlists[$playlistTrack->playlist_id])) {
                $playlist = Playlists::find()
                    ->where(['id'=> $playlistTrack->playlist_id])
                    ->one();
                $playlists[$playlistTrack->playlist_id] = $playlist;
            }

            $tracks_order = json_decode($playlists[$playlistTrack->playlist_id]->tracks_order);
            $new_tracks_order = [];
            foreach ($tracks_order as $key => $value) {
                if ($value!==$playlistTrack->id) {
                    $new_tracks_order[] = $value;
                }
            }

            $playlists[$playlistTrack->playlist_id]->tracks_order = json_encode($new_tracks_order);
        }

        foreach ($playlists as $key => $playlist) {
            $playlist->update();
        }

        return true;
    }

}
