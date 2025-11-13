const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');

// GET all bugs
router.get('/', async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create bug
router.post('/', async (req, res) => {
  try {
    const newBug = await Bug.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    });
    res.status(201).json(newBug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update bug
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating bug:', req.params.id, req.body);
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    bug.title = req.body.title || bug.title;
    bug.description = req.body.description || bug.description;
    bug.status = req.body.status || bug.status;
    const updatedBug = await bug.save();
    console.log('Updated bug:', updatedBug);
    res.json(updatedBug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE bug
router.delete('/:id', async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    await bug.remove();
    res.json({ message: 'Bug deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;