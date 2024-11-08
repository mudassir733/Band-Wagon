
import connect from '../../../utils/db/connect.js';
import User from '../../(domain)/entities/user.model';
import bcrypt from 'bcrypt';



export const authenticateUser = async (email, password) => {
    await connect();
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid email or password');
    }

    return user;
};