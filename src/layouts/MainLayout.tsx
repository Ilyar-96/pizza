import { Header } from '../components';
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<>
			<Header />
			<div className="content">
				<Outlet />
			</div>
		</>
	)
}

export default MainLayout;