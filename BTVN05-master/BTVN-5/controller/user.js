const path = require('path');
const fs = require('fs');
const {ObjectId} = require('mongodb')

const deleteUser = async (req, res, next) => {
    try {
        // const pamars = req.params;
        // const deletingUserId = parseInt(pamars.id);
        // const userDataPath = path.resolve('./Data-base');
        // let userDataFile = fs.readFileSync(userDataPath + '/users.json', 'utf8');
        // userDataFile = JSON.parse(userDataFile);
        // const userIndex = userDataFile.findIndex((item, index) => {
        //     return (item.id === deletingUserId);
        // })
        // if (userIndex === -1) {
        //     return res.status(400).json({
        //         message : 'Not found user'
        //     });
        // } else {
        //     userDataFile.splice(userIndex, 1);
        //     fs.writeFileSync(userDataPath + '/users.json', JSON.stringify(userDataFile, null, 2));
        // }
        // return res.status(200).json({
        //     message : 'delete user ' + deletingUserId +  ' successful'
        // });
        const deletingUserId = req.params.id;
        const collection = req.db.collection('user');
        const db=req.db;

        const result = await req.db.collection('users').findOne({
            _id: ObjectId(deletingUserId)},
            (err, data) => {
                if(err) {
                    return next(err);
                }
                collection.remove({
                    _id: ObjectId(deletingUserId)
                }, (err, result)=>{
                    if(err) {
                        return next(new Error('not-delete'));
                    }
                    return res.status(200).json({
                        message: 'delete user successful',
                        data: result
                    });
                });
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e
        });
    }
};


    // connect db
const addUser = async (req, res, next) => {
    try {
        // const body = req.body;
        // // const query =req.query;
        // const username = body.username;
        // const age = body.age;
        // const address = body.address;
        // const newUser = {
        //     username : username,
        //     age : age,
        //     address : address
        // connect db
        const newUser = req.body;
        const db = req.db;
        const collection = req.db.collection('user');
        
        const result = await req.db.collection('users').insertOne(newUser);
        return res.json({
            message: "Create new user succesfully",
            data: result.ops[1]
        });
        // db.collection('users').insertOne(newUser, function(err, data) {
        //     if (err) {
        //         return next(err);
        //     }
        //     console.log(data);
        //                 // return res.status(400).json({
        //     //     message : 'Error! An error occurred. Please try again later',
        //     //     error : 
        //     return res.status(201).json(data);

        // });

        // const userDataPath = path.resolve('./Data-base')
        // let dataFile = fs.readFileSync(userDataPath + '/users.json', 'utf8');
        // if (!dataFile) {
        //     dataFile = [];
        // } else {
        //     dataFile = JSON.parse(dataFile);
        //     if (!Array.isArray(dataFile)) {  
        //         return res.status(400).json({
        //             message : 'Database error'
        //         });
        //     }
        // }
        // newUser.id = dataFile.length + 1;
        // dataFile.push(newUser);
        // fs.writeFileSync(userDataPath + '/users.json', JSON.stringify(dataFile));
        // return res.status(200).json({
        //     message : 'create new user ' + newUser.id + ' succesful'
        // });

    } catch (e) { 
        console.error(e);
        return res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            error : e
        });
    }
};

const getListUser = async (req, res, next) => {
    try {
        // const userDataPath = path.resolve('./Data-base');
        // let userDataFile = fs.readFileSync(userDataPath + '/users.json', 'utf8');
        // console.log(req.db); //console.log db
        // if (!userDataFile) {
        //     return res.status(400).json({
        //         message : 'No data'
        //     });
        // } else {
        //     userDataFile = JSON.parse(userDataFile);
        //     if (!Array.isArray(userDataFile)) {
        //         return res.status(400).json({
        //             message : 'Database error'
        //         });
        //     }
        // }
        // res.status(200).json(userDataFile);
        const users = await req.db.collection('users').find().toArray();
            return res.status(200).json({
                message: 'List users',
                data: users
            });
    } catch (e) {
        console.error(e);
        return res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e
        });
    }
};

const getUser = async (req, res, next) => {
        // const params = req.params;
        // const getUserId = parseInt(params.id);
        // const userDataPath = path.resolve('./Data-base');
        // let userDataFile = fs.readFileSync(userDataPath + '/users.json', 'utf8');
        
        // if (!userDataFile) {
        //     return res.status(400).json({
        //         message : 'No data'
        //     });
        // } else {
        //     userDataFile = JSON.parse(userDataFile);
        //     if (!Array.isArray(userDataFile)) {
        //         return res.status(400).json({
        //             message : 'Database error'
        //         });
        //     }
        // }
        // const getUser = userDataFile.find(item => item.id === getUserId);
        // if (getUser === undefined) {
        //     return res.status(400).json({
        //         message : 'Not found user' 
        //     });
        // } else {
        //     return res.status(200).json(getUser);
        // }
        try {
            const userId = req.params.id;
            const user = await req.db.collection('users').findOne({
                _id: ObjectId(userId)
            });
        
            if (!user) {
                return next(new Error('USER_NOT_FOUND'));
            }
        
            return res.json({
                message: 'List users',
                data: user
            });
    } catch (e) {
        console.error   (e);
        return res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e
        });
    }
};

const updateUser =  async (req, res, next) => {
    try {
        // const params = req.params;
        // const updatingId = parseInt(params.id);
        // const body = req.body;
        // const userDataPath = path.resolve('./Data-base');
        // let userDataFile = fs.readFileSync(userDataPath + '/users.json', 'utf8');
        
        // if (!userDataFile) {
        //     return res.status(400).json({
        //     message : 'No data'
        // });
        
        // } else {
        //     userDataFile = JSON.parse(userDataFile);
        //     if (!Array.isArray(userDataFile)) {
        //         return res.status(400).json({
        //             message : 'Database error'
        //         });
        //     }
        // }
        // const userIndex = userDataFile.findIndex((item, index) => {
        //     if (item.id === updatingId) {
        //         return true;
        //     }
        // })
        // if (userIndex === -1 ) {
        //     return res.status(400).json({
        //         message : 'Not found user'
        //     });
        // } else {
        //     if (body.username) {
		// 		userDataFile[userIndex].username = body.username; 
		// 	}
		// 	if (body.age) {
		// 		userDataFile[userIndex].age = body.age;
        //     }
        //     if (body.address) {
        //         userDataFile[userIndex].address = body.address;
        //     }
        //     fs.writeFileSync(userDataPath + '/users.json', JSON.stringify(userDataFile, null, 2));
        // }
        // return res.status(200).json({
        //     message : 'update user ' + updatingId +  ' succesful'
        // });
        const userId = req.params.id;
        const newValues = {$set: req.body};
        
        const update = await req.db.collection('users').findOne({
            _id: ObjectId(userId)
        }, (err,data) => {
            if(err) {
                return next(err);
            };
        });
       update.updateOne({
            _id: ObjectId(userId)
        }, (err, data) => {
            if(err) {
                return next(err);
            }
            return res.status(200).json({
                message:"update ok",
                data: result
            });
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e.stack
        });
    }
};

module.exports = {
    deleteUser,
    addUser,
    getListUser,
    getUser,
    updateUser
};