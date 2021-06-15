import { WILL_REQUEST_STATES } from '@/js/const/will-request-states.const'
import { AccountRecord } from '@/js/records/account.record'

export class WillRequestRecord {
  constructor (record) {
    this._record = record

    this.id = record?.id || ''
    this.documentHash = record?.documentHash || ''
    this.documentLink = record?.documentLink || ''
    this.statusId = record?.statusId || WILL_REQUEST_STATES.submitted

    this.creator = record?.creator
      ? new AccountRecord(record.creator)
      : new AccountRecord({})

    this.recipients = record?.recipient
      ? record.recipient.map(i => new AccountRecord(i))
      : []
  }

  get isStatusSubmitted () {
    return +this.statusId === WILL_REQUEST_STATES.submitted
  }

  get isStatusNotified () {
    return +this.statusId === WILL_REQUEST_STATES.notified
  }

  get isStatusApproved () {
    return +this.statusId === WILL_REQUEST_STATES.approved
  }

  get isStatusDeleted () {
    return +this.statusId === WILL_REQUEST_STATES.deleted
  }

  get isManageable () {
    return this.isStatusSubmitted ||
      this.isStatusNotified ||
      this.isStatusApproved
  }
}
