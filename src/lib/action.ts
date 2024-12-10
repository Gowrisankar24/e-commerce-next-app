'use server';

import { auth } from '../../auth';
import { parsedResponseString } from './utils';
import slugify from 'slugify';
import { write_token } from '@/sanity/lib/write-token';
interface FormValues {
    title: string;
    description: string;
    category: string;
    link: string;
    pitchValue: string;
}

export const createPitch = async (formValues: FormValues) => {
    const session = await auth();
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
            views: 0,
            pitch: pitchValue,
        };
        const result = await write_token.create({ _type: 'startup', ...startup });

        return parsedResponseString({
            ...result,
            error: '',
            status: 'SUCCESS',
        });
    } catch (error) {
        const err = error as Error; // Explicit cast
        return parsedResponseString({
            error: err?.message || 'Unknown error',
            status: 'ERROR',
        });
    }
};
