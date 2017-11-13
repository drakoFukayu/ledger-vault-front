//@flow
import _ from "lodash";
import React, { Component } from "react";
import ModalLoading from "../../components/ModalLoading";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { DialogButton, Overscroll } from "../";
import TabDetails from "./TabDetails";
import TabOverview from "./TabOverview";
import TabLabel from "./TabLabel";
import "./OperationDetails.css";
import connectData from "../../restlay/connectData";
import OperationQuery from "../../api/queries/OperationQuery";
import AccountQuery from "../../api/queries/AccountQuery";
import ProfileQuery from "../../api/queries/ProfileQuery";
import type { Operation, Account, Note, Member } from "../../data/types";

class OperationDetails extends Component<
  {
    profile: Member,
    account: Account,
    operation: Operation,
    tabsIndex: *,
    close: Function,
    history: *
  },
  { note: Note }
> {
  constructor({ profile }) {
    super();
    const note: Note = {
      author: profile,
      id: "",
      title: "",
      body: "",
      created_at: new Date().toUTCString()
    };
    // FIXME why is this inlined in a state?
    this.state = {
      note
    };
  }

  contentNode: *;

  handleChangeTitle = val => {
    const newNote = _.cloneDeep(this.state.note);
    newNote.title = val;
    this.setState({
      note: newNote
    });
  };

  close = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    const { operation } = this.props;
    if (operation && operation.notes && operation.notes.length > 0) {
      this.setState({
        note: operation.notes[0]
      });
    }
  }

  render() {
    const { operation, account } = this.props;
    return (
      <Tabs
        className="operation-details wrapper"
        defaultIndex={this.props.tabsIndex}
        onSelect={() => {}}
      >
        <div className="header">
          <h2>{"Operation's details"}</h2>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Details</Tab>
            <Tab>Label</Tab>
          </TabList>
        </div>
        <div
          className="content"
          ref={node => {
            this.contentNode = node;
          }}
        >
          <TabPanel className="tabs_panel">
            <TabOverview operation={operation} account={account} />
          </TabPanel>
          <TabPanel className="tabs_panel">
            <Overscroll>
              <TabDetails operation={operation} />
            </Overscroll>
          </TabPanel>
          <TabPanel className="tabs_panel">
            <TabLabel
              note={this.state.note}
              changeTitle={this.handleChangeTitle}
            />
          </TabPanel>
        </div>
        <div className="footer">
          <DialogButton highlight right onTouchTap={this.props.close}>
            Done
          </DialogButton>
        </div>
      </Tabs>
    );
  }
}

OperationDetails.contextTypes = {
  translate: PropTypes.func.isRequired
};

export default connectData(
  connectData(OperationDetails, {
    RenderLoading: ModalLoading,
    queries: { account: AccountQuery },
    propsToQueryParams: props => ({ accountId: props.operation.account_id })
  }),
  {
    RenderLoading: ModalLoading,
    queries: {
      operation: OperationQuery,
      profile: ProfileQuery
    },
    propsToQueryParams: props => ({ operationId: props.operationId })
  }
);
