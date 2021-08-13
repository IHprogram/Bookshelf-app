import dotenv from 'dotenv';
const config = dotenv.config().parsed;
const mongoURI = config.REACT_APP_MONGO_URI;

export default mongoURI;