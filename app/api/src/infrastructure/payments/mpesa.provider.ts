*// apps/api/src/infrastructure/payments/mpesa.provider.ts ===
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import type { MpesaPaymentProvider, StkPushResult } from './payment-provider.interface'

@Injectable()
export class MpesaProvider implements MpesaPaymentProvider {
  private readonly logger  = new Logger(MpesaProvider.name)
  private readonly baseUrl: string

  constructor(private readonly config: ConfigService) {
    const env    = config.get<string>('payment.mpesa.environment', 'sandbox')
    this.baseUrl = env === 'production'
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke'
  }

  async initiateStk(params: {
    phone:       string
    amount:      number
    accountRef:  string
    description: string
  }): Promise<StkPushResult> {
    const token     = await this.getAccessToken()
    const shortcode = this.config.get<string>('payment.mpesa.shortcode')
    const passkey   = this.config.get<string>('payment.mpesa.passkey')
    const callback  = this.config.get<string>('payment.mpesa.callbackUrl')

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14)
    const password  = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')
    const phone     = params.phone.replace(/^0/, '254').replace(/^\+/, '')

    const { data } = await axios.post(
      `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: shortcode,
        Password:          password,
        Timestamp:         timestamp,
        TransactionType:   'CustomerPayBillOnline',
        Amount:            params.amount,
        PartyA:            phone,
        PartyB:            shortcode,
        PhoneNumber:       phone,
        CallBackURL:       callback,
        AccountReference:  params.accountRef,
        TransactionDesc:   params.description,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )

    return {
      checkoutRequestId: data.CheckoutRequestID,
      merchantRequestId: data.MerchantRequestID,
      customerMessage:   data.CustomerMessage,
      raw:               data,
    }
  }

  private async getAccessToken(): Promise<string> {
    const key    = this.config.get<string>('payment.mpesa.consumerKey')
    const secret = this.config.get<string>('payment.mpesa.consumerSecret')
    const cred   = Buffer.from(`${key}:${secret}`).toString('base64')

    const { data } = await axios.get(
      `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      { headers: { Authorization: `Basic ${cred}` } },
    )
    return data.access_token
  }
}