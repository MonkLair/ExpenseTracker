import { Outlet } from "react-router"
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
        document.querySelector(`.dashboard-section-${currentActive[0].toLowerCase() + currentActive.slice(1)}`)?.classList.add('active');
    }, [currentActive])




    return (
        <>
            <div className="dashboard-sidebar-menu">
                <div className="dashboard-side-item">
                    <img className="sidebar-logo" src={logoSidebarURL} alt="" />
                </div>
                <div className="dashboard-side-item">
                    <img className="user-logo" src={logoUserURL} alt="" />
                    <span>{user
                        ? user.name
                        : 'Guest'
                    }</span>
                </div>
                <div className="dashboard-side-item">
                    <DashboardSection sectionName="main" iconName={faHouse} />

                    <DashboardSection sectionName="expense" iconName={faDollarSign} />

                    <DashboardSection sectionName="income" iconName={faMoneyBill} />

                    <DashboardSection sectionName="calendar" iconName={faCalendarDays} />

                    <DashboardSection sectionName="settings" iconName={faGear} />

                    <DashboardSection sectionName="profile" iconName={faUser} />

                    <DashboardSection sectionName="logout" iconName={faRightFromBracket} />

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
