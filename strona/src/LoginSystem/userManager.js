import {useState, useEffect} from 'react';
import {ApartmentManager} from "../apartmentSystem/apartmentManager";
import bcrypt from 'bcryptjs';

export function UserManager() {
    const [users, setUsers] = useState([]);
    const initialState = { id: '', firstname: '', lastname: '', email: '', password: '' };
    const {removeApartmentsByOwnerID} = ApartmentManager();
    bcrypt.genSaltSync(10)

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            const parsedUsers = JSON.parse(storedUsers);
            setUsers(parsedUsers);
        } else {
            const testUser = { id: 0, firstname: 'Test', lastname: 'User', email: 'student@agh.edu.pl', password: hashPassword('student') };
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
            password: hashPassword(userInfo.password),
        };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        return newUser;
    }

    function hashPassword(password) {
        return bcrypt.hashSync(password);
    }
    function removeUser(id) {
        removeApartmentsByOwnerID(id);
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(newUsers);
        localStorage.setItem('users', JSON.stringify(newUsers));
    }

     function getUserLogin(userInfo) {
        const user = users.find((user) => user.email === userInfo.email);
         if (user && bcrypt.compareSync(userInfo.password, user.password)) return user;
         else return null;
    }

    function getUserByEmail(userInfo) {
        return users.find((user) => user.email === userInfo.email);
    }

    function printUsers() {
        console.log(users);
    }

    return { printUsers, getUserLogin, getUserByEmail, registerUser, removeUser, initialState };
}

