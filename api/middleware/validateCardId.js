const db = require('../data/dbConfig');

const validateCarId = (req,res, next) =>{
    const {id} = req.params;

    if(id){
        db('cars')
        .select('*')
        .where({id: req.params.id})
        .then(count =>{
            if(count.length > 0){
                
                next();
            }else{
                res.status(404).json({error: "Cannot find an entry matching the ID provided."});
            }
        }).catch(error =>{
            res.status(500).json({error: "Not sure what happened while checking the ID :("});
        });

    }else{
        res.status(400).json({error: "It appears we cannot find an ID!"});
    }

};

module.exports = validateCarId;