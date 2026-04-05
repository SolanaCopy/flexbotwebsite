/**
 * Service to handle MetaApi.cloud integration
 * Stats-First version to bypass MT5 Trading History 404s
 */

const META_API_TOKEN = process.env.REACT_APP_META_API_TOKEN || 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJjMjU5NzMzYWRjNDFhZDYyMDhmYWVkZGU3M2YwOTk4OSIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVzdC1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtZXRhc3RhdHMtYXBpIiwibWV0aG9kcyI6WyJtZXRhc3RhdHMtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoiY29weWZhY3RvcnktYXBpIiwibWV0aG9kcyI6WyJjb3B5ZmFjdG9yeS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibXQtbWFuYWdlci1hcGkiLCJtZXRob2RzIjpbIm10LW1hbmFnZXItYXBpOnJlc3Q6ZGVhbGluZzoqOioiLCJtdC1tYW5hZ2VyLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJiaWxsaW5nLWFwaSIsIm1ldGhvZHMiOlsiYmlsbGluZy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfV0sImlnbm9yZVJhdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiYzI1OTczM2FkYzQxYWQ2MjA4ZmFlZGRlNzNmMDk5ODkiLCJpYXQiOjE3NjgxMzEwMjEsImV4cCI6MTc3NTkwNzAyMX0.bWu0NF5BKYRwAzA5V0uv7XU_G74ioI3YTzlxNYiu4CVqXn5v_dUlKWrKTm4cWPQseRIPsjuIMLAPruBSAZIv_MhcK4t50enJAwPVanmCinRCM-rzoHOyA_oMwaSoeXTZZb6Eo-d8PheQMAoAyWk3LN47JCTPoHQtSVXrUf5rHxNXYXtMbkkR2qnKLWMsuJDKOUNZVplK7wjkw0oJx6SgL0hDPWbURUPJq4cb1buWmnDv4QzMNwK1dSkBDBjyrCuIqcx73E8xgwPsucekdr-pspHaR98S4Ju0J6ZSixCjqCCEepLDHgd7HFltRkxXD89KV1Y0D-46hX9YI-RdrWsfqlpZDZDwOCRBjX4lwpRcNKWhR9VvURH4foveXCH0rmt94XAIRueO7FCFD2-WNef84nNw25wRzFamgiMwNd2U0EMuqLYBWfwsHOLF0jRVr0pYjcCCafIIVYmhO4w_GgF7yqY0CkMEKdvH3h9h_qtCkrSFzV5chPXTZosZppNIJwCB2U_p5Di6NbKuWhxEEL9ZaEc6zvcDDmZerRehk0a_EvL171hfiOu7eZ4BBzx4W3qEaPYPs4E0pEDgLAWBpxziVXYTHg3cs3gAhdmKCFEkDMvo-PdNALI6orsz9qZYdrykQ2PSYZ01-dT3w7j3g4F7YV38EPDkEshl8ZRejh2zaUk';

const TRADING_API_BASE = 'https://mt-client-api-v1.agiliumtrade.ai';
const STATS_API_BASE = 'https://metastats-api-v1.agiliumtrade.ai';
const PROVISIONING_API_BASE = 'https://provisioning-api-v1.agiliumtrade.ai';

export const metaApiService = {
  async fetchMeta(urlPath, method = 'GET', body = null) {
    try {
      const isStatsRequest = urlPath.includes('/metrics') || 
                             urlPath.includes('/performance-by-day') || 
                             urlPath.includes('/trades') ||
                             urlPath.includes('/historical-trades');
      
      const isProvisioningRequest = urlPath === '/users/current/accounts' || 
                                    (urlPath.startsWith('/users/current/accounts/') && 
                                     !urlPath.includes('/account-information') && 
                                     !urlPath.includes('/positions') &&
                                     !isStatsRequest);
                                 
      let baseUrl = TRADING_API_BASE;
      if (isStatsRequest) baseUrl = STATS_API_BASE;
      if (isProvisioningRequest) baseUrl = PROVISIONING_API_BASE;

      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      let finalUrl;
      if (isLocal) {
        if (isStatsRequest) finalUrl = `/stats-api${urlPath}`;
        else if (isProvisioningRequest) finalUrl = `/provisioning-api${urlPath}`;
        else finalUrl = `/trading-api${urlPath}`;
      } else {
        finalUrl = `/api/proxy?url=${encodeURIComponent(baseUrl + urlPath)}`;
      }

      console.log(`[MetaApi] ${method}: ${finalUrl}`);

      const response = await fetch(finalUrl, {
        method: method,
        headers: { 
          'auth-token': META_API_TOKEN,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
      });
      
      if (!response.ok) {
        const text = await response.text();
        console.warn(`[MetaApi] Error (${response.status}): ${text.substring(0, 100)}`);
        return null;
      }
      
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(`[MetaApi] Netwerkfout voor ${urlPath}:`, e);
      return null;
    }
  },

  async provisionAccount(credentials) {
    console.log(`[MetaApi] Provisioning nieuw account voor login: ${credentials.accountId}`);
    const body = {
      name: `FlexBot - ${credentials.accountId}`,
      type: 'cloud-g2',
      login: credentials.accountId,
      password: credentials.password,
      server: credentials.server,
      platform: credentials.platform || 'mt5',
      application: 'MetaApi',
      magic: 1000,
      quoteStreaming: { intervalInMilliseconds: 0, subscriptions: [] }
    };
    
    const result = await this.fetchMeta('/users/current/accounts', 'POST', body);
    if (result && result.id) {
      console.log(`[MetaApi] Account succesvol aangemaakt! ID: ${result.id}`);
      // Start de deployment van het account
      await this.fetchMeta(`/users/current/accounts/${result.id}/deploy`, 'POST');
      return result;
    }
    return null;
  },

  async linkAccount(credentials) {
    try {
      console.log(`[MetaApi] Zoeken naar account met login: ${credentials.accountId}`);
      const accounts = await this.fetchMeta('/users/current/accounts');
      
      if (accounts && Array.isArray(accounts)) {
        // Zoek op login nummer (rekeningnummer) of ID
        const found = accounts.find(a => 
          String(a.login) === String(credentials.accountId) || 
          a.id === credentials.accountId
        );

        if (found) {
          console.log(`[MetaApi] Match gevonden: ${found.id} (Login: ${found.login})`);
          return { 
            id: found.id, 
            simulated: false,
            server: found.server || credentials.server,
            platform: found.platform || credentials.platform
          };
        }
      }
      
      // Als niet gevonden, maak aan!
      const newAccount = await this.provisionAccount(credentials);
      if (newAccount) {
        return {
          id: newAccount.id,
          simulated: false,
          server: credentials.server,
          platform: credentials.platform
        };
      }
      
      console.warn("[MetaApi] Kon account niet vinden of aanmaken.");
      return { id: credentials.accountId, simulated: false, error: true };
    } catch (e) {
      console.error("[MetaApi] linkAccount error:", e);
      return { id: credentials.accountId, simulated: false, error: true };
    }
  },

  async getAccountInformation(accountId) {
    return await this.fetchMeta(`/users/current/accounts/${accountId}/account-information`);
  },

  async getOpenPositions(accountId) {
    const data = await this.fetchMeta(`/users/current/accounts/${accountId}/positions`);
    return data || [];
  },

  async getAccountMetrics(accountId) {
    try {
      console.log(`[MetaApi] DEEP SCAN gestart voor: ${accountId}`);
      
      // 1. Haal metrics op (Stats API) - Deze werkt in je logs
      const statsRes = await this.fetchMeta(`/users/current/accounts/${accountId}/metrics`);
      const m = statsRes?.metrics || statsRes;

      // 2. Haal trades op via de Stats API
      let trades = [];
      const now = new Date();
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const startTime = lastWeek.toISOString().replace('T', ' ').replace('Z', '').split('.')[0] + '.000';
      const endTime = now.toISOString().replace('T', ' ').replace('Z', '').split('.')[0] + '.000';

      console.log(`[MetaApi] Ophalen van trades (laatste 7 dagen: ${startTime} tot ${endTime})...`);
      
      // We proberen eerst Historical Trades (Time Range) voor de laatste week
      const histRes = await this.fetchMeta(`/users/current/accounts/${accountId}/historical-trades/${encodeURIComponent(startTime)}/${encodeURIComponent(endTime)}?limit=200`);
      
      if (histRes && histRes.trades) {
        trades = histRes.trades.map(t => {
          const rawTime = t.closeTime || t.openTime || t.time || new Date().toISOString();
          return {
            id: t._id || t.id,
            type: String(t.type || '').includes('BUY') ? 'BUY' : 'SELL',
            profit: parseFloat(t.profit || 0),
            time: String(rawTime).replace(' ', 'T'),
            symbol: t.symbol || 'XAUUSD',
            volume: t.volume || t.lots || 0,
            price: t.closePrice || t.openPrice || t.price || 0,
            comment: t.comment || ''
          };
        });
      }

      // Als Historical niks geeft, proberen we de gewone trades API (meestal laatste trades)
      if (trades.length === 0) {
        console.log("[MetaApi] Historical trades leeg voor deze week, probeer reguliere trades API...");
        const tradesRes = await this.fetchMeta(`/users/current/accounts/${accountId}/trades?limit=100`);
        if (tradesRes) {
          const rawTrades = Array.isArray(tradesRes) ? tradesRes : (tradesRes.trades || []);
          trades = rawTrades.map(t => {
            const rawTime = t.closeTime || t.time || t.openTime || new Date().toISOString();
            return {
              id: t.id || t._id,
              type: String(t.type || '').includes('BUY') ? 'BUY' : 'SELL',
              profit: parseFloat(t.profit || 0),
              time: String(rawTime).replace(' ', 'T'),
              symbol: t.symbol || 'XAUUSD',
              volume: t.volume || t.lots || 0,
              price: t.closePrice || t.price || t.openPrice || 0,
              comment: t.comment || ''
            };
          });

          // Filter handmatig op de laatste week als de API dat niet deed
          trades = trades.filter(t => new Date(t.time) >= lastWeek);
        }
      }

      // Sorteer op tijd (nieuwste eerst)
      trades.sort((a, b) => new Date(b.time) - new Date(a.time));

      // 3. Haal performance data op (Voor de grafiek en Daily Pulse)
      let days = m?.dailyGrowth || [];
      if (days.length === 0) {
        const performanceRes = await this.fetchMeta(`/users/current/accounts/${accountId}/performance-by-day`);
        days = performanceRes?.days || performanceRes?.dailyGrowth || [];
      }

      // 4. Fallback: Bereken daily growth uit trades als we nog steeds niks hebben
      if (days.length === 0 && trades.length > 0) {
        console.log("[MetaApi] Geen daily growth data, berekenen uit trades...");
        const growthByDay = {};
        
        trades.forEach(t => {
          const date = t.time.split('T')[0];
          if (!growthByDay[date]) {
            growthByDay[date] = { profit: 0, count: 0 };
          }
          growthByDay[date].profit += (t.profit || 0);
          growthByDay[date].count += 1;
        });

        days = Object.keys(growthByDay).map(date => ({
          date: date,
          profit: growthByDay[date].profit,
          profitPercentage: (growthByDay[date].profit / (m?.balance || 10000)) * 100 // Schatting
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      console.log(`[MetaApi] Scan voltooid. Trades gevonden: ${trades.length}, Dagen gevonden: ${days.length}`);

      // Winrate berekening 
      let winRate = 0;
      if (m?.wonTradesPercent !== undefined) {
        winRate = m.wonTradesPercent;
      } else if (m?.winRate !== undefined) {
        winRate = m.winRate * 100;
      } else if (m?.successRate !== undefined) {
        winRate = m.successRate * 100;
      } else if (trades.length > 0) {
        const closed = trades.filter(t => (t.profit !== undefined && t.profit !== 0));
        const winning = closed.filter(t => t.profit > 0).length;
        winRate = closed.length > 0 ? (winning / closed.length) * 100 : 0;
      }

      // Bereken Totaal Resultaat (Profit)
      const totalProfit = m?.profit || (trades.length > 0 ? trades.reduce((acc, t) => acc + (t.profit || 0), 0) : 0);

        return {
          winRate: isNaN(winRate) ? 0 : winRate,
          profitFactor: m?.profitFactor || 0,
          totalTrades: m?.trades || trades.length || 0,
          averageWin: m?.averageWin || m?.bestTrade || 0,
          averageLoss: Math.abs(m?.averageLoss || m?.worstTrade || 0),
          maxDrawdown: (m?.maxDrawdown || m?.maxBalanceDrawdownRelative || m?.maxEquityDrawdownRelative || m?.drawdown || 0),
          deposits: m?.deposits || 0,
          withdrawals: Math.abs(m?.withdrawals || 0),
          totalProfit: totalProfit,
          balance: m?.balance || 0,
          equity: m?.equity || 0,
          dailyGrowth: days.map(d => ({
            date: d.date,
            profit: d.profit || 0,
            profitPercentage: d.profitPercentage || d.gains || 0,
            drawdown: d.drawdownPercentage || d.drawdown || 0
          })),
          trades: trades // Voeg de trades lijst toe!
        };
    } catch (e) {
      console.error('[MetaApi] Metrics Error:', e);
      return null;
    }
  }
};
