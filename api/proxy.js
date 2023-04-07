// api/proxy.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://chat-gpt-cvss-assistant.vercel.app/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  })
);

module.exports = app;
