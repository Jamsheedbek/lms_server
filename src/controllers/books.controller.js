const { books } = require('../models');

module.exports = {
    getAllBooks: async (req, res) => {
        try {
            const { bookId } = req.body;
            if (!bookId) {
                res.status(200).json(await books.findAll());
            } else {
                res.status(200).json(
                    await books.findOne({
                        where: {
                            id: bookId,
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
};
