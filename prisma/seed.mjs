/* eslint-disable no-await-in-loop */
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash';


const prisma = new PrismaClient();
const MESSAGES = 5;

async function generateMessages(users) {
    const messages = [];
    for (let index = 0; index < MESSAGES; index += 1) {
        const author = _.sample(users);
        if (!author) break;
        messages.push({
            body: faker.lorem.sentences(_.random(3, 5)),
            authorId: author.id,
        });
    }
    return prisma.$transaction(messages.map((data) => prisma.message.create({ data })));
}

async function generateAnswers(users, answers) {
    const messages = [];
    for (const answer of answers) {
        for (let index = 0; index < MESSAGES; index += 1) {
            const author = _.sample(users);
            if (!author) break;
            messages.push({
                body: faker.lorem.sentences(_.random(3, 5)),
                authorId: author.id,
                answerToId: answer.id,
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

    const messages = await generateMessages(users);
    const answers1 = await generateAnswers(users, messages);
    await generateAnswers(users, answers1);

    await generateLikesAndFavorites(users);
})();
