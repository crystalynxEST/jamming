import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);



    this.state = {
      searchResults: [],
    playlistName: 'My Playlist',
    playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }



  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }
// Above Step 41 - comparing if the track ID is in the playlist, if not, we can add it


  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }
//Above Step 49 - Removes tracks

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

//Above Step 57 - Updating the playlist name


  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    //Below step 95 - Updating by calling method Spotify.savePlaylist(). After that reset the state of playlistNam to 'New Playlist' and playlistTracks to an empty array.
    Spotify.savePlayList(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
//Above step 88 - updated search() method with spotify.search() method. Updates the state of searchResults with the value resolved from Spotify.search()'s promise.
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          < SearchBar onSearch={this.search} />

          <div className="App-playlist">

            < SearchResults searchResults={this.state.searchResults} 
                                    onAdd={this.addTrack} />
            < Playlist playlistName={this.state.playlistName} 
                                    playlistTracks={this.state.playlistTracks} 
                                    onRemove={this.removeTrack}
                                    onNameChange={this.updatePlaylistName}
                                    onSave={this.savePlaylist} />

          </div>
        </div>
      </div>
    )
  }
}

export default App;
