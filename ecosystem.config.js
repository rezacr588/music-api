module.exports = {
  apps: [
    {
      name: 'index',
      script: './index.js',
      watch: true,
      instances: 'max',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
