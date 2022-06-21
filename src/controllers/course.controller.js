const { courses, lessons } = require('../models');

module.exports = {
    getAllCourses: async (req, res) => {
        try {
            const { courseId } = req.body;
            if (!courseId) {
                res.status(200).json(
                    await courses.findAll({
                        include: lessons,
                    })
                );
            } else {
                res.status(200).json(
                    await courses.findOne({
                        include: lessons,
                        where: {
                            id: courseId,
                        },
                    })
                );
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    createNewCourse: async (req, res) => {
        try {
            const { name, durationMonth } = req.body;
            await courses.create({ name, durationMonth });
            res.status(201).send({
                message: 'User was registered successfully!',
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    updateCourse: async (req, res) => {
        try {
            const { name, durationMonth, description, courseId } = req.body;
            res.status(200).json(
                await courses.update(
                    {
                        firstname,
                        lastname,
                        image,
                        password,
                    },
                    {
                        where: {
                            id: courseId,
                        },
                    }
                ),
                { message: 'Course was updated successfully!' }
            );
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
    deleteCourse: async (req, res) => {
        try {
            const { courseId } = req.body;
            await courses.destroy({
                where: {
                    id: courseId,
                },
            });
            res.status(201).send({
                message: 'User was deleted successfully!',
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
};
