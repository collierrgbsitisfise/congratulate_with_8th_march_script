/**
 * 
 * @param {num} milseconds 
 */
const wait = (milsec) => {
    return new Promise ((resolve, reject) => {
        setTimeout( () => {
            resolve();
        }, milsec)
    }) 
}

/**
 * 
 * @param {vkApi} vkApi 
 * @param {Array<numbers>} idsArr
 * @returns {Array<numbers>}
 */
const getGirlsIdsOnly = async (vkApi, idsArr) => {
    
    const resArr = [];
    
    for (let i of idsArr) {
        
        let userInfo = await vkApi.call('users.get', {
            user_ids: [i],
            fields: ['sex']            
        });

        if (userInfo[0].sex === 1) {
            resArr.push(userInfo[0]);
        }
    
    }

    return resArr.map(item => item.id);

}

/**
 * 
 * @param {vkApi} vkApi 
 * @param {Array<number>} idsArr 
 * @param {String} msg 
 */
const sendMessage = async (vkApi, idsArr, msg) => {
    
    for (let id of idsArr) {

        try {
            await vkApi.call('messages.send', {
                user_id: id,
                message: msg
            });
        } catch (err) {
            //mmmm... shit happens
        }

        await wait(20000);
    }
}

/**
 * 
 * @param {vkApi} vkApi 
 */
const eightMarch = async (vkApi) => {
    const friendsList = await vkApi.call('friends.get', {});
        
    const arrOfIds = await getGirlsIdsOnly(vkApi, friendsList.items);
    
    const msg = `some cool text -__-`;
    
    sendMessage(vkApi, arrOfIds, msg);
}

module.exports = {
    eightMarch
}