var WebAppMakerUtil = (function () {


    return {

        // TODO this is temporarily here while we are temporarily using the arrays to store data. this allows us to
        // make a shallow copy of an object (all of the ones we are using have properties that are primitive) so
        // that we can edit data without actually editing it before we save

        shallowCopy: function (object) {
            var copy = {};
            for (var key in object) {
                copy[key] = object[key];
            }
            return copy;
        }


    }

})();