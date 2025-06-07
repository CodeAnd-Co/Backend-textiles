module.exports = {
  apps: [
    {
      name: 'app-staging',
      script: './app.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      env: {
        NODE_ENV: 'staging',
        PORT: 4000,
      },
    },
  ],
};
