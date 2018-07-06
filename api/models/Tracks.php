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

    public function beforeDelete() {

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

    public function afterSave($insert, $changedAttributes) {
        parent::afterSave($insert, $changedAttributes);

        if($insert) {
            $fileName = $this->fileName;
            //move file from tmp directory to upload
            if (is_file(UPLOAD_TRACKS_DIR.'tmp/'.$fileName)) {
                rename(UPLOAD_TRACKS_DIR.'tmp/'.$fileName, UPLOAD_TRACKS_DIR.$fileName);
                foreach (scandir(UPLOAD_TRACKS_DIR.'tmp/') as $item) {
                    if ($item == '.' || $item == '..') {
                        continue;
                    }
                    if (is_file(UPLOAD_TRACKS_DIR.'tmp/'.$item)) {
                        unlink(UPLOAD_TRACKS_DIR.'tmp/'.$item);
                    }
                }
            }
        }
    }

    public function afterDelete() {
        parent::afterDelete();
        $fileName = $this->fileName;

        if (is_file(UPLOAD_TRACKS_DIR.$fileName)) {
           rename(UPLOAD_TRACKS_DIR.$fileName, REMOVED_TRACKS_DIR.$fileName);
        }

    }

}
