const EnvVariable = require("../../config/config.json");

export const ProcessEnvDatabase = {
    _host: EnvVariable.Database.host,
    _db_port: EnvVariable.Database.port,
    _username: EnvVariable.Database.username,
    _password: EnvVariable.Database.password,
    _dialect: EnvVariable.Database.dialect,
    _database: EnvVariable.Database.db
};

export const ProcessEnvService = {
    _port: EnvVariable.service.port,
    _basecontext: EnvVariable.service.basecontext,
    _loginterval: EnvVariable.service.loginterval,
    _userSessionTimeout: EnvVariable.service.userloginTimeout,
    _loaduserdata: EnvVariable.service.loaduserdata,
    _loadusersenderdata: EnvVariable.service.loadusersenderdata,
    _deleteexpiredusersender : EnvVariable.service.deleteexpiredusersender,
    _emailinterval: EnvVariable.service.emailinterval,
    _groupsinterval: EnvVariable.service.cgroupsinterval
};


export const ProcessEnvLog4js = {
    _log4jspath: EnvVariable.log4j.log4jpath
};

export const ProcessEnvAuth = {
    __internalEncKey: "Gr3@tW@t3rS@lt@1B2c3D4e5F6g7H8",
    __randomcount: 32,
    __batoken: "1234567890987654",
    __secret: "0000000000"
};
