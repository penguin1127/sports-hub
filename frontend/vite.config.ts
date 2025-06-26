import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  server: {
    port: 5173, // React 개발 서버가 실행될 포트 (기본값)
    host: true, // 외부 네트워크에서 접속 허용 (0.0.0.0과 유사)
    proxy: {
      '/api': { // React 앱에서 '/api'로 시작하는 모든 요청을 프록시합니다.
        // 여기에 여러분의 Spring Boot 백엔드 서버의 실제 IP 주소와 포트를 입력하세요.
        // 예시: 'http://192.168.0.100:8080'
        target: `http://192.168.55.186:8080`,
        changeOrigin: true, // 대상 서버의 호스트 헤더를 변경합니다.
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api' 접두사를 제거하고 백엔드로 보냅니다. (백엔드 API 경로가 /api/ 로 시작하지 않는다면)
      },
      // 다른 API 경로가 있다면 여기에 추가할 수 있습니다.
    }
  }
})