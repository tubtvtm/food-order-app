import BANK_CONFIG from '@/lib/bankConfig'

interface Transaction {
  amount: number
  datetime: string
  reference: string
}

class BankApiService {
  async checkSCBPayment(amount: number): Promise<boolean> {
    try {
      const token = await this.getSCBToken()
      const transactions = await this.fetchSCBTransactions(token)
      return this.findMatchingTransaction(transactions, amount)
    } catch (error) {
      console.error('SCB check failed:', error)
      return false
    }
  }

  async checkKBankPayment(amount: number): Promise<boolean> {
    try {
      const token = await this.getKBankToken()
      const transactions = await this.fetchKBankTransactions(token)
      return this.findMatchingTransaction(transactions, amount)
    } catch (error) {
      console.error('KBank check failed:', error)
      return false
    }
  }

  async checkBangkokBankPayment(amount: number): Promise<boolean> {
    try {
      const token = await this.getBangkokBankToken()
      const transactions = await this.fetchBangkokBankTransactions(token)
      return this.findMatchingTransaction(transactions, amount)
    } catch (error) {
      console.error('Bangkok Bank check failed:', error)
      return false
    }
  }

  private async getSCBToken(): Promise<string> {
    const response = await fetch(`${BANK_CONFIG.scb.baseUrl}/api/v1/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'resourceOwnerId': BANK_CONFIG.scb.apiKey,
        'requestUId': Date.now().toString(),
      },
      body: JSON.stringify({
        applicationKey: BANK_CONFIG.scb.apiKey,
        applicationSecret: BANK_CONFIG.scb.apiSecret
      })
    })

    if (!response.ok) throw new Error('Failed to get SCB token')
    const { data: { accessToken } } = await response.json()
    return accessToken
  }

  private async getKBankToken(): Promise<string> {
    const response = await fetch(`${BANK_CONFIG.kbank.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': BANK_CONFIG.kbank.apiKey,
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: BANK_CONFIG.kbank.apiKey,
        client_secret: BANK_CONFIG.kbank.apiSecret
      })
    })

    if (!response.ok) throw new Error('Failed to get KBank token')
    const { access_token } = await response.json()
    return access_token
  }

  private async getBangkokBankToken(): Promise<string> {
    const response = await fetch(`${BANK_CONFIG.bangkok.baseUrl}/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: BANK_CONFIG.bangkok.apiKey,
        apiSecret: BANK_CONFIG.bangkok.apiSecret
      })
    })

    if (!response.ok) throw new Error('Failed to get Bangkok Bank token')
    const { access_token } = await response.json()
    return access_token
  }

  private async fetchSCBTransactions(token: string): Promise<Transaction[]> {
    const response = await fetch(`${BANK_CONFIG.scb.baseUrl}/api/v1/payment/billpayment/transactions`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
        'resourceOwnerId': BANK_CONFIG.scb.apiKey,
        'requestUId': Date.now().toString(),
      }
    })

    if (!response.ok) throw new Error('Failed to fetch SCB transactions')
    const { data } = await response.json()
    return data.map((tx: any) => ({
      amount: tx.amount,
      datetime: tx.transactionDateTime,
      reference: tx.transactionId
    }))
  }

  private async fetchKBankTransactions(token: string): Promise<Transaction[]> {
    const response = await fetch(`${BANK_CONFIG.kbank.baseUrl}/accounts/${BANK_CONFIG.kbank.accountNo}/transactions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })

    if (!response.ok) throw new Error('Failed to fetch KBank transactions')
    const { transactions } = await response.json()
    return transactions.map((tx: any) => ({
      amount: tx.amount,
      datetime: tx.transactionDateTime,
      reference: tx.transactionId
    }))
  }

  private async fetchBangkokBankTransactions(token: string): Promise<Transaction[]> {
    const response = await fetch(`${BANK_CONFIG.bangkok.baseUrl}/accounts/${BANK_CONFIG.bangkok.accountNo}/transactions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })

    if (!response.ok) throw new Error('Failed to fetch Bangkok Bank transactions')
    const { transactions } = await response.json()
    return transactions.map((tx: any) => ({
      amount: tx.amount,
      datetime: tx.dateTime,
      reference: tx.reference
    }))
  }

  private findMatchingTransaction(transactions: Transaction[], amount: number): boolean {
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000)
    return transactions.some(tx => 
      tx.amount === amount && 
      new Date(tx.datetime).getTime() > fiveMinutesAgo
    )
  }
}

export const bankApi = new BankApiService();