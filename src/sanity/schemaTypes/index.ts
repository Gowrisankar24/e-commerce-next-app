import { type SchemaTypeDefinition } from 'sanity';
import { author } from './author';
import { Startups } from './startups';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [author, Startups],
};
