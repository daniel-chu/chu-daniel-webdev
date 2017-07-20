(function () {
    angular
        .module("WebAppMaker")
        .factory("widgetTypeValidators", widgetTypeValidators);

    function widgetTypeValidators() {
        var widgetTypeValidators = {
            "HEADING": validateHeadingWidget,
            "IMAGE": validateImageWidget,
            "YOUTUBE": validateYoutubeWidget
        };

        return widgetTypeValidators;

        //TODO let them leave other fields blank and give default values if they dont fill those in
        function validateHeadingWidget(widget, errorMessage) {
            if (!(widget && widget.text && widget.size)) {
                //TODO figure out how to get this to print in alert
                errorMessage = "Please fill in text and size fields.";
                return false;
            }
            return true;
        }

        function validateImageWidget(widget, errorMessage) {
            // TODO they dont need url if they upload an image, but how do you do that?
            if (!(widget && (widget.url) && widget.width)) {
                errorMessage = "Please fill in the width field and either select an image or give a URL.";
                return false;
            }
            return true;
        }

        function validateYoutubeWidget(widget, errorMessage) {
            if (!(widget && widget.url && widget.width)) {
                errorMessage = "Please fill in URL and width fields.";
                return false;
            }
            return true;
        }
    }

})();