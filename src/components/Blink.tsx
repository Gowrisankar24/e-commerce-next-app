import React from 'react';

const Blink = () => {
    return (
        <div className="relative">
            <div className=" absolute -left-4">
                <span className="flex size-[11px]">
                    <span className=" absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex size-[11px] rounded-full bg-primary"></span>
                </span>
            </div>
        </div>
    );
};

export default Blink;