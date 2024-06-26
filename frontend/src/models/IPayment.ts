import { BookingsInterface } from "./modelBooking/IBooking";
import { MemberInterface } from "./modelMember/IMember";

export interface PaymentsInterface {
    ID?: number ;
    MemberID?: number | null;
    Member?: MemberInterface;
    PaymentMethodID?: number | null;
    PaymentMethod?: PaymentMethodsInterface;
    MethodID?: number | null;
    Method?: MethodsInterface;
    Price?: number ;
    Time?: Date | null;
    Picture?: string | ArrayBuffer | null;

    BookingID?: number | null,
    Booking?: BookingsInterface,
}

export interface PaymentMethodsInterface {
    ID?: number,
    Name: string;
}

export interface MethodsInterface {
    ID?: number,
    Name: string,
    Destination: string,
    // Picture: string,
    // PaymentMethodID: number,
    // PaymentMethod: PaymentMethodsInterface;
}
