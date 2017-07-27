(function() {
    angular.module('wbdvDirectives', [])
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable() {

        function link(scope, element) {
            var initial;
            var final;

            $(element).sortable({
                axis: 'y',
                start: function(event, ui) {
                    inital = ui.item.index();
                },
                stop: function(event, ui) {
                    final = ui.item.index();
                    scope.wbdvCallback({
                        inital: inital,
                        final: final
                    });
                    inital = undefined;
                    final = undefined;
                }
            });
        }

        return {
            link: link,
            scope: {
                wbdvCallback: '&'
            }
        }

    }

})();
