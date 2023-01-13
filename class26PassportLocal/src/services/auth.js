// import passport from "passport";
// import { UserModel } from "../models/userModel";
// import { Strategy as PassportStrategy } from "passport-strategy";

// interface IStrategyOptionsWithRequest {
//     usernameField?: string | undefined;
//     passwordField?: string | undefined;
//     session?: boolean | undefined;
//     passReqToCallback: true;
// }

// interface IVerifyOptions {
//     message: string;
// }

// interface VerifyFunctionWithRequest {
//     (
//         req: Request,
//         username: string,
//         password: string,
//         done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void,
//     ): void;
// }

// class Strategy extends PassportStrategy {
//     constructor(options: IStrategyOptionsWithRequest, verify: VerifyFunctionWithRequest){super()};
//     name: string;
// }

// const StrategyOptions: IStrategyOptionsWithRequest = {
//     usernameField: "email",
//     passwordField: "password",
//     passReqToCallback: true
// }

// const login: VerifyFunctionWithRequest = async(req, username, password, done) =>{
//     const user = await UserModel.findOne({username, password})

//     if(!user){
//         return done(null, false, {message: "Las credenciales no son correctas."})
//     }else{
//         return done(null, user)
//     }
// }

// const signup: VerifyFunctionWithRequest = async(req, username, password, done) => {
//     try {
//         const newUser = await UserModel.create({username, password})
//         return done(null, newUser)
//     } catch (err) {
//         console.log("Se rompio todo en el signup de passport-local");
//         console.log(err);
//         return done(null, false, {message: "Error al crear usuario"})
//     }
// }

// export const loginFunc = new Strategy(StrategyOptions, login)
// export const signUpFunc = new Strategy(StrategyOptions, signup)

// passport.serializeUser((user: any, done) =>  {
//     done(null, user._id)
// })

// passport.deserializeUser(async(userId, done) => {
//     await UserModel.findById(userId).then((user)=>{return done(null, user)})
// })

const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const {UserModel} = require("../models/userModel")

const StrategyOptions = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}

const login = async(req, email, password, done) =>{
    const user = await UserModel.findOne({email, password})
    done(null, user)
    // if(user == undefined){
    //     return done(null, false, {message: "Las credenciales no son correctas."})
    // }else{
    //     return done(null, user)
    // }
}

const signup = async(req, email, password, done) => {
    try {
        const newUser = await UserModel.create({email, password})
        return done(null, newUser)
    } catch (err) {
        console.log("Se rompio todo en el signup de passport-local");
        console.log(err);
        return done(null, false, {message: "Error al crear usuario"})
    }
}

const loginFunc = new LocalStrategy(StrategyOptions, login)
const signUpFunc = new LocalStrategy(StrategyOptions, signup)

passport.serializeUser((user, done) =>  {
    done(null, user._id)
})

passport.deserializeUser(async(userId, done) => {
    const usr = await UserModel.findById(userId)
    return done(null, usr)
})

module.exports = {
    loginFunc, signUpFunc
}