const express = require('express');
const validateCarID = require('../middleware/validateCarId');
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) =>{
    db('cars')
    .select('*').then(cars =>{
        res.status(200).json(cars);
    }).catch(error =>{
        res.status(500).json({error: "It appears we had an issue getting the data from the DB."});
    });
});

router.get('/:id', validateCarID, (req,res) =>{
    db('cars')
    .select('*')
    .where({id: req.param.id})
    .first().then(car =>{
        res.status(200).json(car);
    }).catch(error =>{
        res.status(500).json({error: "Unfortunately it appears something went wrong while fetching the car by id."});
    });
});

router.post('/', (req,res) =>{
    const post = req.body;
    const {make, model, vin, mileage} = post;

    if(!make || !model || !vin || !mileage){
        res.status(400).json({error: "Remember to include the required fields (make, model, vin, mileage"});
    }else{
        db('cars')
        .insert(post, 'id')
        .then(id =>{
            res.status(201).json(id);
        }).catch(error =>{
            res.status(500).json({error: "Something went wrong while adding the entry!"});
        });
    }
});

router.put('/:id', validateCarID, (req,res) =>{
    const post = req.body;

    db('cars')
    .where({id: req.params.id})
    .update(post, 'id')
    .then(count =>{
        res.status(200).json(count);
    }).catch(error =>{
        res.status(500).json({error: "Something went wrong while updating the entry."});
    });
});

router.delete('/:id', validateCarID, (req,res) =>{
    db('cars')
    .where({id: req.params.id})
    .delete()
    .then(count =>{
        res.status(200).json({message: "Success"});
    }).catch(error =>{
        res.status(500).json({error: "Something went wrong while deleting entry from the DB."})
    });
});

module.exports = router;