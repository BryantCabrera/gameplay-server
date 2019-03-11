import mongoose from 'mongoose';
import User from '../models/user';
import Game from '../models/game';
import bcrypt from 'bcryptjs';

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
            console.log('getUsers route');
            try {
                const users = await User.find();
        
                return users;
            } catch (err) {
                return err
            }
        },
        getLoggedUser: async (parent, args, context) => {
            try {
                const LoggedUser = await context.req.user;
                return LoggedUser;
            } catch (err) {
                console.log(err, ' this is getLoggedUser error.');
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
            //hashed password
            args.input.password = bcrypt.hashSync(args.input.password, bcrypt.genSaltSync(10));

            console.log(args, ' this is args from resolvers.js > mutation > createUser');

            try {
                const newUser = await User.create(args.input);
                
                console.log(newUser, ' This is the new user.')

                return newUser
            } catch(err) {
                return err
            }
        },
        loginUser: async (parent, args, context) => {
            console.log('hitting loginUser');
            console.log(context.req.session, 'context.req.session for loginUser');
            try {
                const loggedUser = await User.findOne({email: args.input.email});
                console.log(loggedUser, ' loggedUser');

                if (loggedUser) {
                    //if passwords match, send user info to front-end, else, return error message
                    if (bcrypt.compareSync(args.input.password, loggedUser.password)) {
                        context.req.session.user = loggedUser; 
                        context.req.session.logged = true;
                        context.req.session.message = '';
                        console.log(context.req.session.user, ' this is context.req.session from loginUser');
                        return context.req.session.user
                    } else {
                        return 'Your password does not match.'
                    }
                } else {
                    return 'Your username does not exist.'
                }
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