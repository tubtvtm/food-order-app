const SCB_CONFIG = {
  apiKey: process.env.SCB_API_KEY,
  apiSecret: process.env.SCB_API_SECRET,
  billerId: process.env.SCB_BILLER_ID,
  merchantId: process.env.SCB_MERCHANT_ID,
  terminalId: process.env.SCB_TERMINAL_ID,
  accountTo: process.env.SCB_ACCOUNT_TO,
  callbackUrl: process.env.NEXTAUTH_URL + '/api/payment/callback',
  baseUrl: 'https://api.partners.scb/partners/sandbox'
}

export default SCB_CONFIG;