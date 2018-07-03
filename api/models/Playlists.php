<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "playlists".
 *
 * @property int $id
 * @property string $name
 * @property int $current
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
            [['name'], 'required'],
            [['current'], 'integer'],
            [['name'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'current' => 'Current',
        ];
    }

    public function behaviors()
    {
        return [
            [
                'class' => \voskobovich\behaviors\ManyToManyBehavior::className(),
                'relations' => [
                    'tracks_ids' => 'tracks'
                ],
            ],
        ];
    }

    public function getTracks()
    {
        return $this->hasMany(Tracks::className(), ['id' => 'track_id'])
                    ->viaTable('playlist_tracks', ['playlist_id' => 'id']);
    }

    public function extraFields()
    {
        return [
            // field name is the same as the attribute name
            'tracks'
        ];
    }
}
