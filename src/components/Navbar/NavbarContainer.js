import {connect} from "react-redux";
import Navbar from "./Navbar";


const mapStateToProps = (state) => {
	return {
		friends: state.navbar.friends
	};
};

export default connect(mapStateToProps)(Navbar);
