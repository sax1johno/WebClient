angular.module('proton.ui')
.directive('slider', () => {
    return {
        replace: true,
        restrict: 'E',
        scope: { value: '=', options: '=' },
        templateUrl: 'templates/ui/slider.tpl.html',
        link(scope, element) {
            const slider = element[0].querySelector('.slider');

            if (scope.options.legend === 'GB') {
                slider.classList.add('slider-legend-GB');
            }

            noUiSlider.create(slider, scope.options);

            slider.noUiSlider.on('change', onChange);

            scope.$watch('value', (newValue) => {
                slider.noUiSlider.set(newValue);
            });

            scope.$on('$destroy', () => {
                slider.noUiSlider.off('change', onChange);
                slider.noUiSlider.destroy();
            });

            scope.plus = () => {
                const newValue = Number(slider.noUiSlider.get()) + scope.options.step;

                if (newValue <= scope.options.range.max) {
                    slider.noUiSlider.set(newValue);
                    onChange();
                }
            };

            scope.minus = () => {
                const newValue = Number(slider.noUiSlider.get()) - scope.options.step;

                if (newValue >= scope.options.range.min) {
                    slider.noUiSlider.set(newValue);
                    onChange();
                }
            };

            function onChange() {
                scope.$applyAsync(() => {
                    scope.value = Number(slider.noUiSlider.get());
                });
            }
        }
    };
});