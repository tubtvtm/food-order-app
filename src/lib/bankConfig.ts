const BANK_CONFIG = {
  scb: {
    apiKey: process.env.SCB_API_KEY,
    apiSecret: process.env.SCB_API_SECRET,
    baseUrl: 'https://api.partners.scb/partners/sandbox',
    accountNo: process.env.SCB_ACCOUNT_NO
  },
  kbank: {
    apiKey: process.env.KBANK_API_KEY,
    apiSecret: process.env.KBANK_API_SECRET,
    baseUrl: 'https://openapi.kasikornbank.com/v2',
    accountNo: process.env.KBANK_ACCOUNT_NO
  },
  bangkok: {
    apiKey: process.env.BBL_API_KEY,
    apiSecret: process.env.BBL_API_SECRET,
    baseUrl: 'https://api.bangkokbank.com/sandbox',
    accountNo: process.env.BBL_ACCOUNT_NO
  }
}

export default BANK_CONFIG;