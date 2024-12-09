import { z } from 'zod';
export const formSchemaCheck = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(500),
    category: z.string().min(3).max(50),
    link: z
        .string()
        .url()
        .refine(async url => {
            if (!url.startsWith('https://') && !url.startsWith('http://')) {
                return false;
            }
            try {
                const res = await fetch(url, { method: 'HEAD' });
                const contentType = res?.headers?.get('Content-Type');
                return contentType?.startsWith('image/');
            } catch {
                return false;
            }
        }),
    pitchValue: z.string().min(5),
});
