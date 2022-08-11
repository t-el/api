import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


mongoose.connect(process.env.URI, {useNewUrlParser: true,useUnifiedTopology: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

export default conn
