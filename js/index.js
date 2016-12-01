/**$
 * Created By Revathy Sindhu Chellapandian
 *
 * Main script for teh portfolio site
 */
(function() {
    // When the document is ready
    $(document).ready(function () {

        // Initializing the about page carousel
        $('#dg-container').gallery({
            autoplay: true
        });

        //Initializing the circular progress bars in the skills page
        $('#skills').waypoint(function () {
            $('.chart').each(function () {
                $(this).easyPieChart({
                    size: 170,
                    animate: 2000,
                    lineCap: 'butt',
                    scaleColor: false,
                    barColor: '#555555',
                    trackColor: 'rgba(239, 239, 239, 0.2)',
                    lineWidth: 10
                });
            });
        }, {offset: '80%'});

        // Initializing the grid in the portfolio page
        var $isotopeGrid = $('.grid').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            resizable: true,
            transformsEnabled: true,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: true
            }
        });

        // Events for filtering by portfolio categories
        var $previousCategory;
        $('.portfolio_filter_buttons').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $isotopeGrid.isotope({filter: filterValue});
            onResize();
        });

        // Events for filtering by portfolio categories
        $('.portfolio_filter_buttons').each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function () {
                $buttonGroup.find('.current-category').removeClass('current-category');
                $(this).addClass('current-category');
                onResize();
            });
        });


        // Loading Google Maps in the Contact Page
        loadGoogleMaps();
        function loadGoogleMaps() {
            var googleMap;
            var googleMapCoordData = new google.maps.LatLng(34.0029, -84.1446);
            var googleMapMarker;


            function initializeGoogleMaps() {
                var mapOptions = {
                    zoom: 8,
                    center: googleMapCoordData,
                    scrollwheel: false,
                    panControl: false,
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false,
                    styles: [{
                        featureType: "water",
                        elementType: "all",
                        stylers: [{hue: "#bbbbbb"}, {saturation: -100}, {lightness: -4}, {visibility: "on"}]
                    }, {
                        featureType: "landscape",
                        elementType: "all",
                        stylers: [{hue: "#999999"}, {saturation: -100}, {lightness: -33}, {visibility: "on"}]
                    }, {
                        featureType: "road",
                        elementType: "all",
                        stylers: [{hue: "#999999"}, {saturation: -100}, {lightness: -6}, {visibility: "on"}]
                    }, {
                        featureType: "poi",
                        elementType: "all",
                        stylers: [{hue: "#aaaaaa"}, {saturation: -100}, {lightness: -15}, {visibility: "on"}]
                    }]
                }
                var googleMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                googleMap.panBy(0, 45);
                googleMapMarker = new google.maps.Marker({
                    map: googleMap,
                    draggable: true,
                    position: googleMapCoordData
                });
            }

            google.maps.event.addDomListener(window, "load", initializeGoogleMaps);
        }

        /***
         * Resize event handler
         * @param event
         */
        function onResize(event) {
            var width = fullWidth();
            var height = fullHeight();

            // Contact me page elements - to layout the
            // Google Map to full width of the view port
            $(".fullwidth").width(width);
            $(".fullheight").height(height);
            $(".gmap").width(width);

            // Aligning portfolio page elements to ensure that isotope
            // layout issues are handled
            var gridItemHeight = $(".grid-item .thumbnail img").height();
            if (gridItemHeight !== 0) {
                $(".grid-item .thumbnail").height(gridItemHeight);
                $(".grid-item").height(gridItemHeight);

                if (typeof(event) !== "undefined") {
                    $(".grid").height(gridItemHeight * 2);
                    $(".portfolio-content").height((gridItemHeight * 2) + 10);
                }
            }

            if ($(".grid-item .thumbnail img").width() < $(".grid-item").width()) {
                $(".grid-item .thumbnail img").width($(".grid-item").width());
            }
            $isotopeGrid.isotope('layout');
        }
        $(window).resize(onResize);
        setTimeout(function () {
            onResize();
        }, 700);

        //Utility Functions
        function fullWidth() {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
        }

        function fullHeight() {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        }


    });

    // Temporarily defining the portfolio item details in a
    // local variable
    // TODO: Change this to a separate JSON file
    var portfolioDetails = [{
        thumbnailUrl: 'img/img1.png',
        imageUrl: 'img/img1L.png',
        shortDescription: 'Responsive, scalable animal vector icons for the web',
        categories: 'web-graphics',
        skills: [{
            icon: 'fa-archive',
            text: 'Web Graphics, Web Icons'
        },
            {
                icon: 'fa-check',
                text: 'Vector Icons, Responsive, Scalable'
            },
            {
                icon: 'fa-cog',
                text: 'Adobe Illustrator'
            }],
        heading: 'Spotify Music Playlists',
        description: ' Created four different artists portraits from spotify and can search music concerts held in the country! Made use of Bootstrap , JavaScript, JSON and some other awesome functions of jQuery. '
    },
        {
            thumbnailUrl: 'img/img2.png',
            imageUrl: 'img/img2L.png',
            shortDescription: 'Web Animation using only CSS3',
            categories: 'web-design',
            skills: [{
                icon: 'fa-archive',
                text: 'Music Apps, Animation'
            },
                {
                    icon: 'fa-check',
                    text: 'Responsive, Rich, Performance'
                },
                {
                    icon: 'fa-cog',
                    text: 'HTML5, CSS3, Adobe Illustrator'
                },
                {
                    icon: 'fa-link',
                    text: '<a href="portfolio/cssanimation/index.html" target="_blank">Click here for demo</a>'
                }],
            heading: 'Ionic Music App on Cordova Platform',
            description: 'Awesome app to discover world of music!! Hybrid Applications using Ionic Framework, Cordova with some Third-Party API stuff..'
        },
        {
            thumbnailUrl: 'img/img3.png',
            shortDescription: 'Cute Furry Vector Monster using Illustrator',
            categories: 'web-graphics',
            imageUrl: 'img/img3L.png',
            skills: [{
                icon: 'fa-archive',
                text: 'Web Graphics'
            },
                {
                    icon: 'fa-check',
                    text: 'Vector Icons, Responsive, Scalable'
                },
                {
                    icon: 'fa-cog',
                    text: 'Adobe Illustrator'
                }],
            heading: 'Bolg on Cars Sale',
            description: ' Started working with the Different APIs, then used SQLlite database to store and display different cars selected by users. Finally finished it using bootstrap and its effects to really lift the design from the screen. '
        },
        {
            thumbnailUrl: 'img/img4.png',
            shortDescription: 'Cartoon Character',
            categories: 'web-graphics',
            imageUrl: 'img/img4L.png',
            skills: [{
                icon: 'fa-archive',
                text: 'Web Graphics'
            },
                {
                    icon: 'fa-check',
                    text: 'Responsive, Rich, Performance'
                },
                {
                    icon: 'fa-cog',
                    text: 'Adobe Illustrator'
                }],
            heading: 'iTunes Music ',
            description: ' Using iTunes API created different genre playlists in the web application. Then worked on differnt operations  ADD and DELETE playlists using WebSQL. Used audio controls to pause and play the music. '
        },
        {
            thumbnailUrl: 'img/img5.png',
            shortDescription: 'Dual Exposure Photo Effect in Photoshop',
            categories: 'graphic-design',
            imageUrl: 'img/img5L.png',
            skills: [{
                icon: 'fa-archive',
                text: 'Weather API'
            },
                {
                    icon: 'fa-check',
                    text: 'Responsive, Scalable'
                },
                {
                    icon: 'fa-cog',
                    text: 'Adobe Photoshop'
                }],
            heading: 'Weather Website',
            description: ' Used Open Weather API to display the weather of particular area using Zip code or by Region name . Then worked on displaying hourly and daily reports. Finally worked to retrive the weather using current location. '
        },
        {
            thumbnailUrl: 'img/img6.png',
            shortDescription: 'NATO Phonetic Alphabet App',
            categories: 'web-design',
            imageUrl: 'img/img6L.png',
            skills: [{
                icon: 'fa-archive',
                text: 'Music Apps'
            },
                {
                    icon: 'fa-check',
                    text: 'Responsive, Rich, Performance'
                },
                {
                    icon: 'fa-cog',
                    text: 'HTML, CSS, AngularJS and Angular Material'
                },
                {
                    icon: 'fa-link',
                    text: '<a href="portfolio/military/index.html" target="_blank">Click here for demo</a>'
                }],
            heading: '3 API Website ',
            description: ' Used 3 APIs Groupon, Instagram, Yelp.  '

        },
        {
            thumbnailUrl: 'img/portfolio_7.png',
            shortDescription: 'Draw Little Red Riding Hood with Basic Shapes in Illustrator',
            categories: 'web-graphics',
            imageUrl: 'img/portfolio_7L.png',
            skills: [{
                icon: 'fa-archive',
                text: 'Web Graphics, Web Icons'
            },
                {
                    icon: 'fa-check',
                    text: 'Vector Icons, Responsive, Scalable'
                },
                {
                    icon: 'fa-cog',
                    text: 'Adobe Illustrator'
                }],
            heading: 'Red Riding Hood',
            description: 'Created an adorable cartoon Little Red Riding Hood with her basket and bunch of flowers using the Pen Tool (P) and basic shapes such as the Rectangle Tool (M), the Ellipse Tool (L) and the Polygon Tool in Illustrator. '
        },
        {
            thumbnailUrl: 'img/portfolio_8.png',
            shortDescription: 'Web Based Visualization of Financial Transactions using d3js',
            categories: 'web-design',
            imageUrl: 'img/portfolio_8L.png',
            skills: [{
                icon: 'fa-archive',
                text: 'Music Apps, Animation'
            },
                {
                    icon: 'fa-check',
                    text: 'Responsive, Rich, Performance'
                },
                {
                    icon: 'fa-cog',
                    text: 'HTML5, CSS3, Adobe Illustrator'
                },
                {
                    icon: 'fa-link',
                    text: '<a href="portfolio/geo/geoView.html" target="_blank">Click here for demo</a>'
                }],
            heading: 'Geographic Animation',
            description: 'A GeoLocation based animation that visualizes a heat map of financial transactions that happen from a source to a destination. Once the animation is over, you can also get a summary of transactions by hovering over the locations.'
        },

    ];

    /***
     * Angular Application for the Portfolio
     * Used for:
     * -- Using the portfolio details JSON to dynamically build the portfolio grid items
     * -- The portfolio dialog (using Angular Material)
     * -- ContactMe Page AJAX Service: Sending data asynchronously to a FireBase database
     */
    var revaPortfolioApp = angular.module('RevaPortfolioApp', ['ngMaterial', 'ngMessages', 'firebase']);
    revaPortfolioApp.controller("PortfolioController", function ($scope, $sce, $mdDialog, $mdMedia) {
        $scope.status = '  ';
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

        $scope.details = portfolioDetails;
        // Making sure that the URLs and HTML are marked as safe
        angular.forEach($scope.details, function (value, key) {
            $scope.details[key].imageUrl = $sce.trustAsHtml($scope.details[key].imageUrl);
            $scope.details[key].thumbnailUrl = $sce.trustAsHtml($scope.details[key].thumbnailUrl);
            angular.forEach($scope.details[key].skills, function (skillValue, skillKey) {
                $scope.details[key].skills[skillKey].text = $sce.trustAsHtml($scope.details[key].skills[skillKey].text);
            });
        });

        $scope.showDialog = function (ev, index) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'portfolio/portfolio-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        index: index
                    }
                })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });

            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };
    });

    revaPortfolioApp.config(['$locationProvider', '$mdIconProvider', function ($locationProvider, $mdIconProvider) {
        $locationProvider.html5Mode(true).hashPrefix('');
        $mdIconProvider.defaultIconSet('img/mdi.svg');
    }]);


    function DialogController($scope, $sce, $mdDialog, index) {

        $scope.details = portfolioDetails;

        $scope.detail = $scope.details[index];
        $scope.title = $scope.details[index].heading;

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

    revaPortfolioApp.controller("ContactMeController", function ($scope, $log, $mdToast, $document, ContactMeService) {
        $scope.newMessage = {name: '', email: '', message: '', when: 0};
        $scope.adding = false;
        $scope.addMessage = function () {
            $scope.adding = true;
            $scope.newMessage.when = Date.now();
            ContactMeService.addMessage($scope.newMessage).then(function (p) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Thank you for the message!!')
                        .position('center center')
                        .hideDelay(2000)).then(function () {
                    $scope.newMessage = {name: '', email: '', message: ''};
                    $scope.adding = false;
                });
            });
        };
    });
    revaPortfolioApp.constant('FIREBASE_URI', 'https://reva-portfolio.firebaseio.com/');
    revaPortfolioApp.factory("ContactMeService", function ($firebaseArray, FIREBASE_URI) {
        var ref = new Firebase(FIREBASE_URI);
        var messages = $firebaseArray(ref);

        var addMessage = function (message) {
            console.log(message);
            return messages.$add(message);
        };

        return {
            addMessage: addMessage
        };
    });
})();