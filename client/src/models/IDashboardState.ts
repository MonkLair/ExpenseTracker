
export type currentActiveTypes = 'Main' | 'Calendar' | 'Settings' | 'Profile' | 'Logout' | 'Expense' | 'Income'

export interface DashboardState {
    currentActive: currentActiveTypes
    
}