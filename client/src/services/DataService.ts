import $api from "../http";
import { expenseOperation, incomeOperation, IUserData } from "../models/response/IUserData";

export default class DataService {
    static async update(userId: string, operation: expenseOperation | incomeOperation, type: 'expense' | 'income') {
        return $api.post<IUserData>('/update', { userId, operation, type })
    }
    static async changeCurrency(newCurrency: string, userId: string) {
        return $api.put<IUserData>('/changeCurrency', { newCurrency, userId})
    }

}