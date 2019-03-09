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
            // const password = args.input.password;
            // const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            args.input.password = bcrypt.hashSync(args.input.password, bcrypt.genSaltSync(10));

            // console.log(bcrypt.hashSync(args.input.password, bcrypt.genSaltSync(10)), ' this is args from resolvers.js > mutation > createUser');
            console.log(args, ' this is args from resolvers.js > mutation > createUser');

            try {
                const newUser = await User.create(args.input);
                
                console.log(newUser, ' This is the new user.')

                return newUser
            } catch(err) {
                return err
            }
        },
        loginUser: async (parent, args) => {
            try {
                const loggedUser = await User.findOne({email: args.input.email});

                if (loggedUser) {
                    //if passwords match, send user info to front-end, else, return error message
                    if (bcrypt.compareSync(args.input.password, loggedUser.password)) {
                        req.session.user = loggedUser; 
                        req.session.logged = true;
                        req.session.message = '';

                        return req.session
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