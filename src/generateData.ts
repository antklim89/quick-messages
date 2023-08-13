import { faker } from '@faker-js/faker';
import { User, createClient } from '@supabase/supabase-js';
import _ from 'lodash';
import { SUPABASE_URL } from './constants';
import { Database } from './supabase/types-generated';


if (!import.meta.env.SUPABASE_SERVICE_ROLE) throw new Error('No SERVICE ROLE');
const supabase = createClient<Database>(SUPABASE_URL, import.meta.env.SUPABASE_SERVICE_ROLE);


const MESSAGES = 20;


type Subjects = Database['public']['Tables']['subjects']['Row']
type Messages = Database['public']['Tables']['messages']['Row']

async function generateSubjects() {
    const subjects = ['funny', 'cars', 'movies', 'star wars', 'funny cats', 'news'];
    return supabase.from('subjects').upsert(subjects.map((subject) => ({ body: subject }))).select('*');
}

async function generateMessages(users: User[], subjects: Subjects[]) {
    const messages: Database['public']['Tables']['messages']['Insert'][] = [];
    for (let index = 0; index < MESSAGES; index += 1) {
        const author = _.sample(users);
        if (!author) break;
        messages.push({
            body: faker.lorem.sentences(_.random(3, 5)),
            authorId: author.id,
            subjectBody: _.sample(subjects.map(({ body }) => body)) || '',
            updatedAt: new Date().toISOString(),
        });
    }
    return supabase.from('messages').insert(messages).select('*');
}

async function generateAnswers(users: User[], answers: Messages[]) {
    const messages: Database['public']['Tables']['messages']['Insert'][] = [];
    for (const answer of answers) {
        for (let index = 0; index < _.random(0, MESSAGES, false); index += 1) {
            const author = _.sample(users);
            if (!author) break;
            messages.push({
                body: faker.lorem.sentences(_.random(3, 5)),
                authorId: author.id,
                answerToId: answer.id,
                subjectBody: answer.subjectBody,
                updatedAt: new Date().toISOString(),
            });
        }
    }
    return supabase.from('messages').insert(messages).select('*');
}

async function generateLikesAndFavorites(users: User[]) {
    const { data: messages } = await supabase.from('messages').select('*');

    const likes: Database['public']['Tables']['likes']['Insert'][] = [];
    const favorites: Database['public']['Tables']['favorites']['Insert'][] = [];
    for (const message of (messages || [])) {
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
    await supabase.from('likes').insert(likes);
    await supabase.from('favorites').insert(favorites);
}


(async () => {
    await supabase.from('messages').delete();

    const { data: { users } } = await supabase.auth.admin.listUsers();

    const { data: subjects } = await generateSubjects();
    const { data: messages } = await generateMessages(users, subjects || []);
    const { data: answers } = await generateAnswers(users, messages || []);
    await generateAnswers(users, answers || []);

    await generateLikesAndFavorites(users);
})();
