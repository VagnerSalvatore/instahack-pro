const instaTouch = require('instatouch');

exports.handler = async (event, context) => {
    const username = event.path.split('/').pop();

    try {
        const options = {
            count: 0, // Não precisamos de posts, apenas metadados do usuário
            timeout: 1000 // Adiciona um delay para evitar rate limits
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
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao extrair a foto. Verifique o @ ou tente novamente.' })
        };
    }
};
