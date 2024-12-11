'use client';
import React from 'react';
import { signOut } from '../../auth';

const LogoutConfirmPopup = () => {
    const handleLogout = async e => {
        'use server';
        // e.preventDefault();
        await signOut({ redirectTo: '/' });
    };
    return (
        <div className="text-white">
            <h3 className="font-semibold">Are you Sure!.Do you want to log out?</h3>

            <div className="float-right mx-3 my-2">
                <button className="bg-black-100 logout-btn" onClick={handleLogout}>
                    Ok
                </button>
                <button className="bg-black-100 logout-btn ms-2">Cancel</button>
            </div>
        </div>
    );
};

export default LogoutConfirmPopup;
