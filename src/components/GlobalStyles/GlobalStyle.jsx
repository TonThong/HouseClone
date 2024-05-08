import PropTypes from "prop-types";
import "./grid.css";
import "./GlobalStyles.scss";

function GlobalsStyles({ children }) {
  return children;
}

GlobalsStyles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalsStyles;
