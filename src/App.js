import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import { defaults }  from './defaults.json';

import './App.css';

class App extends Component {
  render() { return <PartyDetails /> }
}

class PartyDetails extends Component {
  constructor() {
    super();

    this.updateLocalStorage = this.updateLocalStorage.bind(this);

    this.handleReputationChange = this.handleReputationChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);

    this.handleAchievementChange = this.handleAchievementChange.bind(this);
    this.handleAchievementAdd = this.handleAchievementAdd.bind(this);
    this.handleAchievementDelete = this.handleAchievementDelete.bind(this);

    this.state = {
      party: {
        name: '',
        location: '',
        reputation: '0',
        notes: '',
        achievements: []
      },
      selectedAchievement: []
    }

    const cachedParty = localStorage.getItem('party');
    if (cachedParty) {
      this.state.party = JSON.parse(cachedParty);
    }
  }

  updateLocalStorage = () => { localStorage.setItem('party', JSON.stringify(this.state.party)) };

  handleReputationChange = event => this.setState({ party: { ...this.state.party, reputation: event.target.value } }, () => this.updateLocalStorage());
  handleNameChange = event => this.setState({ party: { ...this.state.party, name: event.target.value } }, () => this.updateLocalStorage());
  handleLocationChange = event => this.setState({ party: { ...this.state.party, location: event.target.value } }, () => this.updateLocalStorage());
  handleNotesChange = event => this.setState({ party: { ...this.state.party, notes: event.target.value } }, () => this.updateLocalStorage());

  handleAchievementChange = selected => this.setState({ selectedAchievement: selected });

  handleAchievementAdd = () => {
    if (!this.state.party.achievements.includes(this.state.selectedAchievement[0])) {
      this.setState({ 
        party: { 
          ...this.state.party, 
          achievements: this.state.party.achievements.concat([this.state.selectedAchievement[0]])
        } 
      }, () => {
        this.updateLocalStorage(); 
        this.setState({ selectedAchievement: [] });
      });
    } 
  }

  handleAchievementDelete = achievement => {
    this.setState({ 
      party: { 
        ...this.state.party, 
        achievements: this.state.party.achievements.filter(x => x !== achievement) 
      } 
    }, () => this.updateLocalStorage());
  }

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
                  {defaults.reputation.map(item => <SelectOption key={item.key} value={item.key} text={item.key} />)}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="modifier">Shop Price Modifier:</label>
                <input type="text" name="modifier" id="modifier" className="form-control" readOnly value={defaults.reputation.find(o => o.key === this.state.party.reputation).value} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="notes">Notes:</label>
                <textarea name="notes" id="notes" className="form-control" value={this.state.party.notes} onChange={this.handleNotesChange} />
              </div>
            </div>
            <div className="form-row align-items-top">
              <div className="form-group col-md-5">
                <Typeahead
                  onChange={this.handleAchievementChange}
                  options={defaults.achievements}
                  selected={this.state.selectedAchievement}
                  placeholder='What have you achieved?'
                />
              </div>
              <div className="form-group col-md-1">
                <input type="button" className="btn btn-info btn-block" name="add-achievement" id="add-achievement" value="Add" disabled={!this.state.selectedAchievement[0]} onClick={this.handleAchievementAdd} />
              </div>
              {this.state.party.achievements.length > 0 && <PartyAchievements deleteHandler={this.handleAchievementDelete} achievements={this.state.party.achievements} />}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const SelectOption = ({ value, text }) => ( <option value={value}>{text}</option> );

const PartyAchievements = ({ deleteHandler, achievements}) => (
  <div className="form-group col-md-6">
    <div className="card">
      <div className="card-header">Party Achievements</div>
      <ul className="list-group list-group-flush">
        {achievements.map(achievement => <AchievementListItem key={achievement} achievement={achievement} deleteHandler={deleteHandler} />)}
      </ul>
    </div>
  </div>
);

const AchievementListItem = ({ deleteHandler, achievement }) => (
  <li className="list-group-item clearfix">
      {achievement}
      <span className="float-right">
        <span className="btn btn-xs btn-default" onClick={() => deleteHandler(achievement)}>
          <i className="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </span>
  </li>
);

SelectOption.propTypes = {
  value: PropTypes.array.isRequired,
  text: PropTypes.array.isRequired
}

PartyAchievements.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  achievements: PropTypes.array.isRequired
}

AchievementListItem.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  achievement: PropTypes.string.isRequired
}

export default App;
