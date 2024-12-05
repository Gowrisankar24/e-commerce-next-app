import React from 'react';
import Form from 'next/form';
import InputSearchReset from './InputSearchReset';
import { Search } from 'lucide-react';

const InputSearch = ({ query }: { query?: string }) => {
    return (
        <>
            <Form action="/" scroll={false} className="search-form">
                <input
                    name="query"
                    defaultValue={query}
                    className="search-input"
                    placeholder="Search Startups"
                />

                <div className="flex gap-2">
                    {query && <InputSearchReset />}
                    <button type="submit" className="search-btn text-white">
                        <Search className="size-4" />
                    </button>
                </div>
            </Form>
        </>
    );
};

export default InputSearch;
