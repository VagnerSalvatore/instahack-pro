const instaTouch = require('instatouch');

exports.handler = async (event, context) => {
    const username = event.path.split('/').pop();

    try {
        const options = {
            count: 0,
            timeout: 1000,
            proxy: 'http://51.15.242.202:8888' // Proxy gratuito (pode falhar)
        };
        const userMeta = await instaTouch.getUserMeta(username, options);
        const profilePic = userMeta.profile_pic_url || 'https://placehold.co/120x120?text=Sem+Foto';

        return {
            statusCode: 200,
            body: JSON.stringify({ profilePic }),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 200,
            body: JSON.stringify({ profilePic: 'https://placehold.co/120x120?text=Sem+Foto' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
