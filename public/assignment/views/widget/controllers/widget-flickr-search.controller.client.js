(function() {
    angular
        .module('WebAppMaker')
        .controller('flickrImageSearchController', flickrImageSearchController);

    function flickrImageSearchController($routeParams, $location, flickrService, widgetService) {
        vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            widgetService.findWidgetById(vm.widgetId).then(function(widget) {
                    var widgetToEdit = widget;
                    widgetToEdit.url = url;
                    return widgetService.updateWidget(vm.widgetId, widgetToEdit);
                })
                .then(function() {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/' + vm.widgetId);
                });
        }




    }


})();