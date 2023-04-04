import React from "react";
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

class Playlist extends React.Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        //Above step 60 - creating constructor and binding handleNameChange

    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }
// Above Step 59 - when user types, handleNameChange fires and passed in the event and the event has properties will access with . notation. Target.value gives us access to the keys that the user is tryping and passed to the onChange prop and the method created on app.js file is going to update the state of the playlist name  
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'}  placeholder="Create Playlist"
                            onChange={this.handleNameChange} />
                <TrackList tracks={this.props.playlistTracks} 
                            onRemove={this.props.onRemove}
                            isRemoval={true} />
                <button className="Playlist-save" 
                             onClick={this.props.onSave}
                              > SAVE TO SPOTIFY </button>
            </div>
        )
    }
}

export default Playlist;