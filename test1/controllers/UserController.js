import User from '../models/User.js';

export default class UserController {
    constructor(logger) {
        this.logger = logger;
        this.userModel = new User(logger);
    }

    async getUsers(request, reply) {
        try {
            this.logger.info('GET /users request received');
            const users = this.userModel.getAllUsers();
            reply.send(users);
        } catch (error) {
            this.logger.error(`GET /users failed: ${error.message}`);
            reply.status(500).send({ error: 'Failed to fetch users' });
        }
    }

    async addUser(request, reply) {
        try {
            this.logger.info('POST /users request received');
            const { name } = request.body;

            if (!name) {
                this.logger.warn('POST /users: Name is required');
                return reply.status(400).send({ error: 'Name is required' });
            }

            const user = this.userModel.addUser(name);
            this.logger.info(`User created: ${user.name} (ID: ${user.id})`);
            reply.send({ message: 'User added successfully', user });
        } catch (error) {
            this.logger.error(`POST /users failed: ${error.message}`);
            reply.status(500).send({ error: 'Failed to add user' });
        }
    }
}
