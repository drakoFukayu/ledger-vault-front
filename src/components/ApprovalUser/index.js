//@flow
import React from "react";
import MemberAvatar from "../MemberAvatar";
import ValidateBadge from "../icons/full/ValidateBadge";
import Question from "../icons/full/Question";
import type { Member } from "data/types";
import { withStyles } from "material-ui/styles";
import colors from "shared/colors";

const styles = {
  base: {
    borderBottom: `1px solid ${colors.argile}`,
    textAlign: "center",
    position: "relative",
    display: "inline-block",
    width: "85px",
    height: "115px",
    margin: "15px",
    paddingBottom: "40px",
    verticalAlign: "middle"
  },
  status: {
    position: "relative",
    marginBottom: "12px"
  },
  name: {
    display: "block",
    color: "black",
    marginBottom: "4px",
    fontSize: "13px"
  },
  hasApproved: {
    margin: "0",
    fontSize: "11px",
    color: colors.lead
  },
  validated: {
    borderRadius: "50%",
    position: "absolute",
    top: "20px",
    left: "50px",
    width: "11px",
    height: "11px",
    fill: colors.ocean
  },
  pending: {
    borderRadius: "50%",
    position: "absolute",
    left: "50px",
    boxSizing: "content-box",
    width: "11px",
    height: "11px",
    fill: colors.mouse,
    border: "2px solid white",
    top: "17px"
  }
};
function Approvalmember(props: {
  member: Member,
  isApproved: boolean,
  classes: Object
}) {
  const { member, isApproved, classes } = props;

  const name = member.first_name + " " + member.last_name;
  let slice;
  if (name.length > 10) {
    slice = name.slice(0, 10) + "...";
  } else {
    slice = name;
  }
  return (
    <div className={classes.base}>
      <div className={classes.status}>
        <MemberAvatar url={member.picture} />
        {isApproved ? (
          <ValidateBadge className={classes.validated} />
        ) : (
          <Question className={classes.pending} color="#cccccc" />
        )}
      </div>

      <span className={classes.name}>{slice}</span>
      {isApproved ? (
        <span className={classes.hasApproved}>Approve</span>
      ) : (
        <span className={classes.hasApproved}>Pending</span>
      )}
    </div>
  );
}

export default withStyles(styles)(Approvalmember);
