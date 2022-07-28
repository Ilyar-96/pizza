import { FC } from "react";
import ContentLoader from "react-content-loader";

const Skeleton: FC = () => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={459}
		viewBox="0 0 280 459"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<rect x="0" y="322" rx="6" ry="6" width="280" height="79" />
		<rect x="0" y="419" rx="3" ry="3" width="90" height="31" />
		<rect x="130" y="416" rx="18" ry="18" width="150" height="40" />
		<circle cx="135" cy="126" r="124" />
		<rect x="257" y="272" rx="0" ry="0" width="1" height="0" />
		<rect x="0" y="280" rx="9" ry="9" width="280" height="19" />
	</ContentLoader>
)

export default Skeleton;