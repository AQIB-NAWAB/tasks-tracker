const express = require('express');
const router=express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



router.get('/tasks', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  });

  router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
    res.json(task);
  })
  
  router.post('/tasks', async (req, res) => {
    const { title, color } = req.body;
    const task = await prisma.task.create({ data: { title, color } });
    res.json(task);
  });
  
  router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, color, completed } = req.body;
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, color, completed },
    });
    res.json(task);
  });
  
  router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.task.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Task deleted' });
  });
  

module.exports=router;