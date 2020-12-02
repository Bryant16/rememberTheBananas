const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { List, Task } = db;
const { csrfProtection, asyncHandler } = require('../utils');
const { requireAuth } = require('../auth');

const router = express.Router();

const listValidators = [
    check("name")
      .exists({ checkFalsy: true })
      .withMessage("List does not exisit"),
  ]
  const listNotFoundError = (id) => {
    const err = Error('List not found');
    err.errors = [`List with id of ${id} could not be found.`];
    err.title = 'List not found.';
    err.status = 404;
    return err;
  };
router.get('/', csrfProtection, asyncHandler(async(req, res, next)=>{
    const list = await List.findByPk(1);
    if(list){
        res.render('app', { list })
    }else{
        next(listNotFoundError(1))
    }
}));

router.get('/lists:id(\\d+)', asyncHandler(async(req, res)=>{
    const id = parseInt(req.params.id, 10);
    const list = await List.findByPk(id);
    if(list){
         res.json({list})
    }else{
        next(listNotFoundError(id))
    }
}));



// /*
// //router.get('/', )

// /list/1, get


// /list/:id get, post

// add task
//     event listener to add to the page

// edit task, /list/edit/:id

// /search/(regex for key words) post



// router.get('/list/:id(//d+)')
// /*

module.exports = router;
