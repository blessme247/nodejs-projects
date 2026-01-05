import env from "dotenv"
env.config()
import express from "express";
import fs from "fs";
import path from "path"
import { fileURLToPath } from 'url';
import { dirname as pathDirname } from 'path';
import logEvents from "./middleware/logEvents.js";
import cors from "cors"
import errorHandler from "./middleware/errorHandler.js";
import indexRouter from "./routes/root.js"
import subdirRouter from "./routes/subdir.js"
import employeesRouter from "./routes/api/employees.js"
import usersRouter from "./routes/api/users.js"
import corsOptions from "./config/corsOptions.js";
import authRouter from "./routes/api/auth.js"
import registerRouter from "./routes/api/register.js"
import verifyJwt from "./middleware/verifyJwt.js"
import refreshRouter from "./routes/api/refresh.js"
import logoutRouter from "./routes/api/logout.js"
import uploadRouter from "./routes/api/upload.js"
import assetsRouter from "./routes/api/assets.js"
import cookieParser from "cookie-parser"
import credentials from "./middleware/credentials.js";
import mongoose from "mongoose"
import connectDB from "./config/dbConfig.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = pathDirname(__filename);
const app = express()
const port = process.env.PORT || 3500;
const {logger} = logEvents

connectDB()

app.use(logger)

// Handle options credentials check - before CORS!
app.use(credentials)

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
app.use(express.urlencoded({extended: false}))

// middleware for json
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

app.use(express.static(path.join(__dirname, "/public")))
app.use('/subdir', express.static(path.join(__dirname, "/public")))

app.use('/', indexRouter)
app.use('/subdir', subdirRouter);
app.use("/auth", authRouter);
app.use("/register", registerRouter);
app.use("/refresh", refreshRouter)
app.use("/logout", logoutRouter)

app.use(verifyJwt)
app.use("/employees", employeesRouter);
app.use("/users", usersRouter);
app.use("/upload", uploadRouter)
app.use("/assets", assetsRouter)

// chaining route handlers
// const one = (req, res, next) => {
//     console.log('one');
//     next();
// }

// const two = (req, res, next) => {
//     console.log('two');
//     next();
// }

// const three = (req, res) => {
//     console.log('three');
//     res.send('Finished!');
// }

// app.get(['/', '/chain.html', '/chain'], [one, two, three]);

// 404 catch-all route 
app.use((req, res) => {
  res.status(404)
    if(req.accepts("html")){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts("json")){
        res.json({"error": "404 Not found"})
    }else {
        res.type('txt').send( "404 Not found")
    }
});

// app.all('*', (req, res)=> {
//     res.status(404)
//     if(req.accepts("html")){
//         res.sendFile(path.join(__dirname, 'views', '404.html'))
//     }else if(req.accepts("json")){
//         res.json({"error": "404 Not found"})
//     }else {
//         res.type('txt').send( "404 Not found")
//     }
// })

app.use(errorHandler)

mongoose.connection.once('open', ()=> {
    console.log('Connected to database:', mongoose.connection.db.databaseName);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
})
