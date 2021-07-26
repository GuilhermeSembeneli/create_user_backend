import { Knex } from "knex";


export async function up({schema, fn}: Knex): Promise<void> {
    return schema.createTable('users', table => {
        table.increments('id');
        table.uuid('user_id');
        table.text('username').unique().notNullable();

        table.timestamp('created_at').defaultTo(fn.now());
        table.timestamp('updated_at').defaultTo(fn.now());
    })
};


export async function down({schema}: Knex): Promise<void> {
    return schema.dropTable('users')
};

