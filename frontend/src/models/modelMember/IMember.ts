import { GenderInterface } from "./IGender";
import { PrefixInterface } from "./IPrefix";

export interface MemberInterface {
  ID?: number;
  FirstName?: string;
  LastName?: string;
  Nickname?: string;
  Age?: number;
  Phone?: string;
  Line?: string;
  Password?: string;

  Gender?: GenderInterface;
  GenderID?: number;

  Prefix?: PrefixInterface;
  PrefixID?: number;


}
