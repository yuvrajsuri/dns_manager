
require('dotenv').config();

module.exports = {
    dbURL: process.env.ATLASDB_URL,
    jwtSecret: process.env.JWT_SECRET
};