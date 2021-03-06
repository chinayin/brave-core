declare namespace RewardsExtension {
  interface State {
    currentNotification?: string
    notifications: Record<number, Notification>
    publishers: Record<string, Publisher>
    report: Report
    grant?: GrantInfo
    walletCreated: boolean
    walletCreateFailed: boolean
    walletProperties: WalletProperties
  }

  interface ApplicationState {
    rewardsPanelData: State | undefined
  }

  interface ComponentProps {
    actions: any
    rewardsPanelData: State
  }

  interface Publisher {
    excluded: boolean
    favicon_url: string
    publisher_key: string
    name: string
    percentage: number
    provider: string
    url: string
    verified: boolean
  }

  export interface Grant {
    altcurrency: string
    probi: string
    expiryTime: number
  }

  export type GrantStatus = 'wrongPosition' | 'grantGone' | 'generalError' | 'grantAlreadyClaimed' | number | null

  export interface GrantInfo {
    promotionId?: string
    altcurrency?: string
    probi: string
    expiryTime: number
    captcha?: string
    hint?: string
    status?: GrantStatus
  }

  export interface GrantFinish {
    result: Result,
    statusCode: number,
    expiryTime: number
  }

  export enum Result {
    LEDGER_OK = 0,
    LEDGER_ERROR = 1,
    NO_PUBLISHER_STATE = 2,
    NO_LEDGER_STATE = 3,
    INVALID_PUBLISHER_STATE = 4,
    INVALID_LEDGER_STATE = 5,
    CAPTCHA_FAILED = 6,
    NO_PUBLISHER_LIST = 7,
    TOO_MANY_RESULTS = 8,
    NOT_FOUND = 9,
    REGISTRATION_VERIFICATION_FAILED = 10,
    BAD_REGISTRATION_RESPONSE = 11,
    WALLET_CREATED = 12,
    GRANT_NOT_FOUND = 13
  }

  export interface Captcha {
    image: string
    hint: string
  }

  export interface WalletProperties {
    balance: number
    probi: string
    rates: Record<string, number>
    grants?: Grant[]
  }

  export interface Report {
    ads: string
    closing: string
    contribute: string
    deposit: string
    donation: string
    grant: string
    tips: string
    opening: string
    total: string
  }

  export interface Notification {
    id: string
    type: number
    timestamp: number
    args: string[]
  }
}
