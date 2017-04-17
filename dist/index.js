"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mongoose = require("mongoose");
const fs = require("mz/fs");
const schemas_1 = require("./schemas");
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/tso');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected!');
});
function findTutors() {
    return __awaiter(this, void 0, void 0, function* () {
        let tutorsResults = yield schemas_1.tutorRequestRepository
            .find({})
            .populate('_subject');
        for (let tutor of tutorsResults) {
            console.log(tutor);
        }
    });
}
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        const tutorText = yield fs.readFile('tutors.csv', 'utf-8');
        const tutorLines = tutorText.split("\n");
        ;
        const tutors = tutorLines.map((line) => {
            var parts = line.split(",");
            return {
                name: parts[0],
                subject: parts[1]
            };
        });
        for (let tutor of tutors) {
            const criteria = { name: tutor.subject };
            let subject = yield schemas_1.subjectRepository.findOne(criteria);
            if (!subject) {
                subject = yield schemas_1.subjectRepository.create(criteria);
            }
            let data = {
                username: tutor.name,
                _subject: subject._id
            };
            if (!(yield schemas_1.tutorRequestRepository.findOne(data))) {
                yield schemas_1.tutorRequestRepository.create(data);
            }
        }
        yield findTutors();
    }
    catch (err) {
        console.log(err);
    }
    finally {
        mongoose.disconnect();
    }
}))();
