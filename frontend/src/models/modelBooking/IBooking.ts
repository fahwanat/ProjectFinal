//import { BranchsInterface } from "./IBranch"
import { MemberInterface } from "../modelMember/IMember"
import { ServiceInterface } from "../IService"
import { EmployeeInterface } from "../IManage"
import { TimeBookingInterface } from "./ITimeBooking"
import { Dayjs } from "dayjs"

export interface BookingsInterface {
    ID?: number,

    Booking_Number?: string,
    Tx_No?: string,
    Total?: number, 
			
	EmployeeID?: number,
    Employee?: EmployeeInterface,

    ServiceID?: number,
    Service?: ServiceInterface,

	BookingDate?: Dayjs| null,

	TimeBookingID?: number,
    TimeBooking?: TimeBookingInterface,

    MemberID?: number,
    Member?: MemberInterface,

    
	TotalAmount?: number,
			
}