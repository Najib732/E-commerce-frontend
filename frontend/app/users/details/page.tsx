// app/users/details/page.tsx
'use client'; // must for client component

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '@/app/TokenContext';

export default function UserDetails() {
       const { token } = useToken(); 
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:3000/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
      
           setUser(res.data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <h1>User Details (CSR)</h1>
            {user ? (
                <div>
                     <p>id: {user.user_id}</p>
                    <p>Name: {user.user_name}</p>
                    <p>Email: {user.email}</p>
                    <p>phone no: {user.mobile_no}</p>
                    <p>address: {user.address}</p>
                    <p>acount type: {user.category}</p>
                
                </div>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
}
