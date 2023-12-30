import {useState, useEffect} from 'react';
import {ApartmentManager} from "../apartmentSystem/apartmentManager";

export function UserManager() {
    const [users, setUsers] = useState([]);
    const initialState = { id: '', firstname: '', lastname: '', email: '', password: '' };
    const {removeApartmentsByOwnerID} = ApartmentManager();

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            const parsedUsers = JSON.parse(storedUsers);
            setUsers(parsedUsers);
        } else {
            const testUser = { id: 0, firstname: 'Test', lastname: 'User', email: 'student@agh.edu.pl', password: 'student' };
            setUsers([testUser]);
            localStorage.setItem('users', JSON.stringify([testUser]));
        }
    }, []);

    function registerUser(userInfo) {
        const newUser = {
            id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            password: userInfo.password,
        };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        return newUser;
    }

    function removeUser(id) {
        removeApartmentsByOwnerID(id);
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(newUsers);
        localStorage.setItem('users', JSON.stringify(newUsers));
    }

    return { users, registerUser, removeUser, initialState };
}

