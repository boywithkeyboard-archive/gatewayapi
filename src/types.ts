type CountryPrice = {
  country: string
  country_name: string
  dkk: number
  effective_date: string
  eur: number
  prefix: number
}

export type Prices = {
  premium: CountryPrice[]
  standard: CountryPrice[]
}

export type FormattedResponse<T> =
  | {
    error: {
      code: number
      reason: unknown
    }
    data?: undefined
  }
  | {
    error?: undefined
    data: T
  }

export type AccountBalance = {
  /** The remaining credit. */
  credit: number
  /** The currency of your credit. */
  currency: string
  /** The ID of your account. */
  id: number
}

export type MessageSendingResult = {
  ids: number[]
  usage: {
    countries: Record<string, number>
    currency: string
    total_cost: number
  }
}
