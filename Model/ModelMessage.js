const knex = require('../Connection/knex');
const Promise = require('bluebird');
knex.debug(true);

module.exports = {
    get_messages (user_id) {
        return knex('user')
            .whereNot("user_id",user_id)
            .select('*')
    }
}

