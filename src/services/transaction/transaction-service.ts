import { AxiosInstance } from "axios";
import { ApiResponse, ITransaction, Page, PaginationParams, SortParams, TransactionFilterCriteria } from "../../interfaces";
import { createApiClient } from "../api-client";

interface ITransactionService {
    getTransactions(
        pagination: PaginationParams,
        filter: TransactionFilterCriteria,
        sort?: SortParams,
    ): Promise<ApiResponse<Page<ITransaction>>>;
    update(
        transactionId: number,
        updatedTransaction: ITransaction,
    ): Promise<ApiResponse<ITransaction>>;
}

const apiClient: AxiosInstance = createApiClient("transactions");

class TransactionService implements ITransactionService {
    async getTransactions(
        pagination: PaginationParams,
        filter?: TransactionFilterCriteria,
        sort?: SortParams,
    ): Promise<ApiResponse<Page<ITransaction>>> {
        return (
            await apiClient.get("", {
                params: {
                    ...pagination,
                    ...filter,
                    sortBy: sort?.sortBy !== "" ? sort?.sortBy : undefined,
                    direction: sort?.direction !== "" ? sort?.direction : undefined,
                },
            })
        ).data;
    }

    async update(
        transactionId: number,
        updatedTransaction: ITransaction,
    ): Promise<ApiResponse<ITransaction>> {
        return (await apiClient.put(`/${transactionId}`, updatedTransaction)).data;
    }
}

export const transactionService = new TransactionService();
