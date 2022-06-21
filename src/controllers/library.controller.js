const { library, books } = require('../models');

module.exports = {
    getAllLibrary: async (req, res) => {
        try {
            const { libraryId } = req.body;
            if (!libraryId) {
                res.status(200).json(
                    await library.findAll({
                        include: books,
                    })
                );
            } else {
                res.status(200).json(
                    await library.findOne({
                        include: books,
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
    createNewLibrary: async (req, res) => {
        try {
            const { name } = req.body;
            await library.create({ name });
            res.status(201).send({
                message: 'Library was created successfully!',
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    updateLibrary: async (req, res) => {
        try {
            const { name, libraryId } = req.body;
            res.status(200).json(
                await lessons.update(
                    {
                        name,
                    },
                    {
                        where: {
                            id: libraryId,
                        },
                    }
                ),
                { message: 'Library was updated successfully!' }
            );
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
    deleteLibrary: async (req, res) => {
        try {
            const { libraryId } = req.body;
            await library.destroy({
                where: {
                    id: libraryId,
                },
            });
            res.status(201).send({
                message: 'Library was deleted successfully!',
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
};
