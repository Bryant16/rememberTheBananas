const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { List, Task, User, ListandTask } = db;
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
  const id = parseInt(req.session.auth.userId, 10);
  const user = await User.findByPk(id);
    const allLists = await List.findAll()
    const tasks = await List.findByPk(id, {
      include: [Task]
    })
    res.render('app', {user, allLists, tasks })
}));

router.get('/:id', asyncHandler(async(req, res, next) => {
  const id = parseInt(req.params.id)
  const list = await List.findByPk(id, {
    include: [Task]
  })
  const allLists = await List.findAll();
  console.log(list);
  res.render('app', { list, allLists })
}))
//router.delete ('/tasks/:id',())
router.post('/tasks', asyncHandler(async (req,res, next) => {
  const id = parseInt(req.body.listId);
  const list = await List.findByPk(id, {
    include: [Task]
  });
  const newTask = await Task.create({ name: req.body.task});
  const joined = await ListandTask.create({ listId: id , taskId: newTask.id})

    res.json({ newTask });
}))

// router.post('/tasks', asyncHandler(async (req,res, next) => {
//   const list = await List.create({ name:req.body.list });
//   res.json({ list });
// }))

router.get('/lists:id(\\d+)', asyncHandler(async(req, res)=>{
    const id = parseInt(req.params.id, 10);
    const list = await List.findByPk(id);
    if(list){
         res.json({list})
    }else{
        next(listNotFoundError(id))
    }
}));
 // const user = await User.findByPK({})
    // const list = await List.create({})
router.post('/lists', asyncHandler(async(req, res)=>{
  const id = parseInt(req.session.auth.userId, 10);
  const list = await List.create({ name: req.body.list, userId: id });
  const allLists = await List.findAll();
  res.render('app', { allLists, list });
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
