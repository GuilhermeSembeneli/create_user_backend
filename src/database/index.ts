import knex from 'knex';
import knexfile from '../../knexfile';

const conenctKnex = knex(knexfile['development']);

export { conenctKnex }