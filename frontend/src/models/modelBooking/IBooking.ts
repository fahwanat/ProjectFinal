//import { BranchsInterface } from "./IBranch"
import { MemberInterface } from "../modelMember/IMember"
import { ServiceInterface } from "../IService"
import { EmployeeInterface } from "../IManage"
import { Dayjs } from "dayjs"

export interface BookingsInterface {
    ID?: number,

    EmployeeID?: number,
    Employee?: EmployeeInterface,

    ServiceID?: number,
    Service?: ServiceInterface,

    Time?: Date | null ,
    // Time?: Dayjs | null ,
    //Stop?: Date | null,

    // Auto generate in backend
    Booking_Number?: string,
    Tx_No?: string,
    Total?: number, // TypeScript's number type represents a floating-point number and can store integers and floating-point numbers.
    //DayEech?: Date | null,
    TotalAmount?: number,
    Num_Of_Day?: number,
    // Auto generate in backend

    MemberID?: number,
    Member?: MemberInterface,
}