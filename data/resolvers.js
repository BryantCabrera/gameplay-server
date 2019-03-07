import mongoose from 'mongoose';
import User from '../models/user';
import Game from '../models/game';

export const resolvers = {
    Query: {
        getOneUser: async (root, {id}) => {
            try {
                const foundUser = await User.findById(id);
        
                return foundUser;
            } catch(err) {
                console.log(err, ' this is foundUser error.');
                return err
            }
        },
        getUsers: async () => {
            try {
                const users = await User.find();
        
                return users;
            } catch (err) {
                return err
            }
        },
        getOneGame: async (root, {id}) => {
            try {
                const foundGame = await Game.findById(id);
        
                return foundGame;
            } catch(err) {
                console.log(err, ' this is foundGame error.');
                return err
            }
        },
        getGames: async () => {
            try {
                const games = await Game.find();
        
                return games;
            } catch (err) {
                return err
            }
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            console.log(args, ' this is args from resolvers.js > mutation');

            try {
                const newUser = await User.create(args.input);
                
                console.log(newUser, ' This is the new user.')

                return newUser
            } catch(err) {
                return err
            }
        },
        updateUser: async (root, {input}) => {
            try {
                const updatedUser = await  User.findOneAndReplace(input._id, input,{new: true});

                console.log(updatedUser, ' updateUser input');
        
                return updatedUser
            } catch(err) {
                return err
            }
        },
        deleteUser: async (id) => {
            try {
                await User.findOneAndDelete(id);
        
                return 'User has been deleted.'
            } catch(err){
                return err
            }
        },
        createGame: async (parent, args) => {
            console.log(args, ' this is args from resolvers.js > mutation');

            try {
                const newGame = await Game.create(args.input);
                
                console.log(newGame, ' This is the new game.')

                return newGame
            } catch(err) {
                return err
            }
        },
        updateGame: async (root, {input}) => {
            try {
                const updatedGame = await  Game.findOneAndReplace(input._id, input,{new: true});
        
                return updatedGame
            } catch(err) {
                return err
            }
        },
        deleteGame: async (id) => {
            try {
                await Game.findOneAndDelete(id);
        
                return 'Game has been deleted.'
            } catch(err){
                return err
            }
        }
    }
}