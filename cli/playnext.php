<?php
require 'yii_init.php';
use app\models\Playlists;
use app\models\PlaylistTracks;
use app\models\Tracks;
use app\models\Backgrounds;


$playlist = Playlists::find()
    ->where(['current'=>1])
    ->one();

//get track

$tracks_order = json_decode($playlist->tracks_order);
if ($playlist->playlist_changed) {
  $playlist->current_track_num = 0;
  $playlist->playlist_changed = 0;
}
$playlistTracksId = $tracks_order[$playlist->current_track_num];

if ($playlist->current_track_num < count($tracks_order)-1) {
  $playlist->current_track_num++;
} else {
  $playlist->current_track_num = 0;
}

$playlistTrack = PlaylistTracks::find()
    ->where(['id'=>$playlistTracksId])
    ->with('track')
    ->asArray()
    ->one();
$track = $playlistTrack['track'];

//get background

$backgrounds = Backgrounds::find()
    ->orderBy('id')
    ->asArray()
    ->all();

if ($playlist->current_background_id===0 || $playlist->backgrounds_changed) {
  $playlist->current_background_id = $backgrounds[0]['id'];
  $playlist->backgrounds_changed = 0;
}

for ($i=0;$i<count($backgrounds);$i++) {
  if ($backgrounds[$i]['id']==$playlist->current_background_id) {
    $background = $backgrounds[$i];
    if ($i<count($backgrounds)-1) {
      $newCurrentBackgroundId = $backgrounds[$i+1]['id'];
    }
    else {
      $newCurrentBackgroundId = $backgrounds[0]['id'];
    }
    break;
  }
}
$playlist->current_background_id = $newCurrentBackgroundId;

//important update playlist
$playlist->update();

//Here we have $track and $background

$result = [
  'playlist' => $playlist->title,
  'track_name' => $track['title'],
  'track_artist' => $track['artist'],
  'track_description' => $track['description'],
  'track_location' => UPLOAD_TRACKS_DIR.$track['fileName'],
  'background_location' => UPLOAD_BACKGROUNDS_DIR.$background['fileName'],
];

$resultText = $result['playlist'].' | '.
              $result['track_name'].' | '.
              $result['track_artist'].' | '.
              $result['track_description'].' | '.
              $result['track_location'].' | '.
              $result['background_location'];
echo $resultText;
