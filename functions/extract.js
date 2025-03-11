const axios = require('axios');

exports.handler = async (event, context) => {
    const username = event.path.split('/').pop();
    const scraperApiKey = 'd5a45b8a6182d5a17fd91d5ffe55c685'; // Substitua pela sua chave do ScraperAPI

    try {
        const encodedUrl = encodeURIComponent(`https://www.instagram.com/${username}/?__a=1`);
        const url = `http://api.scraperapi.com?api_key=${scraperApiKey}&url=${encodedUrl}`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
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
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao extrair dados. Verifique o @ ou tente novamente.' })
        };
    }
};
