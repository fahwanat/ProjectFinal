import { MemberInterface } from "./modelMember/IMember";

export interface ReviewInterface {

    ID: number;
    Comment: string;
	Star: number;
	Reviewdate: Date;
    Reviewimage: string;

    // entity
    MemberID : number;
    Member: MemberInterface;

    SystemworkID : number;
    Systemwork: SystemworkInterface;

   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
}

export interface SystemworkInterface {

    ID: number;
    Name: string;
//หลังบ้าน ไปเว็บ เว็บมา models
   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
}