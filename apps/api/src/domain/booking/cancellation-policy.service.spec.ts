import { CancellationPolicyService } from './cancellation-policy.service'

describe('CancellationPolicyService', () => {
  const future = (hours: number) => new Date(Date.now() + hours * 3_600_000)

  it('allows free cancellation 72 hours before check-in', () => {
    const result = CancellationPolicyService.canCancel(future(72))
    expect(result.canCancel).toBe(true)
    expect(result.refundable).toBe(true)
  })

  it('allows free cancellation exactly 48 hours before check-in', () => {
    const result = CancellationPolicyService.canCancel(future(48.01))
    expect(result.canCancel).toBe(true)
    expect(result.refundable).toBe(true)
  })

  it('blocks cancellation 24 hours before check-in', () => {
    const result = CancellationPolicyService.canCancel(future(24))
    expect(result.canCancel).toBe(false)
    expect(result.refundable).toBe(false)
    expect(result.reason).toBeDefined()
  })

  it('blocks cancellation after check-in date has passed', () => {
    const yesterday = new Date(Date.now() - 25 * 3_600_000)
    const result    = CancellationPolicyService.canCancel(yesterday)
    expect(result.canCancel).toBe(false)
    expect(result.hoursUntilCheckIn).toBe(0)
  })

  it('returns 100% refund for cancellations outside the window', () => {
    expect(CancellationPolicyService.getRefundPercentage(future(72))).toBe(100)
  })

  it('returns 0% refund within 48 hours', () => {
    expect(CancellationPolicyService.getRefundPercentage(future(24))).toBe(0)
  })
})