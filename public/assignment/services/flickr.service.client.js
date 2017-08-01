(function() {
    angular
        .module('WebAppMaker')
        .factory('flickrService', flickrService);


    function flickrService($http) {
        var key = "cda31109868c44b4be3abdedec49671a";
        var secret = "c28286e82d15bbf2";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            searchPhotos: searchPhotos
        }

        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }


    }

})();