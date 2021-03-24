const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.get('/courses', controllers.courses.getAll);
router.get('/', controllers.get);
router.get('/courses/:id', controllers.courses.getCourseById);
router.delete('/courses/:id', controllers.courses.deleteCourseById);
router.post('/courses', controllers.courses.createCourse);
router.put('/courses', controllers.courses.updateCourseById);

module.exports = router;
