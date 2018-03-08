const getVkInstance = require('./vk.api');

const {
    eightMarch
} = require('./utils/utils');

( async () => {
    const vkApi = await getVkInstance();
    eightMarch(vkApi); 
})();
