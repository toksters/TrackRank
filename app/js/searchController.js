app.controller('searchCtrl', function($scope, $http, $location) {

  $scope.showVotingPanel = false;

  $scope.returnedAlbums = {};

  $scope.updating = false;

  $scope.alertAlbum = function(item, model, label){
      //alert("album: " + item.album + ", artist: " + item.artist); //$scope.returnedAlbums[index]);
      $location.url('/rank?album=' + item.album + '&artist=' + item.artist);
  }

  $scope.getCover = function(album){
        return $scope.returnedAlbums[album].cover;
  }

  // Any function returning a promise object can be used to load values asynchronously
  $scope.getAlbums = function(val) {
    while($scope.updating);
    return $http.get('http://ws.audioscrobbler.com/2.0/?method=album.search&album=' + val + '&api_key=5d53cf400cdb0ca686bf820996a6c3c7&format=json'
        ).then(function(response){
            console.log(response);
            $scope.returnedAlbums = {};
            response.data.results.albummatches.album.forEach(function(item) {
            $scope.returnedAlbums[item.name] = {artist: item.artist, cover: item.image[1]["#text"], mbid: item.mbid}
            });
            console.log($scope.returnedAlbums);
            return response.data.results.albummatches.album.map(function(item){
                if(item.image[1]['#text'] == ""){
                    return {album: item.name, artist: item.artist, cover: "images/unknown-album-cover.png", mbid: item.mbid};
                } else {
                    return {album: item.name, artist: item.artist, cover: item.image[1]['#text'], mbid: item.mbid};
                }//return item.name;
                //return "<img src=\"" + $scope.returnedAlbums[item.name].cover + "\"/> <b>" + item.name + "</b> - " + $scope.returnedAlbums[item.name].artist;
            });
        });
    };
});
