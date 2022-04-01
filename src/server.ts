import "express-async-errors";
import express, {json} from "express";
import cors from "cors";
import routes from "./routes";
import {defaultErrorHandler, httpErrorHandler} from "./middleware/error.handler";
import fileUpload from "express-fileupload";

const PORT = process.env.PORT || 8090;
const app = express();

app.use(cors());
app.use(json());
app.use(fileUpload());

app.use('/api', routes);

app.use(httpErrorHandler);

app.listen(PORT, () => console.log(`Application listening on port ${PORT}.`));