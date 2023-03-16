import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash';


const prisma = new PrismaClient();

async function generateMessages() {
    const users = await prisma.profile.findMany();

    await prisma.message.createMany({
        data: _.times(20, () => ({
            authorId: _.sample(users).id,
            body: faker.lorem.words(10),
        })),
    });
}

generateMessages();
