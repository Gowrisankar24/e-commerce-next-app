'use server';
import { auth } from '../../auth';
import { parsedResponseString } from './utils';
import slugify from 'slugify';
import { write_token } from '@/sanity/lib/write-token';

export const createPitch = async (formValues: Record<string, any>) => {
    const session = auth();
    if (!session) {
        return parsedResponseString({
            error: 'Not Signed In',
            status: 'ERROR',
        });
    }

    const { title, description, category, link, pitchValue } = formValues;

    const slug = slugify(title as string, { lower: true, strict: true });
    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch: pitchValue,
        };

        const result = await write_token.create({ _type: 'startup', ...startup });

        return parsedResponseString({
            ...result,
            error: '',
            status: 'SUCCESS',
        });
    } catch (error) {
        console.log(error);

        return parsedResponseString({
            error: JSON.stringify(error),
            status: 'ERROR',
        });
    }
};
