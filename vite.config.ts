import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/



export default defineConfig(({ command }) => {

    if (command === 'serve') {

        return {
            plugins: [react()],
            server: {
                port: 5000
            },
        }
    } else {
        return {
            plugins: [react()]
        }
    }

})