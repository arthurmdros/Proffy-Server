import express from 'express';

const routes = express.Router();

routes.get('/', (req,res) => {
    const users = [
        { name: 'Jiraya', age: 56 },
        { name: 'Tsunade', age: 61 },
        { name: 'Orochimaru', age: 53 },
    ];

    return res.json(users);
});

export default routes;