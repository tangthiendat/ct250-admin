import Access from "../features/auth/Access";
import AddPaymentMethod from "../features/transaction/payment-method/AddPaymentMethod";
import PaymentMethodsTable from "../features/transaction/payment-method/PaymentMethodTable";
import { Module, PERMISSIONS } from "../interfaces";

const PaymentMethods: React.FC = () => {
  return (
    <Access permission={PERMISSIONS[Module.PAYMENT_METHODS].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Phương thức thanh toán</h2>
          <Access
            permission={PERMISSIONS[Module.PAYMENT_METHODS].CREATE}
            hideChildren
          >
            <AddPaymentMethod />
          </Access>
        </div>
        <PaymentMethodsTable />
      </div>
    </Access>
  );
};

export default PaymentMethods;
