/**
 * @chalk
 * @name MacGyver Toaster
 * @description
 * A notification module in the form of a toaster.
 * The `Mac.Toaster` module comes with a `notification` provider for configuration
 * and a `notification` service for showing and hiding notifications
 *
 * @param {String} template Toasters template
 * @param {String} position Toasters position (default "top right")
 * @param {Integer} max     Maximum number of notifications (default 5)
 * @param {Integer} delay   Closing delay (default 4000)
 *
 */

angular.module("Mac.Toaster", []).
  provider("notification", function() {
    var config, self;

    self = this;
    config = {
      template: "<div class=\"mac-toasters\"><div class=\"mac-toaster\" ng-repeat=\"notification in notifications\">" +
        "<div ng-class=\"notification.type\" class=\"mac-toaster-content\">" +
        "<div class=\"mac-toaster-icon\"><i ng-class=\"notification.type\" class=\"icon\"></i></div>" +
        "<div class=\"mac-toaster-message\">{{notification.message}}</div></div>" +
        "<i ng-click=\"close($index)\" class=\"icon x\"></i>" +
        "</div></div>",
      position: "top right",
      max: 5,
      delay: 4000
    };

    this.options = function(key, value){
      if (angular.isObject(key)) {
        angular.forEach(key, self.options);
      } else if (key && !value) {
        return config[key];
      } else {
        config[key] = value;
      }
    };

    this.$get = [
      "$animate",
      "$compile",
      "$rootScope",
      "$timeout",
      function ($animate, $compile, $rootScope, $timeout) {
        var notifications, show, error, success, notice, close, toasterScope, toastersElement,
            styles = {}, positions, i;

        positions = config.position.split(" ");

        // Create an isolate scope for all the toaster notifications
        toastersScope = $rootScope.$new(true);
        angular.extend(toastersScope, {
          notifications: [],
          close: function(index) {
            close(index);
          }
        });

        /**
         * @chalk
         * @function
         * @name show
         * @description
         * Showing certain type of message
         * @param {String} type    Message type
         * @param {String} message Message content
         * @param {Object} options Showing toaster options
         */

        /**
         * @chalk
         * @function
         * @name error
         * @description
         * Shortcut function for showing error type
         * @param {String} message Alert message
         * @param {Object} options Additional options
         */

         /**
          * @chalk
          * @function
          * @name success
          * @description
          * Shortcut function for showing success type
          * @param {String} message Alert message
          * @param {Object} options Additional options
          */

         /**
          * @chalk
          * @function
          * @name notice
          * @description
          * Shortcut function fow showing notice type
          * @param {String} message Alert message
          * @param {Object} options Additional options
          */

        show = function(type, message, options) {
          var timeoutPromise;

          // Default to empty object
          if (options == null) {
            options = {};
          }

          // If there are more notifications than max, pop the first one
          if (toastersScope.notifications.length >= config.max) {
            toastersScope.notifications.shift();
          }

          timeoutPromise = $timeout(function() {
            toastersScope.notifications.shift();
            timeoutPromise = null;
          }, config.delay);

          toastersScope.notifications.push({
            type: type,
            message: message,
            options: options,
            promise: timeoutPromise
          });
        };

        error = function(message, options) {
          show.call(this, "error", message, options);
        };

        success = function(message, options) {
          show.call(this, "success", message, options);
        };

        notice = function(message, options) {
          show.call(this, "notice", message, options);
        };

        close = function(index) {
          var notification = toastersScope.notifications[index];
          if (notification.promise) {
            $timeout.cancel(notification.promise);
          }
          toastersScope.notifications.splice(index, 1);
        };

        toastersElement = $compile(config.template)(toastersScope);

        for (i = 0; i < positions.length; i++) {
          toastersElement.css(positions[i], 14);
        }

        $animate.enter(toastersElement, angular.element(document.body));

        return {
          show: show,
          error: error,
          success: success,
          notice: notice,
          close: close
        };
      }
    ];
  });
