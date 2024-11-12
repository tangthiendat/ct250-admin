export interface IPaymentMethod {
    paymentMethodId: number;
    paymentMethodName: string;
    createdAt: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface PaymentMethodFilterCriteria {
    query?: string;
}

