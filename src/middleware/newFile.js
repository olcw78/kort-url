const { makeRedisClient } = require('../external/redis');

/** @param {import('express').Application} app */
module.exports = (app) => {
    app.use(async (req, res, next) => {
        try {
            const $redis = await makeRedisClient({});
            res.locals.redis = $redis;
            next();
        } catch (error) {
            req.log.error(error);
            next(error);
        }
    });
};
