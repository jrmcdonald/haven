import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() { return <PartyDetails /> };
}

class PartyDetails extends Component {
  constructor(props) {
    super();

    this.handleReputationChange = this.handleReputationChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);

    this.mapReputationOptions = this.mapReputationOptions.bind(this);

    this.state = {
      defaults: {
        reputation: [
          { key: '+20', value: '-5' },
          { key: '+19', value: '-5' },
          { key: '+18', value: '-4' },
          { key: '+17', value: '-4' },
          { key: '+16', value: '-4' },
          { key: '+15', value: '-4' },
          { key: '+14', value: '-3' },
          { key: '+13', value: '-3' },
          { key: '+12', value: '-3' },
          { key: '+11', value: '-3' },
          { key: '+10', value: '-2' },
          { key: '+9', value: '-2' },
          { key: '+8', value: '-2' },
          { key: '+7', value: '-2' },
          { key: '+6', value: '-1' },
          { key: '+5', value: '-1' },
          { key: '+4', value: '-1' },
          { key: '+3', value: '-1' },
          { key: '+2', value: 'None' },
          { key: '+1', value: 'None' },
          { key: '0', value: 'None' },
          { key: '-1', value: 'None' },
          { key: '-2', value: 'None' },
          { key: '-3', value: '+1' },
          { key: '-4', value: '+1' },
          { key: '-5', value: '+1' },
          { key: '-6', value: '+1' },
          { key: '-7', value: '+2' },
          { key: '-8', value: '+2' },
          { key: '-9', value: '+2' },
          { key: '-10', value: '+2' },
          { key: '-11', value: '+3' },
          { key: '-12', value: '+3' },
          { key: '-13', value: '+3' },
          { key: '-14', value: '+3' },
          { key: '-15', value: '+4' },
          { key: '-16', value: '+4' },
          { key: '-17', value: '+4' },
          { key: '-18', value: '+4' },
          { key: '-19', value: '+5' },
          { key: '-20', value: '+5' },
        ]
      },
      party: {
        name: '',
        location: '',
        reputation: '0',
        notes: '',
        achievements: []
      }
    }
  }

  handleReputationChange = (event) => { this.setState({ party: { ...this.state.party, reputation: event.target.value } }) };
  handleNameChange = (event) => { this.setState({ party: { ...this.state.party, name: event.target.value } }) };
  handleLocationChange = (event) => { this.setState({ party: { ...this.state.party, location: event.target.value } }) };
  handleNotesChange = (event) => { this.setState({ party: { ...this.state.party, notes: event.target.value } }) };
  
  mapReputationOptions = item => ( <option key={item.key} value={item.key}>{item.key}</option> );

  render() {
    return (
      <div className="card">
        <div className="card-header">Party Details</div>
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" className="form-control" placeholder="Choose a name..." value={this.state.party.name} onChange={this.handleNameChange} />
              </div>
              <div className="form-group col-md-6">
                  <label htmlFor="location">Location:</label>
                  <input type="text" name="location" id="location" className="form-control" placeholder="Where is your party?" value={this.state.party.location} onChange={this.handleLocationChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="reputation">Reputation:</label>
                <select id="reputation" name="reputation" className="form-control" onChange={this.handleReputationChange} value={this.state.party.reputation}>
                  {this.state.defaults.reputation.map(this.mapReputationOptions)}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="modifier">Shop Price Modifier:</label>
                <input type="text" name="modifier" id="modifier" className="form-control" disabled value={this.state.defaults.reputation.find(o => o.key === this.state.party.reputation).value} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label htmlFor="notes">Notes:</label>
                <textarea name="notes" id="notes" className="form-control" value={this.state.party.notes} onChange={this.handleNotesChange} />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
