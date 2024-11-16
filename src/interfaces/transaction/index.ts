import { TransactionStatus } from './../common/enums/index';

export interface IPaymentMethod {
    paymentMethodId: number;
    paymentMethodName: string;
    createdAt: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface ITransaction {
    transactionId: number;
    paymentMethod: IPaymentMethod;
    amount: number;
    createdAt: string;
    updatedAt?: string;
    passengerName: string;
    bookingCode: string;
    status: TransactionStatus;
    txnRef: string;

}
export interface PaymentMethodFilterCriteria {
    query?: string;
}


export interface TransactionFilterCriteria {
    query?: string;
    status?: TransactionStatus;
    startDate?: string;
    endDate?: string;
    type?: string;
}

