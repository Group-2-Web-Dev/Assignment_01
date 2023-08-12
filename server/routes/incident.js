let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


// connect to our Incident Model
let Incident = require('../models/incident');

let incidentController = require('../controllers/incident');

function requireAuth(req, res, next)
{
    //check is the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


// Get Route for the Incident List page - READ Operation
router.get('/', incidentController.displayIncidentList);



// Get Route for displaying the Add page - CREATE Operation
router.get('/add', requireAuth, incidentController.displayAddPage);

// Post Route for processing the Add Page - CREATE Operation
router.post('/add', requireAuth, incidentController.processAddPage);

// Get Route for displaying the Edit Page - UPDATE Operation
router.get('/edit/:id', requireAuth, incidentController.displayEditPage);

// Post Route for processing the Edit Page - UPDATE Operation
router.post('/edit/:id', requireAuth, incidentController.processEditPage);

// Get to perform Deletion - DElETE Operation
router.get('/delete/:id', requireAuth, incidentController.performDelete);

module.exports = router;