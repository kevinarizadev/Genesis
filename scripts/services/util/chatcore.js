'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:notification
 * @description
 * # servicio  para el llamado de notificacion, alertas, mensajes.
 */
 angular.module('GenesisApp').service('ChatCore',function($rootScope, $http, config) {
    var user = { 
        id: uuid(),
        name: 'Javier',
        recep : 'xxx',
        fecha: 'xxx',
        hora: 'xx',
        usu:'xxx'
    };

    var self = this;

    self.rltm = rltm(config.rltm);
    
    // the global room everyone is in
    self.roomGlobal;

    // my own private rooms
    self.roomPrivate;

    // everyone elses private rooms
    self.rooms = {};

    // Set User Data
    self.user = function(data) {

        if (data) {
            angular.extend(user, data);
        }

        return user;

    };

    // Publish over network
    self.publish = function(setup) {

        var user = setup.user || self.user();

        var data = setup.data;

        if(setup.to) {

            if(!self.rooms[setup.to]) {
                self.rooms[setup.to] = self.rltm.join(setup.to);   
            }

            return self.rooms[setup.to].publish({
                data: setup.message,
                user: user
            });

        } else {

            return self.roomGlobal.publish({
                data: setup.message,
                user: user
            });

        }

    };

    // Subscribe to new messages
    self.subscribe = function(fn) {

        self.roomGlobal = self.rltm.join('global');
        self.roomPrivate = self.rltm.join(self.user().id);

        self.roomGlobal.on('message', function(uuid, data) {
            fn(data, false);  
            $rootScope.$apply();
        });

        self.roomPrivate.on('message', function(uuid, data) {

            fn(data, true);  
            $rootScope.$apply();

        });

        return self.room;

    };
    
 });

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

