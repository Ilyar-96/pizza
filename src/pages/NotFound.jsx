import { Link } from "react-router-dom";
import NotFoundBlock from '../components/NotFoundBlock';

const NotFound = () => {
	return (
		<div className="not-found" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, padding: '100px 0' }}>
			<NotFoundBlock />
			<Link to="/" className="button">Вернуться на главную</Link>
		</div>
	)
}

export default NotFound;