import React from 'react';
import CreateForm from '@/components/CreateForm';
import { auth } from '../../../../../auth';
import { redirect } from 'next/navigation';

const page = async () => {
    const session = await auth();
    if (!session) redirect('/');
    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <h1 className="heading">Submit Your StartUp</h1>
            </section>
            <CreateForm />
        </>
    );
};

export default page;