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

    $scope.initializeTracks = function(){
        $scope.printData();
        var ret = $http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=5d53cf400cdb0ca686bf820996a6c3c7&artist=' + $routeParams.artist + '&album=' + $routeParams.album + '&format=json').then(function(res){
            console.log(res);
            $scope.coverUrl = res.data.album.image[3]['#text'];
            $scope.tracks = res.data.album.tracks.track.map(function(item, index) {
                return {trackNum: index + 1, name: item.name};
            });
            console.log($scope.tracks);
        });
    }

   $scope.getOrder = function(){
        var tracks = []; 
        $('#sortable').children().each(function(){
            tracks.push({name: $(this).children().html(), trackNum: $(this).data('index')});    
            
        });
        console.log(tracks);
   }

    $scope.writeAlbum = function(){
        $http.post('http://localhost:8080/api/updateAlbum', {name: "Abbey Road", mbid: "12345", voteCount: 0, tracks: [  {name: "Come Together", trackNo: 1},
                         {name: "Something", trackNo: 2},
                         {name: "Maxwell's Silver Hammer", trackNo: 3},
                         {name: "Oh! Darling", trackNo: 4},
                         {name: "Octopus's Garden", trackNo: 5},
                         {name: "I Want You (She's So Heavy)", trackNo: 6},
                         {name: "Here Comes The Sun", trackNo: 7},
                         {name: "Because", trackNo: 8},
                         {name: "You Never Give Me Your Money", trackNo: 9},
                         {name: "Sun King", trackNo: 10},
                         {name: "Mean Mr. Mustard", trackNo: 11},
                         {name: "She Came In Through The Bathroom Window", trackNo: 12},
                         {name: "Golden Slumbers", trackNo: 13},
                         {name: "Carry That Weight", trackNo: 14},
                         {name: "The End", trackNo: 15},
                         {name: "Her Majesty", trackNo: 16}]}).then(function(){
                            console.log("Success");                                                        
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
