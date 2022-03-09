<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "news".
 *
 * @property int $id
 * @property string $title
 * @property string|null $content
 * @property string|null $category
 */
class News extends \yii\db\ActiveRecord
{

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'news';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
//            [['title'], 'required'],
            [['content', 'category'], 'string'],
            [['title'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON; //все способы обращения к модели будут возвращаться в JSON

        return [
            'id' => 'ID',
            'title' => 'Title',
            'content' => 'Content',
            'category' => 'Category',
        ];
    }
}
