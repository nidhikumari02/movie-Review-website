import axios from 'axios';

export default axios.create({
    baseURL:'       https://a3fd-2409-4055-383-a92e-1174-f246-cb3d-b291.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
});