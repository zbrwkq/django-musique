import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import { jwtDecode } from "jwt-decode";

const Profil = () => {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users/');
                setUsers(response.data.Users);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        };

        fetchUsers();
    }, [auth.token]);

    const toggleFriend = async (friendUserId) => {
        try {
            const response = await axios.post(`http://localhost:8000/follows/toggle_friend/${friendUserId}/`, {}, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            if (response.data.message === 'Ami ajouté') {
                setFriends([...friends, friendUserId]);
            } else {
                setFriends(friends.filter(id => id !== friendUserId));
            }
        } catch (error) {
            console.error("There was an error toggling the friend status!", error);
        }
    };

    return (
        <div>
            <h1>Profil</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.id}
                        <button onClick={() => toggleFriend(user.id)}>
                            {friends.includes(user.id) ? 'Supprimer des amis' : 'Ajouter en ami'}
                        </button>
                    </li>
                    
                ))}
            </ul>
        </div>
    );
};

export default Profil;
