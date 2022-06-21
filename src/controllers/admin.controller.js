const { users, courses, library } = require('../models');
const bcrypt = require('bcryptjs');
const { signUser } = require('../utils/jwt');

module.exports = {
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.body;
            await users.destroy({
                where: {
                    id: userId,
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
    createBook: async (req, res) => {
        try {
            const { name, image, description, price } = req.body;
            await books.create({ name, image, description, author });
            res.status(201).send({
                message: 'Book was created successfully!',
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    updateBook: async (req, res) => {
        try {
            const { name, image, description, price, bookId } = req.body;
            res.status(200).json(
                await lessons.update(
                    {
                        name,
                        image,
                        description,
                        price,
                    },
                    {
                        where: {
                            id: bookId,
                        },
                    }
                ),
                { message: 'Book was updated successfully!' }
            );
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
    deleteBook: async (req, res) => {
        try {
            const { bookId } = req.body;
            await books.destroy({
                where: {
                    id: bookId,
                },
            });
            res.status(201).send({
                message: 'Book was deleted successfully!',
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    },
};
