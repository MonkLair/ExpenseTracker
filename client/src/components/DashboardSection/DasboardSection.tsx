import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router"

interface DashboardSectionProps {
    sectionName: string,
    iconName: IconProp
}


export default function DashboardSection({ sectionName, iconName }: DashboardSectionProps) {
    const upperName = sectionName[0].toUpperCase() + sectionName.slice(1)
    return (
        <>
            <Link to={sectionName === 'main' ? '' : sectionName} className="section-link">
                <div className={`dashboard-section-${sectionName} dashboard-section`}>
                    <FontAwesomeIcon icon={iconName} className='section-icon' />
                    <span>{upperName}</span>
                </div>
            </Link>

        </>
    )
}
