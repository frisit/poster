<?php

use yii\db\Migration;

class m200411_151018_create_news_table extends Migration
{
    /**
     * {@inheritdoc}
     */


    public function safeUp()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            // http://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%news}}', [
            'id' => $this->primaryKey(),
            'title' => $this->string()->notNull(),
            'content' => $this->text(),
            'category' => $this->text(),
        ], $tableOptions);

        $this->batchInsert('news', ['title', 'content', 'category'], [
            ['Название статьи', 'Текст', 'Общая информация'],
            ['Вторая статья', 'И её текст', 'Общая информация'],
            ['Третья статья', 'А так же её текст', 'Общая информация'],
            ['Четвёртая статья', 'Что ещё? Конечно, текст', 'Общая информация']
        ]);

        $this->execute("INSERT INTO news VALUES(null, 'title', 'content', 'Общая информация')");
        //$this->execute('INSERT INTO news VALUES(null, "title", "content", "Общая информация")');
        $this->batchInsert('news', ['title', 'content', 'category'], [['Одиночная статья', 'Статья одиночка', 'Общая информация']]);
        $this->execute(file_get_contents(__DIR__.'/first.sql'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%news}}');
    }
}
