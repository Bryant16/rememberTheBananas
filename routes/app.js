const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { List, Task, User, ListandTask } = db;
const { csrfProtection, asyncHandler } = require('../utils');
const { requireAuth } = require('../auth');
const { Op, json } = require("sequelize");

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
router.use(requireAuth);

router.get('/', csrfProtection, asyncHandler(async(req, res, next)=>{
  const id = parseInt(req.session.auth.userId, 10);
  const user = await User.findByPk(id);
  const allLists = await List.findAll({
    where: {userId: id},
    include: [Task]
  });

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

router.post('/tasks', asyncHandler(async (req,res, next) => {

  const id = parseInt(req.body.listId, 10);

  // let selectedItems = req.body.selectedDeletedTasks;
  // console.log('DELETED:',selectedDeletedTasks)

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
  const itemsToDelete = req.body.selectedItems;

  console.log("HIIIII")
  // const taskIds = await Task.findAll({
  //   where: {

  //   }
  // })
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

// marked completed
router.put("/tasks", asyncHandler(async (req, res) => {
  // console.log("HI")
  const userId = parseInt(req.session.auth.userId, 10);
  console.log(JSON.stringify(req.body.array))
  const { array } = req.body
  
  array.forEach( async (completedItem) => {
    const  { task, id } = completedItem;
    const completedTask = await List.findOne({
      where: {
        userId: userId,
      },
              include: {
              model: Task,
              where: {
                name: task,
                id: id
              }
    }})
    console.log(JSON.stringify(completedTask, null, 2))
    completedTask.completed = true
    completedTask.save()
    console.log(completedTask);
  })

}));

router.post('/search', asyncHandler(async (req, res) => {
  const value = req.body.searchTerm;
  const id = parseInt(req.session.auth.userId, 10);
  let allTasks;

  if(value) {
    allTasks = await Task.findAll({
      through: {
        model: List,
        where: { userId: id }
      },
      where: {
        name: { [Op.iLike]: `%${value}%` }
      }
    })

  }

   res.json({ allTasks })
}))

router.get('/completed', asyncHandler( async (req, res) => {
  console.log("hi")
  const id = parseInt(req.session.auth.userId, 10);
  const completed = await Task.findAll({
    where: { completed: true},
    include: {
    model: List,
    Where: {
      userId: id
    }
  }})
  console.log(completed)
  res.json({ completed })
}));

module.exports = router;
