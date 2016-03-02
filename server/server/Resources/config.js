//Supply required libraries
var args = require('minimist')(process.argv.slice(2));
var extend = require('extend');

//pass argument when starting
//node server.js --env=""
//store the environment variable passed in, test on default
var environment = args.env || "test";

//common config - max players, starting zone, etc.
var common_conf = {
    name: "lavacrum mmo game server",
    version: "0.0.1",
    environment: environment,
    max_player: 100,
    data_paths: {
        items: __dirname + "\\Game Data\\" + "Items\\",
        maps: __dirname + "\\Game Data\\" + "Maps\\",
    },
    starting_zone: "map_home"
};

//environment specific config
var conf = {
    production: {
        //--ip=""
        ip: args.ip || "0.0.0.0",
        port: args.port || 8081,
        database: "mongodb://127.0.0.1/lvcmmo_prod"
    },

    test: {
        //--ip=""
        ip: args.ip || "0.0.0.0",
        port: args.port || 8082,
        database: "mongodb://127.0.0.1/lvcmmo_test"
    }
}

//extend conf of common config
extend(false, conf.production, common_conf);
extend(false, conf.test, common_conf);

//default environment - env=test, ip = 0.0.0.0, port = 8081/8082
module.exports = config = conf[environment];