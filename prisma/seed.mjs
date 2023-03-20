/* eslint-disable no-await-in-loop */
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash';


const prisma = new PrismaClient();
const MESSAGES = 2;

async function generateMessages(users) {
    const data = [];
    for (let index = 0; index < MESSAGES; index += 1) {
        const author = _.sample(users);
        if (!author) break;
        data.push({
            body: faker.lorem.sentences(_.random(3, 5)),
            authorId: author.id,
        });
    }
    await prisma.message.createMany({ data });
    return prisma.message.findMany();
}

async function generateAnswers(users, answers) {
    const data = [];
    for (const answer of answers) {
        const author = _.sample(users);
        if (!author) break;
        console.log(answer);
        data.push({
            body: faker.lorem.sentences(_.random(3, 5)),
            authorId: author.id,
            answerToId: answer.id,
        });
    }
    await prisma.message.createMany({ data });
    return prisma.message.findMany();
}

async function generateLikesAndFavorites(users, messages) {
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
    console.log('===\n ~ messages:', messages);
    // const answers = await generateAnswers(users, messages);
    // console.log('===\n ~ answers:', answers);

    // await generateLikesAndFavorites(users, messages);
})();
