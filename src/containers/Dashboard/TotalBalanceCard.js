//@flow
import React, { Component } from "react";
import connectData from "../../restlay/connectData";
import CurrencyFiatValue from "../../components/CurrencyFiatValue";
import EvolutionSince, {
  TotalBalanceFilters
} from "../../components/EvolutionSince";
import DateFormat from "../../components/DateFormat";
import Card from "../../components/Card";
import CardField from "../../components/CardField";
import colors from "../../shared/colors";
import { Select, Option } from "../../components/Select";
import TryAgain from "../../components/TryAgain";
import SpinnerCard from "../../components/spinners/SpinnerCard";
import DashboardTotalBalanceQuery from "../../api/queries/DashboardTotalBalanceQuery";
import { withStyles } from "material-ui/styles";

const styles = {
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  card: {
    height: "180px"
  }
};
class TotalBalance extends Component<{
  totalBalance: *,
  filter: string,
  onTotalBalanceFilterChange: (filter: string) => void,
  reloading: *,
  restlay: *
}> {
  render() {
    const {
      onTotalBalanceFilterChange,
      filter,
      classes,
      totalBalance,
      reloading
    } = this.props;
    return (
      <Card
        reloading={reloading}
        title="total balance"
        className={classes.card}
        titleRight={
          <Select onChange={onTotalBalanceFilterChange}>
            {TotalBalanceFilters.map(({ key, title }) => (
              <Option key={key} value={key} selected={filter === key}>
                {title.toUpperCase()}
              </Option>
            ))}
          </Select>
        }
      >
        <div className={classes.body}>
          <CardField label={<DateFormat date={totalBalance.date} />}>
            <CurrencyFiatValue
              fiat={totalBalance.currencyName}
              value={totalBalance.value}
            />
          </CardField>
          <div style={{ minWidth: "200px" }}>
            <EvolutionSince
              value={totalBalance.value}
              valueHistory={totalBalance.valueHistory}
              filter={TotalBalanceFilters.find(f => f.key === filter)}
            />
          </div>
          <CardField label="accounts" align="right">
            {totalBalance.accountsCount}
          </CardField>
          <CardField label="currencies" align="right">
            {totalBalance.currenciesCount}
          </CardField>
          <CardField label="members" align="right">
            {totalBalance.membersCount}
          </CardField>
        </div>
      </Card>
    );
  }
}

const RenderError = withStyles(styles)(({ error, restlay, classes }: *) => (
  <Card className={classes.card} title="total balance">
    <TryAgain error={error} action={restlay.forceFetch} />
  </Card>
));

const RenderLoading = withStyles(styles)(({ classes }) => (
  <Card className={classes.card} title="total balance">
    <SpinnerCard />
  </Card>
));

export default connectData(withStyles(styles)(TotalBalance), {
  queries: {
    totalBalance: DashboardTotalBalanceQuery
  },
  optimisticRendering: true,
  RenderError,
  RenderLoading
});
