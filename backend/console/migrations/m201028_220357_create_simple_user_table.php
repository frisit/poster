<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%simple_user}}`.
 */
class m201028_220357_create_simple_user_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%simple_user}}', [
            'id' => $this->primaryKey(),
            'username' => $this->string()->notNull()->unique(),
            'email' => $this->string()->notNull()->unique(),
            'firstName' => $this->string()->notNull(),
            'lastName' => $this->string()->notNull(),
            'isAdm' => $this->boolean()->notNull()->defaultValue(0),
            'roleType' => $this->smallInteger()->notNull()->defaultValue(1),
            'status' => $this->smallInteger()->notNull()->defaultValue(1),
            'createdAt' => $this->date(),
            'updatedAt' => $this->date(),
            'password' => $this->string(),
            'auth_key' => $this->string(32)->notNull(),
            'password_hash' => $this->string()->notNull(),
            'password_reset_token' => $this->string()->unique(),
        ]);

        $this->batchInsert('simple_user', ['username', 'password'], [['admin', 'password']]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%simple_user}}');
    }
}
