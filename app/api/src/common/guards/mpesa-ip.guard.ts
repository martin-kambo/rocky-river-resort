import {
  Injectable, CanActivate, ExecutionContext,
  ForbiddenException, Logger,
} from '@nestjs/common'

/**
 * MpesaIpGuard — validates that M-Pesa callbacks originate from
 * Safaricom's documented IP ranges.
 *
 * Sources:
 *   https://developer.safaricom.co.ke/APIs/MpesaExpressSimulate
 *   Safaricom IP ranges published in Daraja portal documentation
 *
 * Sandbox mode: bypass IP check (Safaricom sandbox uses dynamic IPs)
 * Production mode: enforce allowlist
 *
 * To update: add new IPs to SAFARICOM_IPS when Safaricom publishes changes.
 */
@Injectable()
export class MpesaIpGuard implements CanActivate {
  private readonly logger = new Logger(MpesaIpGuard.name)

  /**
   * Safaricom production IP ranges (as of 2025).
   * Verify against https://developer.safaricom.co.ke before going live.
   */
  private static readonly SAFARICOM_IPS = new Set([
    '196.201.214.200',
    '196.201.214.206',
    '196.201.213.114',
    '196.201.214.207',
    '196.201.214.208',
    '196.201.213.44',
    '196.201.212.127',
    '196.201.212.138',
    '196.201.212.129',
    '196.201.212.136',
    '196.201.212.74',
    '196.201.212.69',
  ])

  canActivate(context: ExecutionContext): boolean {
    // Skip IP check in sandbox — Safaricom sandbox uses dynamic IPs
    if (process.env.MPESA_ENVIRONMENT !== 'production') {
      return true
    }

    const req = context.switchToHttp().getRequest()

    // Respect proxy headers if behind a load balancer (Render uses proxies)
    const forwarded = req.headers['x-forwarded-for'] as string | undefined
    const ip = forwarded
      ? forwarded.split(',')[0].trim()
      : req.ip ?? req.connection?.remoteAddress ?? ''

    if (!MpesaIpGuard.SAFARICOM_IPS.has(ip)) {
      this.logger.warn(`M-Pesa callback rejected from unauthorized IP: ${ip}`)
      throw new ForbiddenException('Unauthorized callback source')
    }

    this.logger.log(`M-Pesa callback accepted from ${ip}`)
    return true
  }
}