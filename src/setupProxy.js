const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const proxyOptions = {
    changeOrigin: true,
    timeout: 10000, // 10 seconden timeout
    proxyTimeout: 10000,
    onError: (err, req, res) => {
      console.error('[Proxy Error]:', err);
      res.status(504).json({ error: 'Proxy timeout of verbindingsfout', details: err.message });
    },
    onProxyReq: (proxyReq, req, res) => {
      // Log de request om te zien wat er gebeurt
      console.log(`[Proxy Request]: ${req.method} ${req.url} -> ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
    }
  };

  // Proxy voor Trading API (Balans, Equity, Open Trades)
  app.use(
    '/trading-api',
    createProxyMiddleware({
      ...proxyOptions,
      target: 'https://mt-client-api-v1.agiliumtrade.ai',
      pathRewrite: { '^/trading-api': '' },
    })
  );

  // Proxy voor Stats API (Winrate, Profit Factor, Grafieken)
  app.use(
    '/stats-api',
    createProxyMiddleware({
      ...proxyOptions,
      target: 'https://metastats-api-v1.agiliumtrade.ai',
      pathRewrite: { '^/stats-api': '' },
    })
  );

  // Proxy voor Provisioning API (Accounts lijst)
  app.use(
    '/provisioning-api',
    createProxyMiddleware({
      ...proxyOptions,
      target: 'https://provisioning-api-v1.agiliumtrade.ai',
      pathRewrite: { '^/provisioning-api': '' },
    })
  );
};




