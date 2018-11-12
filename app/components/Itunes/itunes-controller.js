import ItunesService from "./itunes-service.js";
import Song from "../../models/Song.js";

//PRIVATE

const itunesService = new ItunesService()

function drawSongs(results) {
  console.log(results)

  //YOUR CODING STARTS HERE
  let template = '';
  let songlist = [];

  results.forEach((song, index) => {

    if (song.preview.includes("audio")) {

      template += `
      <li ><img src="${song.albumArt}" alt="">
        <p>${song.title}</p>
        <p>${song.artist}</p>
        <p>${song.collection} : $${song.price}</p>
        <button type="button" id="preview${index}"> Preview
        </button>
      </li>
`
      songlist[index] = song.preview;
    }

  })
  document.getElementById("songs-list").innerHTML = template;

  songlist.forEach((url, index) => {
    document.getElementById("preview" + index).addEventListener("click", function () {
      let player = document.getElementById("player");
      player.src = url;
      player.load();
      player.play();
    });

  });
}

//PUBLIC
class ItunesController {
  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    //changes the button to loading while songs load
    $('#get-music-button').text('LOADING....');
    itunesService.getMusicByArtist(artist).then(results => {
      drawSongs(results)
      //changes button back to GET MUSIC once songs are loaded
      $('#get-music-button').text('GET MUSIC');
    })
  }


}


export default ItunesController