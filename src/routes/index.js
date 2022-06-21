const express = require('express');
const router = express.Router();

const UserController = require('../controllers/student.controller');
const CourseController = require('../controllers/course.controller');
const LessosController = require('../controllers/lessons.controller');
const LibraryController = require('../controllers/library.controller');
const BooksController = require('../controllers/books.controller');

router
    //user-routes
    .get('/user', UserController.getStudent)
    .post('/user', UserController.createUser)
    .put('/user', UserController.updateUser)
    .post('/user/course', UserController.addCourse)
    .post('/user/library', UserController.addLibrary)
    .delete('/user/course', UserController.removeCourse)
    .delete('/user/library', UserController.removeLibrary)
    //course-routes
    .get('/courses', CourseController.getAllCourses)
    .post('/courses', CourseController.createNewCourse)
    .put('/courses', CourseController.updateCourse)
    .delete('/courses', CourseController.deleteCourse)
    //lesson-routes
    .get('/lessons', LessosController.getAllLessons)
    .post('/lessons', LessosController.createNewLesson)
    .put('/lessons', LessosController.updateLesson)
    .delete('/lessons', LessosController.deleteLesson)
    //library-routes
    .get('/library', LibraryController.getAllLibrary)
    .post('/library', LibraryController.createNewLibrary)
    .put('/library', LibraryController.updateLibrary)
    .delete('/library', LibraryController.deleteLibrary)
    //book-routes
    .get('/books', BooksController.getAllBooks);
// .post('/books', BooksController.createNewBook)
// .put('/books', BooksController.updateBook)
// .delete('/books', BooksController.deleteBook);

module.exports = router;
