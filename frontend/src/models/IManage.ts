import { ServiceTypeInterface } from "./IService";
export interface EmployeeInterface {

    ID: number,
    PersonalID: string,
    Employeename: string,
    Email: string,
    Tusername: string,
    Password: string,
    Salary: number,
    Phonenumber: string,
    Gender: string,

    // entity
    OfficerID : number,
    Officer: OfficerInterface,

    DepartmentID : number,
    Department: DepartmentInterface,

    PositionID : number,
    Position: PositionInterface,

    ServiceTypeID:   number,
	ServiceType:     ServiceTypeInterface,



   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
}

export interface OfficerInterface {

    ID: number,
    Officername: string,

   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
}

export interface DepartmentInterface {

    ID: number,
    Name: string,
//หลังบ้าน ไปเว็บ เว็บมา models
   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
}

export interface PositionInterface {

    ID: number,
    Name: string,
//หลังบ้าน ไปเว็บ เว็บมา models
   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
}
