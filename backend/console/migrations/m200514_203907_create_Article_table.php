<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%Article}}`.
 */
class m200514_203907_create_Article_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%Article}}', [
            'id' => $this->primaryKey(),
            'date' => $this->date(),
            'dateUpdate' => $this->dateTime(),
            'title' => $this->text()->notNull(),
            'description' => $this->text()->notNull(),
            'content' => $this->text()->notNull(),
            'tags' => $this->json(),
            'category' => $this->text(),
            'accessAdmin' => $this->boolean(),
            'accessClient' => $this->boolean(),
            'accessBuyer' => $this->boolean(),
            'accessPlaner' => $this->boolean(),
            'accessPrintManager' => $this->boolean(),
            'accessContractor' => $this->boolean(),
        ]);

        $this->batchInsert('Article', ['date', 'dateUpdate', 'title', 'description', 'content', 'tags', 'category', 'accessClient', 'accessBuyer', 'accessPlaner', 'accessPrintManager', 'accessContractor'],
            [['2020-05-01', '2020-05-01', 'Первая статья', 'Дескрипшн к статье', 'Контент статьи', 'json', 'general', '1', '1', '1', '1', '1']]);


    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%Article}}');
    }

}
