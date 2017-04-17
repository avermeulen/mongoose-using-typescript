
import mongoose = require('mongoose');
import fs = require('mz/fs');

import {tutorRequestRepository, subjectRepository} from './schemas';

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/tso');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('connected!')
});

async function findTutors(){
    let tutorsResults = await tutorRequestRepository
                        .find({})
        .populate('_subject');

    for (let tutor of tutorsResults) {
        console.log(tutor);
    }

}

(async() => {
    try {
        const tutorText = await fs.readFile('tutors.csv', 'utf-8');
        const tutorLines = tutorText.split("\n");

                interface Tutor {
                        name: string,
                        subject: string
                };

const tutors: Array<Tutor> = tutorLines.map((line) => {
    var parts = line.split(",")
    return {
        name: parts[0],
        subject: parts[1]
    }
});

for (let tutor of tutors) {

    const criteria = { name: tutor.subject };
    let subject = await subjectRepository.findOne(criteria);

    if (!subject) {
        subject = await subjectRepository.create(criteria);
    }

    let data = {
        username: tutor.name,
        _subject: subject._id
    };

    if (!await tutorRequestRepository.findOne(data)){
        await tutorRequestRepository.create(data);
    }

}

await findTutors();

            }
            catch (err) {
    console.log(err);
}
finally {
    mongoose.disconnect()
}
})();
