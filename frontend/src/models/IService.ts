import { EmployeeInterface } from "./IManage";
import { MemberInterface } from "./modelMember/IMember";

export interface ServiceInterface {
    ID: number;
	Name:   string; 
	Time?: Date | null;
	Price: number   ;

	MemberID?: number | null;
   Member?: MemberInterface;

	EmployeeID?: number | null;
    Employee?: EmployeeInterface;

}
