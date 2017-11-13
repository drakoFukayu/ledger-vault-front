// @flow
import React, { Component } from "react";
import connectData from "../../restlay/connectData";
import CurrencyNameValue from "../../components/CurrencyNameValue";
import CurrencyCounterValueConversion from "../../components/CurrencyCounterValueConversion";
import Card from "../../components/Card";
import DateFormat from "../../components/DateFormat";
import CardField from "../../components/CardField";
import ReceiveFundsCard from "./ReceiveFundsCard";
import DataTableOperation from "../../components/DataTableOperation";
import QuicklookGraph from "./QuicklookGraph";
import type { Account, Operation } from "../../datatypes";
import CustomSelectField from "../../components/CustomSelectField/CustomSelectField.js";
import AccountOperationsQuery from "../../api/queries/AccountOperationsQuery";
import AccountQuery from "../../api/queries/AccountQuery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Account.css";
import _ from "lodash";

class AccountView extends Component<
  {
    account: Account,
    operations: Array<Operation>,
    reloading: boolean
  },
  *
> {
  constructor(props) {
    super(props);
    this.state = {
      quickLookGraphFilter: this.quickLookGraphFilters[0],
      tabsIndex: 0,
      labelDateRange: this.getLabelDateRange(this.getDateRange(0))
    };
  }

  onQuickLookGraphFilterChange = filter => {
    this.setState({ quickLookGraphFilter: filter });
  };

  onDomainChange = domain => {
    this.setState({ labelDateRange: this.getLabelDateRange(domain) });
  };

  quickLookGraphFilters = [
    { title: "balance", key: "balance" },
    { title: "countervalue", key: "countervalue" },
    { title: "payments", key: "payments" }
  ];

  selectTab = index => {
    this.setState({ tabsIndex: index });
  };
  getLastWeek = () => {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    return lastWeek;
  };

  getLabelDateRange = domain => {
    const dateRange =
      new Date(domain[0]).getDate() == new Date(domain[1]).getDate()
        ? "day"
        : new Date(domain[0]).getMonth() == new Date(domain[1]).getMonth()
          ? "month"
          : new Date(domain[0]).getFullYear() ==
            new Date(domain[1]).getFullYear()
            ? "year"
            : "hour";

    let res = "";
    if (dateRange === "day") {
      //Same day
      res = [
        <DateFormat date={domain[0]} format="MMMM Do, YYYY h:mm" />,
        <DateFormat date={domain[1]} format="h:mm" />
      ];
    } else if (dateRange === "month") {
      //Same month
      res = [
        <DateFormat date={domain[0]} format="MMMM Do" />,
        <DateFormat date={domain[1]} format="Do, YYYY" />
      ];
    } else if (dateRange === "year") {
      //Same year
      res = [
        <DateFormat date={domain[0]} format="MMMM Do" />,
        <DateFormat date={domain[1]} format="MMMM Do, YYYY" />
      ];
    } else
      res = [
        <DateFormat date={domain[0]} format="MMMM Do, YYYY" />,
        <DateFormat date={domain[1]} format="MMMM Do, YYYY" />
      ];
    return res;
  };
  getDateRange = tabsIndex => {
    const max = new Date();
    let min = new Date();
    min =
      tabsIndex === 0
        ? new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        : min;
    min =
      tabsIndex === 1
        ? new Date(new Date().setMonth(new Date().getMonth() - 1))
        : min;
    min = tabsIndex === 2 ? this.getLastWeek() : min;
    min =
      tabsIndex === 3
        ? new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
        : min;
    return [min.setHours(0, 0, 0, 0), max.setHours(0, 0, 0, 0)];
  };

  getOperations = data => {
    const { quickLookGraphFilter } = this.state;
    let operations = [];
    let factor = 1;
    if (quickLookGraphFilter.key === "balance") {
      operations = data.map((o: Operation, i: number) => {
        return {
          time: new Date(o.time),
          amount: o.amount + (i > 0 ? data[i - 1].amount : 0),
          currency: o.currency,
          tooltip: true
        };
      });
      operations.push({ ...operations[operations.length - 1] });
      operations[operations.length - 1].time = new Date().setHours(0, 0, 0, 0);
      operations[operations.length - 1].tooltip = false;
    } else {
      factor =
        quickLookGraphFilter.key === "countervalue"
          ? operations[0].currency.rate.value
          : 1;
      operations = operations.map((o: Operation) => ({
        time: new Date(o.time),
        amount: o.amount * factor,
        currency: o.currency,
        tooltip: true
      }));
    }
    _.sortBy(operations, elem => new Date(elem.time).toISOString());
    return operations;
  };

  render() {
    const { account, operations, reloading } = this.props;
    const { tabsIndex, quickLookGraphFilter, labelDateRange } = this.state;
    const dateRange = this.getDateRange(tabsIndex);
    return (
      <div className="account-view">
        <div className="account-view-infos">
          <div className="infos-left">
            <div className="infos-left-top">
              <Card reloading={reloading} className="balance" title="Balance">
                <CardField label={<DateFormat date={new Date()} />}>
                  <CurrencyNameValue
                    currencyName={account.currency.name}
                    value={account.balance}
                  />
                </CardField>
              </Card>

              <Card
                reloading={reloading}
                className="countervalue"
                title="Countervalue"
              >
                <CardField
                  label={
                    <CurrencyCounterValueConversion
                      currencyName={account.currency.name}
                    />
                  }
                >
                  <CurrencyNameValue
                    currencyName={account.currency.name}
                    value={account.balance}
                    countervalue
                  />
                </CardField>
              </Card>
            </div>
            <ReceiveFundsCard hash={account.receive_address} />
          </div>
          <Card
            reloading={reloading}
            className="quicklook"
            title="Quicklook"
            titleRight={
              <CustomSelectField
                values={this.quickLookGraphFilters}
                selected={quickLookGraphFilter}
                onChange={this.onQuickLookGraphFilterChange}
              />
            }
          >
            <Tabs
              className=""
              selectedIndex={tabsIndex}
              onSelect={this.selectTab}
            >
              <header>
                <TabList>
                  <Tab> Year </Tab>
                  <Tab disabled={false}>month</Tab>
                  <Tab disabled={false}>week</Tab>
                  <Tab disabled={false}>day</Tab>
                </TabList>
              </header>
              <div className="dateLabel">
                From {labelDateRange[0]} to {labelDateRange[1]}
              </div>
              <div className="content">
                <QuicklookGraph
                  onDomainChange={this.onDomainChange}
                  minDomain={this.getDateRange(0)}
                  dateRange={this.getDateRange(tabsIndex)}
                  data={this.getOperations(operations)}
                />
                <TabPanel className="tabs_panel" />
                <TabPanel className="tabs_panel" />
                <TabPanel className="tabs_panel" />
                <TabPanel className="tabs_panel" />
              </div>
            </Tabs>
          </Card>
        </div>
        <Card reloading={reloading} title="last operations">
          <DataTableOperation
            operations={operations}
            columnIds={["date", "address", "status", "countervalue", "amount"]}
          />
        </Card>
      </div>
    );
  }
}

// FIXME have a generic component for screen errors
const RenderError = ({ error }: { error: Error }) => (
  <span style={{ color: "#fff" }}>
    {(error && error.message) || error.toString()}
  </span>
);

export default connectData(AccountView, {
  queries: { account: AccountQuery, operations: AccountOperationsQuery },
  propsToQueryParams: props => ({ accountId: props.match.params.id }),
  RenderError
});
