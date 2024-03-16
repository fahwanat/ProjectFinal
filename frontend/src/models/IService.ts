// import { EmployeeInterface } from "./IManage";
import { MemberInterface } from "./modelMember/IMember";

export interface ServiceTypeInterface {
	ID: number,
	Name: string,	
}

export interface ServiceInterface {
    ID: number;
	Service_Name: string
	Price:	number,
	
	ServiceTypeID:   number,
	ServiceType:     ServiceTypeInterface,

	MemberID: number | null,
    Member: MemberInterface,

	// EmployeeID?: number | null;
    // Employee?: EmployeeInterface;

}

export interface TimeServiceInterface {
	ID: number,
	Start_End: string,
	
	ServiceID: number,
	Service:  ServiceInterface,
}

