import RecentOrders from "../../components/admin/RecentOrders"
import StatsCards from "../../components/admin/StatsCards"

const Dashboard = () => {
  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
        <div className="px-4 grid gap-3 grid-cols-12 mt-6 p-5">
            <StatsCards />
            <RecentOrders/>
        </div>
    </div>
  )
}

export default Dashboard