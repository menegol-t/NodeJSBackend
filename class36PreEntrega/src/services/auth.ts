import {IStrategyOptionsWithRequest, Strategy as LocalStrategy} from "passport-local";    
import {Request} from "express"
import {UserModel} from "../models/userModel";
import passport from "passport";
import { logger } from "../config/logger";
    
const StrategyOptionsWithRequest: IStrategyOptionsWithRequest = { usernameField: "username", passwordField: "password", passReqToCallback: true};

function validateEmail(mail: string) {
    const isRealEmail = /\S+@\S+\.\S+/;
    return isRealEmail.test(mail);
}

const logIn = async (req: Express.Request, username: string, password: string, done: (error: any, user?: any, info?: any) => void) => {
    try {
        const user = await UserModel.findOne({ email: username });

        if (!user) {
            return done(null, false, { message: "Credenciales invalidas." });
        }
        
        const isValid = await user.isValidPassword(password);

        if(!isValid) {
            return done(null, false, { message: "Credenciales invalidas." });
        }else{
            return done(null, user, { message: "Login correcto." });
        }
    
    } catch (err) {
        logger.error(`Error al crear usuario L26 SRC/SERVICES/AUTH `, err)
        return done(err);
    }
};
    
//aca el tipo de req es Express.Request 
const signup = async (req: Request, username: string, password: string, done: (error: any, user?: any, info?: any) => void) => {

    const {name, location, age, phone, profileThumbnail} = req.body

    const signUpData = [username, password, name, location, age, phone, profileThumbnail]

    const missingSomeInfo = signUpData.some(item => item == undefined || item == '' || item == null || item == false)

    if (missingSomeInfo) {
        return done(null, false, { message: "Completa todos los datos." });
    }else if(isNaN(age) || isNaN(phone)){
        return done(null, false, { message: "Asegurate de que el telefono y la edad sean numeros." })
    }else if(!validateEmail(username)){
        return done(null, false, { message: "Por favor ingresa un email real." })
    }
    
    try {
        const email = username;
        const userData = { email, password, name, location, age, phone, profileThumbnail};
        const newUser = await UserModel.create(userData);
        return done(null, newUser);
    } catch (err: any) {
        if (err.code == "11000") {
            return done(null, false, { message: "Ese email ya esta en uso." });
        }else{
            logger.error(`Error al crear usuario L52 SRC/SERVICES/AUTH`, err)
            return done(null, false, { message: "Error al crear usuario." });
        }
    }
};
    
const loginFunc = new LocalStrategy(StrategyOptionsWithRequest, logIn);
const signUpFunc = new LocalStrategy(StrategyOptionsWithRequest, signup);
    
passport.serializeUser((user: any, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (err) {
        logger.error(`Error al deserializar user id  L68 SRC/SERVICES/AUTH`, err)
        done(err);
    }
});
    
export { loginFunc, signUpFunc };