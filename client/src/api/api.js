import axios from 'axios'

const API_BASE = `${process.env.REACT_APP_API_URL}/tasks`;
export const getTasks = () => {
    const token = localStorage.getItem('token');
    console.log('🔑 Token being sent:', token);
    return axios.get(API_BASE, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createTask = (text) => {
    const token = localStorage.getItem('token');
    return axios.post(
        API_BASE,
        { text },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const deleteTask = (id) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${API_BASE}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateTask = (id, data) => {
    const token = localStorage.getItem('token');
    return axios.put(`${API_BASE}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};