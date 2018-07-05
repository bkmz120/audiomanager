<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "backgrounds".
 *
 * @property int $id
 * @property string $title
 * @property string $fileName
 */
class Backgrounds extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'backgrounds';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title', 'fileName'], 'required'],
            [['title', 'fileName'], 'string', 'max' => 255],
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
            'fileName' => 'File Name',
        ];
    }

    public function afterSave($insert, $changedAttributes)
    {
        parent::afterSave($insert, $changedAttributes);
        if($insert)
        {
            Yii::$app->db->createCommand()
                ->update('playlists', ['backgrounds_changed' => 1], 'current = 1')
                ->execute();
        }
    }

    public function afterDelete()
    {
        parent::afterDelete();

        Yii::$app->db->createCommand()
                ->update('playlists', ['backgrounds_changed' => 1], 'current = 1')
                ->execute();

    }
}
