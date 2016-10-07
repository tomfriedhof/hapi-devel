'use strict';

exports.register = function (server, options, next) {

  var routes = [];
  var table = server.table()[0].table;
  table.forEach(function(route) {

    if (route.method.toLowerCase() != 'options') {
      var route = {
        "path": route.path,
        "method": route.method.toUpperCase(),
        "description": route.settings.description,
        "notes": route.settings.notes
      };
      routes.push(route);
    }

  });

  server.views({
    engines: { jade: require('jade') },
    path: __dirname + '/templates',
    compileOptions: {
      pretty: true
    }
  });

  server.route({
    method: 'GET',
    path: '/devel/routes',
    config: {
      auth: false,
      handler: {
        view: {
          template: 'routes',
          context: {
            pageTitle: 'Routes registered with server',
            routes: routes
          }
        }
      }
    }
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
