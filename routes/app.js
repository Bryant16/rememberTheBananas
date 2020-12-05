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
  const allLists = await List.findAll({
    where: {userId: id},
    include: [Task]
  });
  // const list = await List.findByPk(1);
  // const allTasks = await List.findByPk(1, {
  //   include: [Task]
  // })
  console.log(`lists:`, allLists[0])
  //const tasks = allTasks.Task;
    res.render('app', { list: allLists[0], user, allLists, allTasks: allLists[0] })
}));

router.get('/:id', asyncHandler(async(req, res, next) => {
  const id = parseInt(req.params.id);
  const user = parseInt(req.session.auth.userId, 10);
  const list = await List.findByPk(id, {
    include: [Task]
  })
  const allLists = await List.findAll({
    where: { userId: user }
  });
  
  res.render('app', { list, allLists, allTasks: list });
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

router.get('/lists:id(\\d+)', asyncHandler(async(req, res)=>{
    const id = parseInt(req.params.id, 10);
    const list = await List.findByPk(id);
    if(list){
         res.json({list})
    }else{
        next(listNotFoundError(id))
    }
}));

router.delete('/tasks', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemsToDelete = req.body.items;
  await ListandTask.destroy({
    where: {
      taskId: itemsToDelete
    }
  })
  const task = await Task.destroy({
    where: {
      id: itemsToDelete
    }
  })
  if (task) {
    res.json({ message: "success!" });
  }
}))

router.post('/lists', asyncHandler(async(req, res)=>{
  const id = parseInt(req.session.auth.userId, 10);
  const list = await List.create({ name: req.body.list, userId: id });
  const allLists = await List.findAll({
    where:{userId: id}
  });

  res.render('app', { allLists, list});
}));

router.post('/app/search', )

module.exports = router;
