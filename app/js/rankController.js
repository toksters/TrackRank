app.controller('rankCtrl', function($scope, $http, $routeParams){
    $scope.makeSortable = function(){
        $('#sortable').sortable();
        $('#sortable').disableSelection();
    }

    $scope.tracks = [];
    
    $scope.printData = function(){
        console.log($routeParams.artist + " " + $routeParams.album);
    }

    $scope.coverUrl = "";
    $scope.mbid = "";

    $scope.results = [];

    $scope.showResults = function(){
        $('#rankContainer').css('display', 'none');
        $('#resultsContainer').css('display', 'inline');
    }

    $scope.initializeTracks = function(){
        $scope.printData();
        var ret = $http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=5d53cf400cdb0ca686bf820996a6c3c7&artist=' + $routeParams.artist + '&album=' + $routeParams.album + '&format=json').then(function(res){
            console.log(res);
            $scope.coverUrl = res.data.album.image[3]['#text'];
            $scope.tracks = res.data.album.tracks.track.map(function(item, index) {
                return {trackNum: index + 1, name: item.name};
            });
            $scope.mbid = res.data.album.mbid;
            console.log($scope.tracks);
        });
    }


   $scope.getOrder = function(){
        var tracks = []; 
        $('#sortable').children().each(function(){
            tracks.push({name: $(this).children().html(), trackNum: $(this).data('index')});    
            
        });
        console.log(tracks);
        return tracks;
   }

    $scope.writeAlbum = function(){
        var albumObj = {name: $routeParams.album, artist: $routeParams.artist, mbid: $scope.mbid, tracks: $scope.getOrder()};
        $http.post('http://localhost:8080/api/updateAlbum', albumObj).then(function(){
           //Fetch the results 
            $http.post('http://localhost:8080/api/getAlbum', {mbid: $scope.mbid}).then(function(res, err){
            console.log("SUCCESS IN GETTING THE ALBUM");
            console.log(res);
            $scope.results = res.data.tracks.sort(function(track1, track2){
                return track2.eloScore - track1.eloScore; 
            });
    }); 
        });
    }

   $(function(){
       setTimeout(function(){
            $('#instructions').addClass('hide-opacity'); 
           setTimeout(function(){
               $('#instructions').css('display', 'none');
            }, 2000);
        }, 2000);
    });
});
