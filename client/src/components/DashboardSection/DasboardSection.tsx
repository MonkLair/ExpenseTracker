import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router"
import { useAppDispatch } from "../../hooks/redux"
import { dashboardSlice } from "../../modules/DashboardLayout"
import { currentActiveTypes } from "../../models/IDashboardState"
import { useEffect } from "react"
import { useLocation } from "react-router"

interface DashboardSectionProps {
    sectionName: currentActiveTypes,
    iconName: IconProp
}


export default function DashboardSection({ sectionName, iconName }: DashboardSectionProps) {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const currentLocation = location.pathname.split('/')[2][0].toUpperCase() + location.pathname.split('/')[2].slice(1) as currentActiveTypes

    useEffect(() => {
        dispatch(setCurrentPage(currentLocation))
    }, [])
    
    const { setCurrentPage } = dashboardSlice.actions
    return (
        <>
            <Link
                to={sectionName.toLowerCase()}
                className="section-link"
                onClick={() => dispatch(setCurrentPage(sectionName))}
            >
                <div className={`dashboard-section-${sectionName} dashboard-section`}>
                    <FontAwesomeIcon icon={iconName} className='section-icon' />
                    <span>{sectionName}</span>
                </div>
            </Link>

        </>
    )
}
