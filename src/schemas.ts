import mongoose = require('mongoose');

interface ISubject extends mongoose.Document {
    name: string;
}

var subjectSchema = new mongoose.Schema({
    name: String
});

let subjectRepository: mongoose.Model<ISubject> = mongoose.model<ISubject>("Subject", subjectSchema);

var tutorRequestSchema = new mongoose.Schema({
    username: String,
    _subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }
});

interface ITutorRequest extends mongoose.Document {
    username: string,
    _subject: mongoose.Schema.Types.ObjectId,
}

var tutorRequestRepository: mongoose.Model<ITutorRequest> = mongoose.model<ITutorRequest>("TutorRequest", tutorRequestSchema);

export {tutorRequestRepository, subjectRepository};
