import axios from 'axios';

const API_URL = 'https://testserverplaylistgenerator-3a91a8890329.herokuapp.com';

export const getClientId = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/client_id`);
      return response.data.clientId;
    } catch (error) {
      console.error('Error fetching client ID:', error);
      throw error;
    }
  };
  
  export const exchangeCodeForToken = async (code) => {
    const response = await axios.post(
        `${API_URL}/callback`,
        { code },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('access token at api.js: ' + response.data);
      const { access_token } = response.data;
      return access_token;
  };
  
  export const createPlaylist = async (answers, spotifyToken) => {
    try {
        const response = await axios.post(
          `${API_URL}/api/playlist`,
          { answers, spotifyToken },
          {
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
              'Content-Type': 'application/json'
            }
          }
        );
    
        return response.data.playlist.external_urls.spotify;
      } catch (error) {
        console.error('Error creating playlist:', error.response?.data || error.message);
        throw error;
      }
  };

  

