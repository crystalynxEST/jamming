const clientId = 'fe0331d3140a4cf2946b760f9863e8a8';
const redirectUri = 'http://Lynx_Jam.surge.sh';

//Above Step 81 & 82 - created constant variables for my applocation's client ID and redirect URI ( clientID is form Spotify after you create an app in dev mode)

let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        // Step 78 - Check if the user’s access token is already set. If it is, return the value saved to access token.

        //check for an access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/ ); 
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        // const ones are step 79 - window.location.href finds the url of the current location on the web
        // /access_token=([^&]*)/ is an access regex


        //Below step 80
        // below - if access token and expiration time are in the URL:
        if (accessTokenMatch && expiresInMatch) {
            //setting access token value and variable for expiration time
            accessToken = accessTokenMatch[1];

            //below Set the access token to expire at the value for expiration time
            const expiresIn = Number(expiresInMatch[1]);

            //2 below - Clears the parameters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
            //Above Step 83 - redirectirn users to the above URL and interpolating (adding our variables) to CLIENT_ID & REDIRECT_URI.
        }
    },

    search(term) {
        //Above Step 84 - creating a method Search inside Spotify object and accpts a parameter for the user's search term

        const accessToken = Spotify.getAccessToken();
        // creating access token

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        { headers: {
            Authorization: `Bearer ${accessToken}`
        } // Above step 85 - promise chain by returning GET request using fetch(), to the Spotify URL endpoint. Replaced the last word TERM with the value saved to the search term argument and added an authorization header to the request containing the access token.
    }).then(response => {
        return response.json();
        //Above step 87 - converting returned response to JSON
    }).then(jsonResponse => {
        if(!jsonResponse.tracks) {
            return [];
            // if JSON does not contain any tracks, returning empty array
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
        // mapping converted JSON to an array of tracks
    });     
    },

    savePlayList(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return;
            // Above step 90 - created a method. First argument the name of the playlist, second array of track URIs. Inside the function, check if there are values saved to the method's two arguments. If not, return.

        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;
    //Above Step 91 - 1st token variable, set to the current user's access token. 2nd header variable, set to object with an Authorization
    // parameter containing user's access token in the implicit grant flow request format. 3rd empty variable for user's ID.

        return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
//Above step 92 - created a request that returns user's Spotify username. Converted response to JSON and saved the response id parameter to the user's ID variable.
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    //Above step 93 - use the returned ID to make a POST request that creates a new playlist in the user's account and returns a playlist ID.
// Used Spotify endpoints to find a request that creates a new playlist. Set the playlist name to the value passed into the method.
// Convert the response to JSON and save the response id paramenter to a variable called playlistID

                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackURIs })
                    })
                })

            })

    
}

}

export default Spotify;