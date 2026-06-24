import { Link, Outlet } from "react-router"
import { useEffect } from "react"
import { faBars, faBriefcase, faCalendarDays, faDollarSign, faGear, faHouse, faMoneyBill, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons"
import logoSidebarURL from '../../../assets/logo-sidebar.png'
import logoUserURL from '../../../assets/user.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAppSelector } from "../../../hooks/redux"
import DashboardSection from "../../../components/DashboardSection/DasboardSection"


export function DashboardLayout() {
    const { user } = useAppSelector(state => state.authReducer)

    const { currentActive } = useAppSelector(state => state.dashboardReducer)
    useEffect(() => {
        document.querySelector('.active')?.classList.remove('active');
        document.querySelector(`.dashboard-section-${currentActive}`)?.classList.add('active');
    }, [currentActive])

    return (
        <>
            <div className="dashboard-sidebar-menu">
                <div className="dashboard-side-item">
                    <Link to='/'><img className="sidebar-logo" src={logoSidebarURL} alt="" /></Link>
                </div>
                <div className="dashboard-side-item">
                    <img className="user-logo" src={logoUserURL} alt="" />
                    <span>{user
                        ? user.name
                        : 'Guest'
                    }</span>
                </div>
                <div className="dashboard-side-item">
                    <DashboardSection sectionName="Main" iconName={faHouse} />

                    <DashboardSection sectionName="Expense" iconName={faDollarSign} />

                    <DashboardSection sectionName="Income" iconName={faMoneyBill} />

                    <DashboardSection sectionName="Calendar" iconName={faCalendarDays} />

                    <DashboardSection sectionName="Settings" iconName={faGear} />

                    <DashboardSection sectionName="Profile" iconName={faUser} />

                    <DashboardSection sectionName="Logout" iconName={faRightFromBracket} />

                </div>
            </div>
            <div className="dashboard-main-menu">
                <div className="gradient-bar">
                    <FontAwesomeIcon icon={faBars} />
                    <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <Outlet />
            </div>
        </>
    )
}
