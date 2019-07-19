const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Schemes.find()
    .then(schemes => {
      res.status(200).json(schemes);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
    .then(schemes => {
      res.status(200).json(schemes);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
});

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
    .then(steps => {
      res.status(200).json(steps);
    })
    .catch(error => {
      res.status(500).json({ message: 'We failed you, sorry.' + error });
    });
});

router.post('/', async (req, res) => {
  const schemeData = req.body;

  try {
    const scheme = await Schemes.add(schemeData);
    res.status(201).json(scheme);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new scheme' + err });
  }
});

router.post('/:id/steps', async (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  try {
    const scheme = await Schemes.findById(id);

    if (scheme) {
      const step = await Schemes.addStep(stepData, id);
      res.status(201).json(step);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new step' + err });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const scheme = await Schemes.findById(id);

    if (scheme) {
      const updatedScheme = await Schemes.update(changes, id);
      res.json(updatedScheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update scheme' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Schemes.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete scheme' + err });
  }
});

module.exports = router;
