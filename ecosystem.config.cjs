module.exports = {
  apps: [
    {
      name: 'cybergenz-api',
      script: 'server/index.js',
      cwd: '/home/acehtanggap1/htdocs/acehtanggap.cloud',
      watch: false,
      autorestart: true,
      restart_delay: 2000,
      max_restarts: 20,
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'cybergenz-frontend',
      script: 'node_modules/vite/bin/vite.js',
      args: '--host 0.0.0.0 --port 3000 --no-open',
      cwd: '/home/acehtanggap1/htdocs/acehtanggap.cloud',
      watch: false,
      autorestart: true,
      restart_delay: 2000,
      max_restarts: 20,
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
};
