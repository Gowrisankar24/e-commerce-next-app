import React from 'react';
import Blink from './Blink';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';

const View = async ({ id }: { id: string }) => {
    const { views: totalNoViews } = await client
        .withConfig({ useCdn: false })
        .fetch(STARTUP_VIEWS_QUERY, { id });
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
