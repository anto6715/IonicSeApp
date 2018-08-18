export interface Message {

  date:Date,
  type:number,  // 0 se pubblico, 1 se privato
  emailSender:string;
  emailReceiver:string;  // 0 se tutti, altrimenti id destinatario
  msg:string;
  nameSender:string;
  nameReceiver:string;
  idReceiver:number;

}
