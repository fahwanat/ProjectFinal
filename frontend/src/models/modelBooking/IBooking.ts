//import { BranchsInterface } from "./IBranch"
import { MemberInterface } from "../modelMember/IMember"
import { ServiceTypeInterface, ServiceInterface, TimeServiceInterface } from "../IService"
import { EmployeeInterface } from "../IManage"
import { Dayjs } from "dayjs"

export interface BookingsInterface {
    ID?: number,

    Booking_Number?: string,
    Tx_No?: string,
    Total?: number, 
    BookingDate?: Dayjs| null,

    EmployeeID?: number,
    Employee?: EmployeeInterface,

    ServiceTypeID?: number,
    ServiceType?: ServiceTypeInterface,

    ServiceID?: number,
    Service?: ServiceInterface,

    TimeServiceID?: number,
    TimeService?: TimeServiceInterface,

    MemberID?: number,
    Member?: MemberInterface,
}