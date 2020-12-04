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
    //const list = await List.findByPk(1);
    const user = await User.findByPk(1)
    //const tasks = await Task.findAll(where: {listId: })
    const allLists = await List.findAll()
    const tasks = await List.findByPk(1, {
      include: [Task]
    })
    console.log(tasks)
    console.log(allLists)
    res.render('app', {user, allLists, tasks })
    // res.json({ tasks })
    // if(list){
    // }else{
    //     next(listNotFoundError(1))
    // }
}));

router.get('/:id', asyncHandler(async(req, res, next) => {
  const id = parseInt(req.params.id)
  const list = await List.findByPk(id, {
    // include: [ListandTask]
  })
  const allLists = await List.findAll();
  res.render('app', { list, allLists })
}))
//router.delete ('/tasks/:id',())
router.post('/tasks', asyncHandler(async (req,res, next) => {
  // req.body
  // task = name of task
  // listId = id of the list you want the task to go into
  const id = parseInt(req.body.listId)
//   const list = await List.findByPk(id, {
//     include: [Task]
//   });
  //   const list = await ListandTask.findByPk(id, {
    //   where: {
      //     taskId: req.body.task
  //   }
  // });
  //console.log(req.body.task)
  //   const theNewTask = await list.addTask({
    //   name: req.body.task
    // });
    // const joinedTask = await ListandTask.create({taskId: task.id })
    // list: list,, message: "Hi bryant and nichole"

    const task = await Task.create({ name: req.body.task})
    // const lists = await List.findAll();
    const users = await User.findByPk( 1, {
      include: [List]
    });

    const listandtask = await ListandTask.findByPk(1);
    console.log(listandtask)
    // await ListandTask.create({ listId: users.List.listId, taskId: req.body.task})


    console.log('users', users)

    // console.log('lists', lists)
    res.json({ task, users });


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
    const id = parseInt(req.session.auth.userId, 10)
    const list = await List.create({name:req.body.list, userId:id })

    res.redirect('/app')
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
