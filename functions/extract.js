const axios = require('axios');

exports.handler = async (event, context) => {
    const username = event.path.split('/').pop();

    try {
        const url = `https://www.instagram.com/${username}/?__a=1`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.instagram.com/'
            }
        });

        const data = response.data.graphql.user;
        const extractedData = {
            profilePic: data.profile_pic_url,
            name: data.full_name || username,
            birthdate: 'Indisponível',
            city: data.location || 'Indisponível',
            bio: data.biography || 'Sem bio'
        };

        return {
            statusCode: 200,
            body: JSON.stringify(extractedData),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (error) {
        console.error(error.response ? error.response.status : error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao extrair dados. Verifique o @ ou tente novamente.' })
        };
    }
};
