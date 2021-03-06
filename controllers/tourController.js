const Tour = require('./../models/tourModel')

/*
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
*/
exports.getAllTours = async (req, res) => {
  try{
        //BUILD QUERY
        const queryObj = {...req.query};
        const excludedFields = ['page','sort', 'limit','fields'];

        excludedFields.forEach(el => delete queryObj[el])    
        const query = await Tour.find(queryObj)


       console.log(req.query, queryObj)
       // EXECUTE THE QUERY     
       const tours = await query
   
   
        res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
             tours
      
      }
      })
  }catch(err){
      res.status(404).json({
          status: 'fail',
          message: err
      })
  }
  
  }


exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
   //const tour = await Tour.find({_id : req.params.id})
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
  }catch(err){
      res.status(400).json({
          status: 'fail',
          message: 'not found'
      })
  }
  

  
};

exports.createTour = async (req, res) => {
    try 
    {
        const newTour = await Tour.create(req.body)
        
        res.status(201).json({
        status: 'success',
        data: newTour
        
    })
    }catch (err)
    {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
   
} 
exports.updateTour = async (req, res) => {
 try{
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        status: 'success',
        data: {
                tour
        }
    })}catch(err){
     res.status(400).json({
        status: 'fail',
        message: 'failed'
     })
 
 
};
}
exports.deleteTour = async (req, res) => {
  
    try{
        await Tour.findByIdAndDelete(req.params.id)
        
        res.status(204).json({
        status: 'success',
        data: null
      });  
  } catch(err) {
    res.status(400).json({
        status: 'fail'
    
    })
  }

    
};