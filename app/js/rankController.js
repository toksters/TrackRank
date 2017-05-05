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
    
   $(function(){
       setTimeout(function(){
            $('#instructions').addClass('hide-opacity'); 
           setTimeout(function(){
               $('#instructions').css('display', 'none');
            }, 2000);
        }, 2000);
    });
});
