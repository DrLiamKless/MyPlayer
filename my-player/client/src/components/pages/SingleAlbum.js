import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import { useParams } from "react-router-dom";
import Album from '../Album';

function SingleAlbum({ setSongToPlay }) {
  
  let { id } = useParams() 
  const [singleAlbum, setSingleAlbum] = useState([])

    useEffect(() => {
      read(`/albums/album/${id}`).then((res) => {
        console.log(res)
        setSingleAlbum(res[0])
      });
    }, []);
  
  return (
  <div className="App">
    <header className="App-header">
            <Album
              key={singleAlbum.album_id}
              album={singleAlbum}
              setSongToPlay={setSongToPlay}
            >
            </Album>
    </header>
  </div>
  );
}

export default SingleAlbum;
