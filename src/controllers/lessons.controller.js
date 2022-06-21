const { lessons } = require('../models');

module.exports = {
    getAllLessons: async (req, res) => {
        try {
            const { lessonId } = req.body;
            if (!lessonId) {
                res.status(200).json(await lessons.findAll());
            } else {
                res.status(200).json(
                    await lessons.findOne({
                        where: {
                            id: lessonId,
                        },
                    })
                );
            }
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
    createNewLesson: async (req, res) => {
        try {
            const { theme, courseId } = req.body;
            await lessons.create({ theme, courseId });
            res.status(201).send({
                message: 'Lesson was created successfully!',
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    updateLesson: async (req, res) => {
        try {
            const { theme, lessonId } = req.body;
            res.status(200).json(
                await lessons.update(
                    {
                        theme,
                    },
                    {
                        where: {
                            id: lessonId,
                        },
                    }
                ),
                { message: 'Lesson was updated successfully!' }
            );
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
    deleteLesson: async (req, res) => {
        try {
            const { lessonId } = req.body;
            await lessons.destroy({
                where: {
                    id: lessonId,
                },
            });
            res.status(201).send({
                message: 'Lesson was deleted successfully!',
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
};
