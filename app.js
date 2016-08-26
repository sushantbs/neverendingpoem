var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessions = require('client-sessions');
var csrf = require('csrf')();
var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var debug = require('debug')('nep:server');
var http = require('http');

function startWebServer (mongoClient) {

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());

	function xsrfVerify() { return function(req, res, next) {
	  if (req.method != 'GET') {
	    var xsrf = '';
	    if (req.headers && req.headers.xsrf) {
	      xsrf = req.headers.xsrf;
	    } else if (req.body && req.body.xsrf) {
	      xsrf = req.body.xsrf
	    }
	    var valid = csrf.verify(req.session.xsrf, xsrf);
	    if (!valid) {
	      return res.status(403).send('XSRF verification failed. Bot Begone!');
	    }
	  }
	  next();
	}}

	function sessionStore() {

		var csession = sessions({
		    cookieName: 'session',
		    secret: 'NlC%YtbBC+rta$sL@Rpw',
		    duration: 24 * 60 * 60 * 1000,
		    cookie: {
		        path: '/',
		        httpOnly: true
		    }
		});
		return csession;
	}

	function session() { return function(req, res, next) {

		if (!req.nep) {
			req.nep = {};
		}
	  // update the last session access time (after taking backup)
	  var now = Date.now();
	  req.session.ltime = now;

	  // xsrf token generation
	  if (!req.session.xsrf) {
	    req.session.xsrf = csrf.secretSync();
	  }
	  var xsrfToken = csrf.create(req.session.xsrf);
	  req.nep.xsrfToken = xsrfToken;

	  // session creation time
	  if (!req.session.ctime) {
	    req.session.ctime = now;
	  }

	  next();
	}}

	// middleware
	app.use([sessionStore(), session(), xsrfVerify()]);

  app.use('/static', express.static(path.join(__dirname, 'build')));
  app.use('/imgs', express.static(path.join(__dirname, 'src/imgs')));
  app.use('/users', users);
  app.use('/api', api({db: mongoClient}));
  app.use('/', routes);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });


  /**
   * Get port from environment and store in Express.
   */

  var port = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || process.env.NODE_PORT || '3000');
  var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  var server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port, ip);
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
  }
}

function startMongoClient () {

  var mongodb = require('mongodb');
  var MongoClient = mongodb.MongoClient;

  // default to a 'localhost' configuration:
  var connection_string = 'localhost:27017/nep';
  // if OPENSHIFT env variables are present, use the available connection info:
  if(process.env.OPENSHIFT_MONGODB_DB_USERNAME){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
  }

  var url = 'mongodb://' + connection_string;

  MongoClient.connect(url, function(err, db) {

    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log('starting web server');
    startWebServer(db);
  });
}

try {
  startMongoClient();
}
catch (e) {
  console.log(e);
}
