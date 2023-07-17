'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:notification
 * @description
 * # servicio  para el llamado de notificacion, alertas, mensajes.
 */
 angular.module('GenesisApp')
 .service( 'Messages', function(ChatCore) {
    var self = this;
    // Send Messages
    self.send = function(message) {
        if (!message.data) return;
        ChatCore.publish({
            to: message.to || 'global',
            message: message.data,   
            user: ChatCore.user()
        });
    };

    // Receive Messages
    self.receive = function(fn) {
        self.subscription = ChatCore.subscribe(fn);
    };

    // Set/Get User
    self.user = function(data) {
        return ChatCore.user(data);
    };
    
 });



