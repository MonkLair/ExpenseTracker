import imgURL from '../../assets/favicon.ico'


export default function DashboardFooter() {
  return (
    <>
        <footer className="dashboard-footer">
            <div className="copyright-block">
                <span>Expense Tracker</span>
                <img style={{height: '25px'}} src={imgURL} alt="" />
                <span>Copyright © 2025</span>
            </div>
            <div className="version-block">
                <span>ver.0.1.0</span>
            </div>
        </footer>
    </>
  )
}
