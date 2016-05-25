(function () {

  angular.module('app').constant('APP_SETTINGS', {
    "FIREBASE_URL": "https://udacitytwo.firebaseio.com/"
  });

  angular.module('app').run(function ($rootScope, $location, APP_SETTINGS, idbInit, $http) {

    if(!$rootScope.stops)
      $rootScope.stops = [];

    if(!$rootScope.stop_times)
      $rootScope.stop_times = [];

    if(!$rootScope.notifications)
      $rootScope.notifications = [];

    //Service Worker
    if ('serviceWorker' in navigator) {
      $rootScope.notifications.push({
        message: 'This browser support Service Worker',
        type: 'btn-success',
        class: 'fa fa-shield'
      });

      //register of serviceWorker
      navigator.serviceWorker.register('/service-worker.js', {scope: '/'}).then(function (registration) {
        var serviceWorker;
        if (registration.installing) {
          serviceWorker = registration.installing;
        } else if (registration.waiting) {
          serviceWorker = registration.waiting;
        } else if (registration.active) {
          serviceWorker = registration.active;
        }

        if(navigator.serviceWorker.controller){
          if(registration.waiting){
            console.log('nova atualizacao');
          }
        }

        if (serviceWorker) {
          serviceWorker.addEventListener('statechange', function (e) {
            // if(e.state == 'installed'){
            //
            // }
          });
        }
      });

    } else {
      $rootScope.notifications.push({
        message: 'This browser does NOT support Service Worker',
        type: 'btn-danger',
        class: 'fa fa-shield'
      });
    }

    if (!("indexedDB" in window)){
      $rootScope.notifications.push({
        message: 'This browser does NOT support IndexedDB',
        type: 'btn-danger',
        class: 'fa fa-database'
      });
    }else{
      idbInit.agency();

      idbInit.stops();
      idbInit.stop_times();

      $rootScope.notifications.push({
        message: 'This browser support IndexedDB',
        type: 'btn-success',
        class: 'fa fa-database'
      });
    }

    //stops_real_time();

    function stops_real_time(){

      function loadRemoteData(url) {
          var script = document.createElement("script");
          script.setAttribute("type","text/javascript");
          script.setAttribute("src", url);
          document.getElementsByTagName("head")[0].appendChild(script);
      }

      function processData(jsonResult) {
        var teste = JSON.stringify(jsonResult);
          //alert(JSON.stringify(jsonResult)); //alert the JSON as a string
      }

      loadRemoteData("http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?routeIDF=Caltrain~LOCAL~NB&token=8b3ec317-7cc8-444e-9057-3f0642ea4cd6");











      /*$http({
        method: 'GET',
        url: 'http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?routeIDF=Caltrain~LOCAL~NB&token=8b3ec317-7cc8-444e-9057-3f0642ea4cd6'
      }).then(function successCallback(response) {
          var teste = response;
      }, function errorCallback(response) {
          var teste2 = response;
      });*/

      /*          $http.get(
                    'data.xml',
                    {transformResponse:function(data) {
                    	// convert the data to JSON and provide
                    	// it to the success function below
						var x2js = new X2JS();
						var json = x2js.xml_str2json( data );
						return json;
						}
					}
                ).
                success(function(data, status) {
					// send the converted data back
					// to the callback function
                    callback(data);
                })
*/

    /*  $http.jsonp('http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?routeIDF=Caltrain~LOCAL~NB&token=8b3ec317-7cc8-444e-9057-3f0642ea4cd6')
          .then(function successCallback(response) {
              var teste = response;
          }, function errorCallback(response) {
              var teste2 = response;
          });*/
     }
  });

  angular.module('app')
      .factory('appConfig', [appConfig]);

  function appConfig() {
      var pageTransitionOpts = [
          {
              name: 'Fade up',
              "class": 'animate-fade-up'
          }, {
              name: 'Scale up',
              "class": 'ainmate-scale-up'
          }, {
              name: 'Slide in from right',
              "class": 'ainmate-slide-in-right'
          }, {
              name: 'Flip Y',
              "class": 'animate-flip-y'
          }
      ];
      var date = new Date();
      var year = date.getFullYear();
      var main = {
          brand: 'Caltrain',
          name: 'Lisa',
          year: year,
          layout: 'wide',                                 // 'boxed', 'wide'
          menu: 'vertical',                               // 'horizontal', 'vertical'
          isMenuCollapsed: true,                         // true, false
          fixedHeader: true,                              // true, false
          fixedSidebar: false,                             // true, false
          pageTransition: pageTransitionOpts[0],          // 0, 1, 2, 3... and build your own
          skin: '26'                                      // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
      };
      var color = {
          primary:    '#31C0BE',
          success:    '#60CD9B',
          info:       '#66B5D7',
          infoAlt:    '#8170CA',
          warning:    '#EEC95A',
          danger:     '#E87352',
          gray:       '#DCDCDC'
      };

      return {
          pageTransitionOpts: pageTransitionOpts,
          main: main,
          color: color
      }
  }
})();
