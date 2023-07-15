let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Incident = require('../models/incident');

module.exports.displayIncidentList = async (req, res, next) => {
    try {
        let incidentList = await Incident.find();
        console.log('incidentList inside controller');

        console.log(incidentList);
        
        res.render('incident/list', {
            title: 'Incident List', 
            IncidentList: incidentList,
            displayName: req.user ? req.user.displayName : ''})
    } catch (err) {
        console.error(err);
    }
};


module.exports.displayAddPage = async (req, res, next) =>{
    try {
        res.render('incident/add', {
            title: 'Add Incident', 
            displayName: req.user ? req.user.displayName : ''})
    } catch (err) {
        console.error(err);
    }
};


module.exports.processAddPage = async (req, res, next) =>{
    let newIncident = new Incident({
        "counter": req.body.counter,
        "incidentNumber": req.body.incidentNumber,
        "description": req.body.description,
        "priority": req.body.priority,
        "customerName": req.body.customerName,
        "status":req.body.status,
        "lastUpdateTime": req.body.lastUpdateTime,
        "duration":req.body.duration,
        "resolution":req.body.resolution
    });

    try{
        await newIncident.save();
        res.redirect('/incident-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.displayEditPage = async (req, res, next) =>{
    let id = req.params.id;

    try {
        let incidentToEdit = await Incident.findById(id);
        res.render('incident/edit', {
            title: 'Edit Incident', 
            incident: incidentToEdit, 
            displayName: req.user ? req.user.displayName : ''});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.processEditPage = async (req, res, next) =>{
    let id = req.params.id;
    console.log('this is ' + id);


    let updatedIncident = {
        "counter": req.body.counter,
        "incidentNumber": req.body.incidentNumber,
        "description": req.body.description,
        "priority": req.body.priority,
        "customerName": req.body.customerName,
        "status":req.body.status,
        "lastUpdateTime": req.body.lastUpdateTime,
        "duration":req.body.duration,
        "resolution":req.body.resolution
    };

    

    try {
        await Incident.updateOne({_id: id}, updatedIncident);
        res.redirect('/incident-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};


module.exports.performDelete = async (req, res, next) =>{
    let id = req.params.id;

    try {
        await Incident.findByIdAndRemove(id);
        res.redirect('/incident-list');
    } catch (err) {
        onsole.log(err);
        res.status(500).send(err);
    }
};