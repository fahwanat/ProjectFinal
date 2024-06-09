import { PaymentMethodsInterface, PaymentsInterface } from "../IPayment"
import { EmployeeInterface } from "../IManage"
import { CHK_PaymentStatusesInterface } from "./IStatus"

export interface CHK_PaymentsInterface {
    ID?: number,
    PaymentID?: number,
    Payment?: PaymentsInterface,

    CHK_PaymentStatusID?: number,
    CHK_PaymentStatus?: CHK_PaymentStatusesInterface,

    Date_time?: Date | null,
    Amount?: number,
    Description?: string,

    EmployeeID?: number | null,
    Employee?: EmployeeInterface,

    PaymentMethodID?: number | null;
    PaymentMethod?: PaymentMethodsInterface;
}