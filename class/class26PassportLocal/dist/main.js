(()=>{var e={957:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getAllMsgs=t.saveMsg=void 0;const i=n(718),r=n(202),u=new r.schema.Entity("author",{},{idAttribute:"email"}),s=[new r.schema.Entity("messages",{author:u},{idAttribute:"_id"})];t.saveMsg=e=>o(void 0,void 0,void 0,(function*(){try{return yield i.ChatMsgModel.create(e)}catch(e){console.log("Error saving Message to mongo"),console.log(e)}})),t.getAllMsgs=()=>o(void 0,void 0,void 0,(function*(){try{const e=yield i.ChatMsgModel.find().lean();return(0,r.normalize)(e,s)}catch(e){console.log("Error retrieving chats from Mongo"),console.log(e)}}))},399:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const i=n(935);i.faker.locale="en",t.default=()=>o(void 0,void 0,void 0,(function*(){const e=[];for(let t=0;t<5;t++)e.push({id:t+1,title:i.faker.commerce.product(),price:i.faker.finance.amount(1e3,5e3,2,"$"),thumbnail:i.faker.image.imageUrl(70,70,"cat",!0)});return yield e}))},607:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n(81);const r=i(n(669)),u=n(611);o(void 0,void 0,void 0,(function*(){yield(0,u.innitMongo)();const e=process.env.PORT||8080;r.default.listen(e,(()=>console.log(`Listening ${e}`)))}))},775:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkLogIn=void 0,t.checkLogIn=(e,t,n)=>{if(!e.isAuthenticated())return t.redirect("/api/login");n()}},718:function(e,t,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ChatMsgModel=void 0;const i=o(n(185)),r=new i.default.Schema({author:{email:{type:String},name:{type:String},surname:{type:String},age:{type:Number},alias:{type:String},avatar:{type:String}},text:{type:String,required:!0}},{timestamps:!0,versionKey:!1});t.ChatMsgModel=i.default.model("chatMsg",r)},684:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.UserModel=void 0;const r=i(n(185)),u=i(n(96)),s=new r.default.Schema({email:{type:String,required:!0,unique:!0},password:{type:String,required:!0}},{timestamps:!0,versionKey:!1});s.pre("save",(function(e){return o(this,void 0,void 0,(function*(){const t=yield u.default.hash(this.password,10);this.password=t,e()}))})),s.methods.isValidPassword=function(e){return o(this,void 0,void 0,(function*(){return yield u.default.compare(e,this.password)}))},t.UserModel=r.default.model("user",s)},651:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const i=n(860),r=n(775),u=(0,i.Router)();u.get("/",r.checkLogIn,((e,t)=>o(void 0,void 0,void 0,(function*(){t.render("chatIndex",{msg:`Bienvenido ${e.user.email}`})})))),t.default=u},459:function(e,t,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(860),r=o(n(960)),u=o(n(498)),s=o(n(11)),a=o(n(940)),c=o(n(651)),l=(0,i.Router)();l.use("/products-test",r.default),l.use("/signup",u.default),l.use("/login",s.default),l.use("/logout",a.default),l.use("/chat",c.default),t.default=l},11:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(860),u=i(n(511)),s=(0,r.Router)();s.get("/",((e,t)=>o(void 0,void 0,void 0,(function*(){t.render("login")})))),s.post("/",u.default.authenticate("login",{failureRedirect:"/api/login"}),((e,t)=>o(void 0,void 0,void 0,(function*(){t.redirect("/api/chat")})))),t.default=s},940:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const i=n(860),r=n(775),u=(0,i.Router)();u.get("/",r.checkLogIn,((e,t)=>o(void 0,void 0,void 0,(function*(){const{email:n}=e.user;e.logout((e=>{e?(console.log("Error login out"),console.log(e)):t.render("logout",{goodbyeMsg:`Nos vemos ${n}`})}))})))),t.default=u},960:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(860),u=i(n(399)),s=(0,r.Router)();s.get("/",((e,t)=>o(void 0,void 0,void 0,(function*(){t.render("prodIndex",{allData:yield(0,u.default)()})})))),t.default=s},498:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(860),u=i(n(511)),s=(0,r.Router)(),a={failureMessage:"Hubo un problema con tu email o password."};s.get("/",((e,t)=>o(void 0,void 0,void 0,(function*(){t.render("signup")})))),s.post("/",((e,t,n)=>{u.default.authenticate("signup",a,((e,o,i)=>e?n(e):o?void t.redirect("/"):t.render("signup",{error:i.message})))(e,t,n)})),t.default=s},287:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.signUpFunc=t.loginFunc=void 0;const r=n(55),u=n(684),s=i(n(511)),a={usernameField:"username",passwordField:"password",passReqToCallback:!0},c=new r.Strategy(a,((e,t,n,i)=>o(void 0,void 0,void 0,(function*(){try{const e=yield u.UserModel.findOne({email:t});return e?(yield e.isValidPassword(n))?i(null,e,{message:"Login correcto"}):i(null,!1,{message:"Contraseña incorrecta"}):i(null,!1,{message:"Usuario no encontrado"})}catch(e){return i(e)}}))));t.loginFunc=c;const l=new r.Strategy(a,((e,t,n,i)=>o(void 0,void 0,void 0,(function*(){if(!t||!n)return i(null,!1,{message:"Completa los datos"});try{const e={email:t,password:n},o=yield u.UserModel.create(e);return i(null,o)}catch(e){return"11000"==e.code?i(null,!1,{message:"Ese usuario ya esta en uso."}):i(null,!1,{message:"Error al crear usuario"})}}))));t.signUpFunc=l,s.default.serializeUser(((e,t)=>t(null,e._id))),s.default.deserializeUser(((e,t)=>o(void 0,void 0,void 0,(function*(){try{const n=yield u.UserModel.findById(e);t(null,n)}catch(e){t(e)}}))))},611:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.innitMongo=void 0;const r=i(n(185)),u=process.env.MONGO_ATLAS_SRV||"mongodb://localhost:27017/miDatabase";t.innitMongo=()=>o(void 0,void 0,void 0,(function*(){try{console.log("Conecting to mongo"),yield r.default.connect(u),console.log("Connected")}catch(e){return console.log("Error"),console.log(e),e}}))},669:function(e,t,n){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var i=Object.getOwnPropertyDescriptor(t,n);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,i)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return i(t,e),t},u=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function u(e){try{a(o.next(e))}catch(e){r(e)}}function s(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((o=o.apply(e,t||[])).next())}))},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(n(860)),c=s(n(17)),l=s(n(459)),d=s(n(328)),f=r(n(837)),h=s(n(508)),v=s(n(685));n(81);const p=n(775),g=s(n(511)),_=n(287),y=(0,a.default)(),m=c.default.resolve(__dirname,"../../views"),w=new v.default.Server(y);y.use(a.default.static("public")),y.use(a.default.json()),y.use(a.default.urlencoded({extended:!0})),y.use((0,h.default)({secret:"shhhhhhhhhhh",resave:!0,saveUninitialized:!1,rolling:!0,cookie:{maxAge:6e5}})),y.use(g.default.initialize()),y.use(g.default.session()),g.default.use("login",_.loginFunc),g.default.use("signup",_.signUpFunc),y.set("views",m),y.set("view engine","pug"),y.get("/",p.checkLogIn,((e,t)=>u(void 0,void 0,void 0,(function*(){t.redirect("/api/chat")})))),(0,d.default)(w),y.use("/api",l.default),y.use(((e,t,n,o)=>n.status(500).json({msg:"Unexpected error",error:f.inspect(e,!0,7,!0)}))),t.default=w},328:(e,t,n)=>{const{saveMsg:o,getAllMsgs:i}=n(957),r=n(952);let u;e.exports=e=>{u=r(e),u.on("connection",(async e=>{console.log("New WS connection"),e.emit("fetchMsgsFromDB",await i()),e.on("postMsgToDB",(async e=>{u.emit("newMsgInDB",await o(e))}))}))}},935:e=>{"use strict";e.exports=require("@faker-js/faker")},96:e=>{"use strict";e.exports=require("bcrypt")},81:e=>{"use strict";e.exports=require("dotenv/config")},860:e=>{"use strict";e.exports=require("express")},508:e=>{"use strict";e.exports=require("express-session")},185:e=>{"use strict";e.exports=require("mongoose")},202:e=>{"use strict";e.exports=require("normalizr")},511:e=>{"use strict";e.exports=require("passport")},55:e=>{"use strict";e.exports=require("passport-local")},952:e=>{"use strict";e.exports=require("socket.io")},685:e=>{"use strict";e.exports=require("http")},17:e=>{"use strict";e.exports=require("path")},837:e=>{"use strict";e.exports=require("util")}},t={};!function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,n),r.exports}(607)})();