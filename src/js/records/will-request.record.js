import { WILL_REQUEST_STATES } from '@/js/const/will-statuses.const'
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

    this.recipient = record?.recipient
      ? new AccountRecord(record.recipient)
      : new AccountRecord({})
  }
}
