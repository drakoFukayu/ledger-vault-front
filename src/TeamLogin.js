import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

//import TextField from 'material-ui/TextField';
import TextField from './TextField';
import DialogButton from './DialogButton';
import translate from './translate';
import { checkTeam } from './actions';
import Alert from './Alert';

class TeamLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      response: '',
      snackOpen: false,
      dialogOpen: false,
      disabled: false,
      error: props.error,
      team: props.team,
    };
    this.selectTeam = this.selectTeam.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  componentWillReceiveProps(props) {
    console.log("will receive pops")
    if (props.error) {
      this.setState({ error: true, disabled: false });
    }
  }

  handleChange = (e, newVal) => {
    this.setState({ team: newVal });
    this.setState({ error: false });
  }

  selectTeam() {
    console.log(this);
    this.setState({ disabled: true });
    this.props.checkTeam(this.state.team);
  }

  confirm(e) {
    if (e.key === 'Enter') {
      this.selectTeam();
    }
  }

  handleRequestClose = () => {
    this.setState({ error: false });
  }

  render() {
    this.t = this.props.translate;
    return (
      <div className="TeamLogin">
        <Alert
          onRequestClose={this.handleRequestClose}
          open={this.state.error}
          autoHideDuration={4000}
          title={this.t('login.wrongDomainTitle')}
        >
          <div>{this.t('login.wrongDomainMessage')}</div>
        </Alert>
        <img className="user" src="img/logo.png" alt="Ledger Vault" />
        <br/>
        <TextField
          onKeyDown={this.confirm}
          //disabled={this.state.disabled}
          hasError={this.state.error}
          style={{ width: '320px' }}
          inputStyle={{ textAlign: 'center' }}
          id="textField"
          errorText=""
          onChange={this.handleChange}
          hintStyle={{ textAlign: 'center', width: '100%' }}
          hintText={this.t('login.hint')}
        /><br />
        <div className="instructions" >{this.t('login.instructions')}</div>
        <DialogButton highlight right onTouchTap={this.selectTeam}>{this.t('common.continue')}</DialogButton>
      </div>
    );
  }
}

TeamLogin.defaultProps = {
  reroute: '/',
  team: '',
};

TeamLogin.propTypes = {
  translate: React.PropTypes.func.isRequired,
  error: React.PropTypes.bool.isRequired,
  checkTeam: React.PropTypes.func.isRequired,
  team: React.PropTypes.string,
};

export default withRouter(connect(null, { checkTeam })(translate(TeamLogin)));
