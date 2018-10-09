const env = {
    database: 'test',
    username: 'postgres',
    password: '123',
    host: 'localhost',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};

module.exports = env;
