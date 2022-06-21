const { users, courses, library } = require('../models');
const bcrypt = require('bcryptjs');
const { signUser } = require('../utils/jwt');

module.exports = {
    getStudent: async (req, res) => {
        try {
            const { userId } = req.body;
            res.status(200).json(
                await users.findOne({
                    include: [
                        {
                            model: courses,
                        },
                        {
                            model: library,
                        },
                    ],
                    where: {
                        id: userId,
                    },
                })
            );
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const { fname, lname, email, password } = req.body;
            const user = await users.create({
                firstname: fname,
                lastname: lname,
                email: email,
                password: bcrypt.hashSync(password, 8),
            });
            console.log(user.id);
            res.status(201).send({
                token: signUser({
                    id: user.dataValues.id,
                    role: user.dataValues.role,
                }),
                message: 'User was registered successfully!',
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { firstname, lastname, password, image } = req.body;
            res.status(200).json(
                await users.update({
                    firstname,
                    lastname,
                    image,
                    password,
                }),
                { message: 'User was updated successfully!' }
            );
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
    addCourse: async (req, res) => {
        try {
            const { userId, courseId } = req.body;
            const user = await users.findOne({
                where: {
                    id: userId,
                },
            });
            const course = await courses.findOne({
                where: {
                    id: courseId,
                },
            });
            await user.addCourses(course);
            res.send({
                message: 'Course added successfully!',
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
    addLibrary: async (req, res) => {
        try {
            const { userId, libraryId } = req.body;
            const user = await users.findOne({
                where: {
                    id: userId,
                },
            });
            const library = await courses.findOne({
                where: {
                    id: libraryId,
                },
            });
            await user.addLibrary(library);
            res.send({
                message: 'Library added successfully!',
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
    removeCourse: async (req, res) => {
        try {
            const { userId, courseId } = req.body;
            const user = await users.findOne({
                where: {
                    id: userId,
                },
            });
            const course = await courses.findOne({
                where: {
                    id: courseId,
                },
            });
            await user.removeCourses(course);
            res.send({
                message: 'Course was removed successfully!',
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
    removeLibrary: async (req, res) => {
        try {
            const { userId, libraryId } = req.body;
            const user = await users.findOne({
                where: {
                    id: userId,
                },
            });
            const library = await courses.findOne({
                where: {
                    id: libraryId,
                },
            });
            await user.removeLibrary(library);
            res.send({
                message: 'Library was removed successfully!',
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
};
