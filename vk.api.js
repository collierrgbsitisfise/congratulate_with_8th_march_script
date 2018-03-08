const getVkInstance = async () => {
    const vkapi = new(require('node-vkapi'))();

    const data = await vkapi.authorize({
        appId: 1234567890,//
        login: 'some_login',
        password: 'some_pwd',
        scope: '+524288'
    });

    const vkApi = new(require('node-vkapi'))({
        accessToken: data.access_token
    });

    return vkApi;
}

module.exports = getVkInstance;