import {
  Controller, Post, Body, UseGuards,
  RawBodyRequest, Req, Headers, BadRequestException,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { Request } from 'express'
import { PaymentsService }   from './payments.service'
import { InitiateStripeDto } from './dto/initiate-stripe.dto'
import { InitiateMpesaDto }  from './dto/initiate-mpesa.dto'
import { JwtAuthGuard }      from '../auth/guards/jwt-auth.guard'
import { MpesaIpGuard }      from '../../common/guards/mpesa-ip.guard'

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('stripe/intent')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Stripe PaymentIntent' })
  stripeIntent(@Body() dto: InitiateStripeDto) {
    return this.payments.initiateStripe(dto.bookingId, dto.currency)
  }

  @Post('mpesa/initiate')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Initiate M-Pesa STK Push' })
  mpesaInitiate(@Body() dto: InitiateMpesaDto) {
    return this.payments.initiateMpesa(dto.bookingId, dto.phone)
  }

  @Post('webhook/stripe')
  @ApiOperation({ summary: 'Stripe webhook — signature verified internally' })
  stripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') sig: string,
  ) {
    if (!req.rawBody) throw new BadRequestException('No raw body')
    return this.payments.handleStripeWebhook(req.rawBody, sig)
  }

  /**
   * M-Pesa callback — IP-allowlisted in production.
   * Safaricom sandbox bypasses IP check (MPESA_ENVIRONMENT=sandbox).
   */
  @Post('webhook/mpesa')
  @UseGuards(MpesaIpGuard)
  @ApiOperation({ summary: 'M-Pesa callback — IP-allowlisted in production' })
  mpesaCallback(@Body() body: unknown) {
    return this.payments.handleMpesaCallback(body)
  }
}
EOF
cat "$REPO/apps/api/src/modules/payments/payments.controller.ts"
Output

import {
  Controller, Post, Body, UseGuards,
  RawBodyRequest, Req, Headers, BadRequestException,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { Request } from 'express'
import { PaymentsService }   from './payments.service'
import { InitiateStripeDto } from './dto/initiate-stripe.dto'
import { InitiateMpesaDto }  from './dto/initiate-mpesa.dto'
import { JwtAuthGuard }      from '../auth/guards/jwt-auth.guard'
import { MpesaIpGuard }      from '../../common/guards/mpesa-ip.guard'

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('stripe/intent')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Stripe PaymentIntent' })
  stripeIntent(@Body() dto: InitiateStripeDto) {
    return this.payments.initiateStripe(dto.bookingId, dto.currency)
  }

  @Post('mpesa/initiate')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Initiate M-Pesa STK Push' })
  mpesaInitiate(@Body() dto: InitiateMpesaDto) {
    return this.payments.initiateMpesa(dto.bookingId, dto.phone)
  }

  @Post('webhook/stripe')
  @ApiOperation({ summary: 'Stripe webhook — signature verified internally' })
  stripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') sig: string,
  ) {
    if (!req.rawBody) throw new BadRequestException('No raw body')
    return this.payments.handleStripeWebhook(req.rawBody, sig)
  }

  /**
   * M-Pesa callback — IP-allowlisted in production.
   * Safaricom sandbox bypasses IP check (MPESA_ENVIRONMENT=sandbox).
   */
  @Post('webhook/mpesa')
  @UseGuards(MpesaIpGuard)
  @ApiOperation({ summary: 'M-Pesa callback — IP-allowlisted in production' })
  mpesaCallback(@Body() body: unknown) {
    return this.payments.handleMpesaCallback(body)
  }
}