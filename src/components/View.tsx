import React from 'react';
import Blink from './Blink';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { write_token } from '@/sanity/lib/write-token';
import { unstable_after as after } from 'next/server';

interface ViewsData {
    views: number | null;
}

const View = async ({ id }: { id: string }) => {
    const results: ViewsData | null = await client
        .withConfig({ useCdn: false })
        .fetch(STARTUP_VIEWS_QUERY, { id });

    const { views: totalNoViews } = results;
    after(async () => {
        await write_token
            .patch(id)
            .set({ views: totalNoViews + 1 })
            .commit();
    });
    return (
        <div className="view-container">
            <div className="absolute -top-1 -right-2">
                <Blink />
            </div>
            <p className="view-text">
                <span className="font-black">{totalNoViews} Views</span>
            </p>
        </div>
    );
};

export default View;
