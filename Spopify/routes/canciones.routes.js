const express = require('express');
const router = express.Router();
const cancionesController = require('../controllers/canciones.controller');

const isAuth = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.cookie('redirectTo', req.originalUrl, { httpOnly: true });
        return res.redirect('/');
    }
    next();
};

router.get('/', cancionesController.getAll);

router.get('/ver/:id', cancionesController.getSong);

router.get('/agregar', isAuth, cancionesController.getNew);
router.post('/agregar', isAuth, cancionesController.postNew);

router.get('/editar/:id', isAuth, cancionesController.getEdit);
router.post('/editar', isAuth, cancionesController.postEdit);

module.exports = router;