import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import config from './app/config';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// express-session middleware
app.use(
  session({
    secret: config.session_secret_key as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.NODE_ENV === 'production' },
  }),
);

app.use('/api', router);

const getAController = (req: Request, res: Response) => {
  res.send('App is running');
};

app.get('/', getAController);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
