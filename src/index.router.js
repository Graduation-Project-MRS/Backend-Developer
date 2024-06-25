import authRouter from "./modules/auth/auth.router.js";
import mealsRouter from "./modules/meals/meals.router.js";
import familyRouter from "./modules/familly/familly.router.js";
import postRouter from "./modules/post/post.router.js";
import messageRouter from "./modules/message/message.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import passport from "passport";
import pass from"../config/passport.stupp.js";
import session from "express-session";
import cors from "cors";


import categoryRoute from './modules/category/categoryRoute.js';
import ingredientRoute from './modules/ingredient/ingredientRoute.js';
import tipRoutes from "./modules/tip/tipRoutes.js";

const initApp = (app, express) => {
  app.use(cors());
  //convert Buffer Data
  app.use(express.json());
  app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  //Setup API Routing
  app.use(`/auth`, authRouter);
  app.use(`/meals`, mealsRouter);
  app.use(`/family`, familyRouter);
   app.use(`/Categories`, categoryRoute);
  app.use(`/Ingredients`, ingredientRoute);
  app.use(`/Tips`, tipRoutes);
  app.use("/post", postRouter);
  app.use("/message", messageRouter);

  app.all("*", (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method");
  });
  app.use(globalErrorHandling);
};

export default initApp;
