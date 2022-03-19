const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Tour = require('./../../models/tourModel');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(() =>{ console.log('DB connection successful')
    })
    //read js file
    const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'))

    const importData = async () =>
    {
        try {
            await Tour.create(tours);
            console.log('Data susccessfully loaded!')
            process.exit();
        } catch(err){
            console.log(err)
        }
    }    
    const port = process.env.PORT || 3000;

//delete all data from collection 
const deleteData = async() =>
{
    try {
        await Tour.deleteMany();
        console.log('Data susccessfully deleted!')
        process.exit();
    } catch(err){
        console.log(err)
    }
}

if(process.argv[2] === '--import') {
    importData()
} else if(process.argv[2] == '--delete') {
    deleteData()
}

console.log(process.argv);