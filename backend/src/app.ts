import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "./common/src";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { foldersRouter } from "./routes/folders";
import { getFile } from "./routes/getfile";
import { createFile } from "./routes/files";
import { getFirstFile } from "./routes/getFirstFile";
import { editFile } from "./routes/editFileName";
import { deleteFile } from "./routes/deleteFile";
import { createFolder } from "./routes/createFolder";
import { languagesRouter } from "./routes/languages";
const cors = require("cors");
const app = express();
// app.set('trust proxy', true);
app.use(json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(
  cookieSession({
    signed: false,
    secure: false,
    httpOnly: false,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(foldersRouter);
app.use(createFile);
app.use(getFirstFile);
app.use(editFile);
app.use(deleteFile);
app.use(createFolder);
app.use(languagesRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
