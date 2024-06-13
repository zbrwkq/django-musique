import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import { jwtDecode } from "jwt-decode";

const Profil = () => {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState(null);
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

    useEffect(() => {
        if (auth.token) {
            const decodedToken = jwtDecode(auth.token);
            const userId = decodedToken.user_id;

            const fetchFriends = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/follows/follows/${userId}`);
                    console.log(response.data.Follows);
                    setFriends(response.data.Follows);
                } catch (err) {
                    setError(err.message);
                }
            };

            fetchFriends();
        }
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

    const friendsList = users.length > 0 ? users.filter(user => friends.includes(user.id)) : [];
    const otherUsersList = users.length > 0 ? users.filter(user => !friends.includes(user.id)) : [];

    return (
        <div>
            <h1>Profil</h1>
            <h2>Mes amis</h2>
            <ul>
                {friendsList.map(user => (
                    <li key={user.id}>
                        <a href={`/details/${user.id}`}>
                            {user.username} - {user.id}
                        </a>
                        <button onClick={() => toggleFriend(user.id)}>
                            Supprimer des amis
                        </button>
                    </li>
                ))}
            </ul>
            <h2>Autres utilisateurs</h2>
            <ul>
                {otherUsersList.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.id}
                        <button onClick={() => toggleFriend(user.id)}>
                            Ajouter en ami
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profil;
