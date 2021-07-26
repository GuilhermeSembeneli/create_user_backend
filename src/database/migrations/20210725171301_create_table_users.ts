import { Knex } from "knex";


export async function up({schema, fn}: Knex): Promise<void> {
    return schema.createTable('users', table => {
        table.increments('id');
        table.uuid('user_id').unique();
        table.text('username').unique().notNullable();
        table.text('password').unique().notNullable();
        table.text('token').unique();

        table.timestamp('created_at').defaultTo(fn.now());
        table.timestamp('updated_at').defaultTo(fn.now());
    })
};


export async function down({schema}: Knex): Promise<void> {
    return schema.dropTable('users')
};

