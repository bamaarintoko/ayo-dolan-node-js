const knex = require('../Connection/knex');
const Promise = require('bluebird');
knex.debug(true);

module.exports = {
    login (params) {
        return knex('user')
            .where({user_email : params.user_name, user_password:params.password})
            .select('*')
        //return knex('_user').select('*').where('user_email',params.user_name).where('user_password',params.password)
        // return new Promise((resolve, reject) => {
        //     resolve(params)
        // });
    }
}

