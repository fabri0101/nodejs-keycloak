const session = require('express-session')
const Keycloak = require('keycloak-connect')

let _keycloak

var keycloakConfig = {
    clientId: 'nodejs-microservice',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'demo-Realm',
    Credentials: {
        secret: '6847fd76-95a9-47dd-982e-4a29fa6ec19b'
    }
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init keycloak again");
        return _keycloak;
    }
    else{
        console.log("Initializing keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore}, keycloakConfig);
        return _keycloak;
    }    
}

function getKeycloak() {
    if (!_keycloak) {
        console.error('keycloak has not  been initialized. Please called init first.')
    }
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};