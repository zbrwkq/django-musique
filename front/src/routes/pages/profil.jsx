import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import { jwtDecode } from "jwt-decode";

const Profil = () => {    
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState({});
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
                    const friendsMap = {};
                    response.data.Follows.forEach(follow => {
                        friendsMap[follow.id_follow] = true;
                    });
                    setFriends(friendsMap);
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
                setFriends({ ...friends, [friendUserId]: true });
            } else {
                const updatedFriends = { ...friends };
                delete updatedFriends[friendUserId];
                setFriends(updatedFriends);
            }
        } catch (error) {
            console.error("There was an error toggling the friend status!", error);
        }
    };

    const friendsIds = Object.keys(friends);
    const friendsList = users.filter(user => friendsIds.includes(user.id.toString()));
    const otherUsersList = users.filter(user => !friendsIds.includes(user.id.toString()));

    if(!auth.token) return <h1>Unauthorized</h1>;

    return (
        <div className="container">
            <h1>Profil</h1>
            <h2>Mes amis</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {friendsList.map(user => (
                        <tr key={user.id}>
                            <td>
                                <a href={`/friend/${user.id}`}>
                                    {user.username}
                                </a>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => toggleFriend(user.id)}>
                                    Supprimer des amis
                                </button>
                                <a className="btn btn-primary ms-3" href={`/friend/${user.id}`}>Voir le profil</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Autres utilisateurs</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {otherUsersList.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => toggleFriend(user.id)}>
                                    Ajouter en ami
                                </button>
                                <a className="btn btn-primary ms-3" href={`/friend/${user.id}`}>Voir le profil</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Profil;
