import mongoose from 'mongoose';
import User from '../models/user';
import Game from '../models/game';

export const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.find();
        
                return users;
    
            } catch(err) {
                return err
            }
        }
    }
}