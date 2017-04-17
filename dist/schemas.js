"use strict";
const mongoose = require("mongoose");
var subjectSchema = new mongoose.Schema({
    name: String
});
let subjectRepository = mongoose.model("Subject", subjectSchema);
exports.subjectRepository = subjectRepository;
var tutorRequestSchema = new mongoose.Schema({
    username: String,
    _subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }
});
var tutorRequestRepository = mongoose.model("TutorRequest", tutorRequestSchema);
exports.tutorRequestRepository = tutorRequestRepository;
