export interface Trade {
  tradeID: string
  portfolioID: string
  securityID: string
  securityIDType: string
  tradeTime: number
  accruedInterest: number
  price: number
  currency: string
  commission: number
  quantity: number
  description: string
}

export interface Portfolio {
  portfolioID: string
  portfolioName: string
  username: string
  currency: string
  description: string
  cashBalances: CashBalance[]
}

export interface CashBalance {
  cashBalanceID: CashBalanceID
  quantity: number
}

export interface CashBalanceID {
  portfolioID: string
  currency: string
}

export interface InitializationResponse {
  portfolios: Portfolio[]
  activePortfolio: number
  trades: Trade[]
}
