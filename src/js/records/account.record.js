import { USER_ROLES } from '@/js/const/user-roles.const'

export class AccountRecord {
  constructor (record) {
    this._record = record

    this.id = record?.id || ''
    this.email = record?.email || ''
    this.role = record?.role || USER_ROLES.general
    this.address = record?.address || ''
    this.firstName = record?.firstName || ''
    this.middleName = record?.middleName || ''
    this.lastName = record?.lastName || ''
    this.passportNumber = record?.passportNumber || ''
  }

  get fullName () {
    return `${this.firstName} ${this.middleName} ${this.lastName}`
  }

  get isKycExist () {
    return Boolean(
      this.address &&
      this.firstName &&
      this.middleName &&
      this.lastName &&
      this.passportNumber,
    )
  }
}
