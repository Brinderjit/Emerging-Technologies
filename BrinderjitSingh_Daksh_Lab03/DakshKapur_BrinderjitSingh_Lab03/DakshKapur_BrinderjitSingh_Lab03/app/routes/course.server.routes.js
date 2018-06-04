const students = require('../../app/controllers/student.server.controller');
const courses = require('../../app/controllers/course.server.controller');
 var passport = require('passport');
module.exports = function (app) {
    app.route('/api/courses')
        .get(courses.list)
        .post(students.requiresLogin ,courses.create);
    app.route('/api/courses/:courseId')
        .get(courses.read)
        .put(students.requiresLogin, courses.hasAuthorization, courses.update)
        .delete(students.requiresLogin, courses.hasAuthorization, courses.delete);
             app.route('/api/coursesByStudent/:studentId').get(courses.courseListByStudent);
   app.param('studentId', courses.courseListByStudent);
    app.param('courseId', courses.courseById);

};
