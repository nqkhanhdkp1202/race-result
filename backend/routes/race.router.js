const express = require('express')
const router = express.Router();

const raceController = require('../controller/race.controller');

const teamController = require('../controller/team.controller');
const driverController = require('../controller/driver.controller');
const yearController = require('../controller/year.controller');

router.get('/races/', raceController.getRaceList)

router.get('/races/:id', raceController.getRaceByID)

router.get('/teams/', teamController.getTeamList)

router.get('/teams/:id', teamController.getTeamByID)

router.get('/drivers/', driverController.getDriverList)

router.get('/drivers/:id', driverController.getDriverByID)

router.get('/years/', yearController.getYearList)

router.get('/years/:id', yearController.getYearByID)


module.exports = router