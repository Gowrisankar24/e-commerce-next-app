import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_USER_QUERY } from '@/sanity/lib/queries';
import React from 'react';
import StartupCard, { StartupTypeCard } from './StartupCard';

const UserStartups = async ({ id }: { id: string }) => {
    const getUserStartupsList = await client.fetch(STARTUPS_BY_USER_QUERY, { id });
    return (
        <>
            {getUserStartupsList?.length > 0 ? (
                getUserStartupsList?.map((startup: StartupTypeCard) => (
                    <StartupCard key={startup._id} post={startup} />
                ))
            ) : (
                <p className="no-result">No Posts yet</p>
            )}
        </>
    );
};

export default UserStartups;
