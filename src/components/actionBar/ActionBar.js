//@flow
import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import ModalRoute from "../ModalRoute";
import AccountCreation from "../accounts/creation/AccountCreation";
import colors from "shared/colors";
import SettingsModal from "../SettingsModal";
import { withStyles } from "material-ui/styles";
import Plus from "../icons/full/Plus";
import Share from "../icons/full/Share";
import Settings from "../icons/full/Settings";
import Bell from "../icons/full/Bell";

import logo from "assets/img/logo.png";
import logo2x from "assets/img/logo@2x.png";
import logo3x from "assets/img/logo@3x.png";

const styles = {
  base: {
    height: "200px",
    background: colors.night,
    color: "white",
    position: "relative"
  },
  header: {
    marginLeft: "280px",
    padding: "54px 38px 0 0"
  },
  header_left: {
    float: "left"
  },
  actions: {
    float: "right",
    margin: "-7px -13px",
    "& a": {
      display: "inline-block",
      textDecoration: "none",
      textTransform: "uppercase",
      textAlign: "center",
      fontWeight: "600",
      fontSize: "11px",
      color: "white",
      margin: "0 14px",
      opacity: ".5",
      "&:hover": {
        opacity: "1"
      }
    }
  },
  icon: {
    width: 16,
    fill: "white",
    marginBottom: 5
  }
};

const NewAccountLink = withStyles(styles)(({ classes }) => (
  <Link to="/dashboard/new-account">
    <Plus className={classes.icon} />
    <div className="content-header-button-text">account</div>
  </Link>
));

class Logo extends PureComponent<*> {
  n = -9;
  render() {
    return (
      <img
        onClick={e => {
          Object.assign(e.target.style, {
            transition: "1s",
            transform: "skew(" + 36000 * (Math.max(this.n++, 0) % 2) + "deg)"
          });
        }}
        src={logo}
        srcSet={`${logo2x} 2x, ${logo3x} 3x`}
        alt="Ledger Vault logo"
      />
    );
  }
}

class ActionBar extends Component<{
  location: Object,
  classes: Object
}> {
  static contextTypes = {
    translate: PropTypes.func.isRequired
  };
  context: {
    translate: string => string
  };
  render() {
    const { location, classes } = this.props;
    // FIXME introduce a component for i18n
    const t = this.context.translate;

    return (
      <div className={classes.base}>
        <ProfileCard />
        <ModalRoute path="*/new-account" component={AccountCreation} />
        <ModalRoute
          path="*/settings"
          component={SettingsModal}
          undoAllHistoryOnClickOutside
        />

        <div className={classes.header}>
          <div className={classes.header_left}>
            <Logo />
          </div>
          <div className={classes.actions}>
            <Route path="/dashboard" component={NewAccountLink} />
            <Link to="/export">
              <Share className={classes.icon} />
              <div className="content-header-button-text">
                {t("actionBar.export")}
              </div>
            </Link>
            <Link
              to={location.pathname + "/settings"}
              className="content-header-button"
            >
              <Settings className={classes.icon} />
              <div className="content-header-button-text">
                {t("actionBar.settings")}
              </div>
            </Link>
            <Link to="/activity" className="content-header-button">
              <Bell className={classes.icon} />
              <div className="content-header-button-text">
                {t("actionBar.activity")}
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ActionBar));
