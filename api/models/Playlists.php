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
            [['current'], 'integer'],
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
        ];
    }


    // public function behaviors()
    // {
    //     return [
    //         [
    //             'class' => \voskobovich\linker\LinkerBehavior::className(),
    //             'relations' => [
    //                 'tracks_ids' => [
    //                     'tracks',
    //                     'updater' => [
    //                         'viaTableAttributesValue' => [
    //                             'created_at' => function() {
    //                                 return new \yii\db\Expression('NOW()');
    //                             },
    //                         ],
    //                     ]
    //                 ]
    //             ],
    //         ],
    //     ];
    // }

    public function getTracks()
    {
        return $this->hasMany(Tracks::className(), ['id' => 'track_id'])
                    ->viaTable('playlist_tracks', ['playlist_id' => 'id']);

        // return $this->hasMany(Tracks::className(), ['id' => 'track_id'])
        //     ->via('playlisttracks');


    }

    public function getPlaylisttracks() {
        return $this->hasMany(PlaylistTracks::className(), ['playlist_id' => 'id']);
    }

    public function extraFields()
    {
        return [
            // field name is the same as the attribute name
            'tracks',
            'playlisttracks'
        ];
    }
}
