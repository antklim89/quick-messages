import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash';


const prisma = new PrismaClient();
const MESSAGES = 20;


async function generateSubjects() {
    const subjects = ['funny', 'cars', 'movies', 'star wars', 'funny cats', 'news'];
    await prisma.subject.createMany({
        data: subjects.map((subject) => ({ body: subject })),
    });
    return subjects;
}

async function generateMessages(users, subjects) {
    const messages = [];
    for (let index = 0; index < MESSAGES; index += 1) {
        const author = _.sample(users);
        if (!author) break;
        messages.push({
            body: faker.lorem.sentences(_.random(3, 5)),
            authorId: author.id,
            subjectBody: _.sample(subjects),
        });
    }
    return prisma.$transaction(messages.map((data) => prisma.message.create({ data })));
}

async function generateAnswers(users, answers) {
    const messages = [];
    for (const answer of answers) {
        for (let index = 0; index < _.random(0, MESSAGES, false); index += 1) {
            const author = _.sample(users);
            if (!author) break;
            messages.push({
                body: faker.lorem.sentences(_.random(3, 5)),
                authorId: author.id,
                answerToId: answer.id,
                subjectBody: answer.subjectBody,
            });
        }
    }
    return prisma.$transaction(messages.map((data) => prisma.message.create({ data })));
}

async function generateLikesAndFavorites(users) {
    const messages = await prisma.message.findMany();
    const likes = [];
    const favorites = [];
    for (const message of messages) {
        for (const user of users) {
            if (_.random(true) < 0.5) {
                likes.push({
                    messageId: message.id,
                    userId: user.id,
                });

            }
            if (_.random(true) < 0.5) {
                favorites.push({
                    messageId: message.id,
                    userId: user.id,
                });
            }
        }
    }
    await prisma.like.createMany({ data: likes });
    await prisma.favorite.createMany({ data: favorites });
}


(async () => {
    await prisma.message.deleteMany({});

    const users = await prisma.profile.findMany();

    const subjects = await generateSubjects();
    const messages = await generateMessages(users, subjects);
    const answers1 = await generateAnswers(users, messages);
    await generateAnswers(users, answers1);

    await generateLikesAndFavorites(users);
})();
