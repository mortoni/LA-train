(function () {
  'use strict';

  angular.module('app').factory('idbInit', function(jsonFactory, $rootScope){
      return {
          agency: function(){
            var agencyJSON = jsonFactory.agency();

            var agency = new IDBStore({
              dbVersion: 1,
              storeName: 'agency',
              keyPath: 'agency_id',
              autoIncrement: false,
              onStoreReady: function(){
                console.log('Agency is ready!');
                agencyJSON.forEach(function(entry) {
                  agency.put(entry);
                });
                agency.getAll(function(data){
                  $rootScope.agency = data[0];
                  //return data[0];
                });
              }
            });
          },
          stops: function(){
            var stopsJSON = jsonFactory.stops();

            var stops = new IDBStore({
              dbVersion: 1,
              storeName: 'stops',
              keyPath: 'stop_id',
              autoIncrement: false,
              onStoreReady: function(){
                console.log('Stops is ready!');
                stopsJSON.forEach(function(entry) {
                  stops.put(entry);
                });
                stops.getAll(function(data){
                  data.forEach(function(stop){
                    stop.stop_name = stop.stop_name.match(/- (.*) STATION/)[1];
                    if(isStop(stop))
                      $rootScope.stops.push(stop);
                  });
                });
              }
            });

            function isStop(stop){
              var flag = true;
              $rootScope.stops.forEach(function(entry){
                if(entry.stop_name == stop.stop_name)
                  flag = false;
              });
              return flag;
            };
          }
      }
  });
})();
