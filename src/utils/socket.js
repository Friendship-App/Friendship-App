import apiRoot from './api.config';
import io from 'socket.io-client';

export const socket = io(apiRoot);
