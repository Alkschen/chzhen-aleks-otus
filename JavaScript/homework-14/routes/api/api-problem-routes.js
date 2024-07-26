const express = require('express');
const router = express.Router();
const problemController = require('../../controllers/api/api-problem-controller');

router.get('/api/languages', problemController.getLanguages);
router.get('/api/problems', problemController.getProblems);
router.get('/api/problems/:id', problemController.getProblemById);
router.delete('/api/problems/:id', problemController.deleteProblem);
router.post('/api/add-problem', problemController.addProblem);
router.put('/api/edit-problem/:id', problemController.editProblem);

module.exports = router;
