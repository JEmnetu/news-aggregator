import axios, { AxiosInstance } from 'axios'
import { config } from 'process'
import { RegisterResponse } from '../types/RegisterResponse'
import { AuthResponse } from '../types/AuthResponse'
import { NewsResponse } from '../types/NewsResponse'
import { MessageResponse } from '../types/MessageResponse'
import { User } from '../types/User'

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    // timeout: 10000,
    // headers: {}
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const registerUser = async (email: string, password: string, firstName: string, lastName: string): Promise<RegisterResponse> => {
    const newUser = { email: email, password: password, first_name: firstName, last_name: lastName };
    const response = await apiClient.post('/auth/register', newUser)

    return response.data
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    const userCredentials = { email, password };
    const response = await apiClient.post('/auth/login', userCredentials);

    return response.data;
}

export const getMe = async (): Promise<User> => {
    const response = await apiClient.get("/users/me")
    return response.data
}

export const getNews = async (category?: string, search?: string, page?: number, page_size?: number): Promise<NewsResponse> => {
    const response = await apiClient.get('/news', { params: { category, search, page, page_size } });
    return response.data
}

export const createBookmark = async (article_url: string, title: string, image_url?: string): Promise<MessageResponse> => {

    const bookmarkData = { article_url, title, image_url }
    const response = await apiClient.post("/bookmarks", bookmarkData);
    return response.data

}

export const deleteBookmark = async (bookmark_id: number): Promise<MessageResponse> => {
    const response = await apiClient.delete(`/bookmarks/${bookmark_id}`);
    return response.data
}

export default apiClient