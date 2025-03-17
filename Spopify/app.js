const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const db = require('./util/database'); 

app.use(cookieParser());
app.use(session({
    secret: 'mi_string_secreto_spopify_2024',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));

const csrfProtection = csrf();
app.use(csrfProtection);

app.use(async (req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    res.locals.userName = req.session.userName || null;
    res.locals.csrfToken = req.csrfToken();
    console.log('CSRF Token:', res.locals.csrfToken); 

    if (req.session.userId) {
        const [roles] = await db.query('SELECT r.name FROM roles r JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = ?', [req.session.userId]);
        req.session.userRole = roles.length > 0 ? roles[0].name : 'guest';
    } else {
        req.session.userRole = 'guest';
    }

    next();
});

function checkPermission(role) {
    return (req, res, next) => {
        if (req.session.userRole && req.session.userRole === role) {
            next();
        } else {
            res.status(403).render('403', { title: 'Acceso Denegado' });
        }
    };
}

const rutasCanciones = require('./routes/canciones.routes');
const rutasPlataformas = require('./routes/plataformas.routes');
const rutasPlaylists = require('./routes/playlists.routes');
const rutasAuth = require('./routes/auth.routes');

app.use((request, response, next) => {
    console.log(`Solicitud: ${request.method} ${request.url}`);
    next();
});

app.get('/', (request, response, next) => {
    response.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
    });
    
    response.render('index', { 
        title: 'Inicio',
        lastVisit: request.cookies.lastVisit || 'Primera visita'
    });
});

app.get('/admin', checkPermission('admin'), (req, res, next) => {
    res.render('admin', { title: 'Admin Page' });
});

app.use('/auth', rutasAuth);
app.use('/canciones', rutasCanciones);
app.use('/plataformas', rutasPlataformas);
app.use('/playlists', rutasPlaylists);

app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

app.listen(3000, () => {
    console.log('Server is localhost:3000');
});