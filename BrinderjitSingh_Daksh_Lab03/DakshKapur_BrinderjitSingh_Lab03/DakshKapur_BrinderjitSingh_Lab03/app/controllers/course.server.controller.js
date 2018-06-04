const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const jwt = require('jsonwebtoken');
var config = require('../../config/config'); 
const User = require('mongoose').model('Student');
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
 
    
    var userid = getUserIdFromToken(req.headers);
    console.log(userid);
    
    const course = new Course(req.body);
    User.findOne({_id : userid},(err, user) => {
            course.creator = user;
            console.log(course.creator);
           course.save((err) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(course);
            }
        });
    });
 
  
};
exports.courseListByStudent = function (req, res,next,id) {
    console.log(id);
    var studentnumber=id;
    User.findOne({studentnumber: studentnumber},(err, user) => {
           console.log(user);
            Course.find({creator:user},(err, courses) => {
                console.log(courses);
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            
            res.status(200).json(courses);
        }
    });
    });
   
};
//
exports.list = function (req, res) {
    Course.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, courses) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(courses);
        }
    });
};
//
exports.courseById = function (req, res, next, id) {
    Course.findOne({coursecode:id}).populate('creator', 'firstName lastName fullName').exec((err, course) => {
        if (err) return next(err);
        if (!course) return next(new Error('Failed to load course '
            + id));
          
        req.course = course;
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    const course = req.course;
    course.courseCode = req.body.courseCode;
    course.coourseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};

//The hasAuthorization() middleware uses the req.course and req.user objects
//to verify that the current user is the creator of the current course
exports.hasAuthorization = function (req, res, next) {
   
    if (req.course.creator.id !== userid) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

 