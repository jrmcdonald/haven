import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import { defaults }  from './defaults.json';

import './App.css';

class App extends Component {
  render() { 
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <a className="navbar-brand" href="/">Haven</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/scenarios">Scenarios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/party">Party</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/characters">Characters</a>
              </li>
            </ul>
            <form className="form-inline">
              <button className="btn btn-outline-success mr-2" type="submit">Save</button>
              <button className="btn btn-outline-success mr-2" type="submit">Load</button>
              <button className="btn btn-outline-danger mr-2" type="submit">Reset</button>
            </form>
          </div>
        </nav>
        <main role="main" className="container">
          <div className="card mb-4">
            <div className="card-header">Scenarios</div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Locked</th>
                    <th>Complete</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Black Barrow</td>
                    <td>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="scenario-1-unlocked" />
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="scenario-1-complete" />
                      </div>
                    </td>
                    <td>
                      <div className="form-group mb-0">
                        <input className="form-control form-control-sm" type="text" id="scenarim-1-notes" rows="1" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <PartyDetails />
          <div className="card mb-4">
            <div className="card-header">Characters</div>
            <div className="card-body">
              <table className="table mb-4">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Name</th>
                    <th>XP</th>
                    <th>Level</th>
                    <th>Gold</th>
                    <th>Retired</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Spellweaver</td>
                    <td>Sharrow</td>
                    <td>161</td>
                    <td>4</td>
                    <td>32</td>
                    <td>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="character-1-retired" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="card">
                <div className="card-header">Sharrow <span>?class-icon?</span></div>
                <div className="card-body">
                  <form>
                    <div className="form-row align-items-end">
                      <div className="form-group col-md-3">
                        <label htmlFor="experience-1">Experience:</label>
                        <input type="text" id="experience-1" name="experience-1" className="form-control" readOnly />
                      </div>
                      <div className="form-group col-md-1">
                        <input type="button" id="btn-inc-experience-1" name="btn-inc-experience-1" className="btn btn-info mr-2" value="+" />
                        <input type="button" id="btn-dec-experience-1" name="btn-dec-experience-1" className="btn btn-info" value="-" />
                      </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="level-1">Level:</label>
                        <input type="text" id="level-1" name="level-1" className="form-control" readOnly />
                      </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="gold-1">Gold:</label>
                        <input type="text" id="gold-1" name="gold-1" className="form-control" readOnly />
                      </div>
                      <div className="form-group col-md-1">
                        <input type="button" id="btn-inc-gold-1" name="btn-inc-gold-1" className="btn btn-info mr-2" value="+" />
                        <input type="button" id="btn-dec-gold-1" name="btn-dec-gold-1" className="btn btn-info" value="-" />
                      </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="gold-donated-1">Gold Donated:</label>
                        <input type="text" id="gold-donated-1" name="gold-donated-1" className="form-control" readOnly />
                      </div>
                      <div className="form-group col-md-1">
                        <input type="button" id="btn-inc-gold-donated-1" name="btn-inc-gold-donated-1" className="btn btn-info mr-2" value="+" />
                        <input type="button" id="btn-dec-gold-donated-1" name="btn-dec-gold-donated-1" className="btn btn-info" value="-" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="items-1">Items:</label>
                        <textarea name="items-1" id="items-1" className="form-control" />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="notes-1">Notes:</label>
                        <textarea name="notes-1" id="notes-1" className="form-control" />
                      </div>
                    </div>
                    <div clasName="form-row clearfix">
                        <input type="button" id="btn-delete-1" name="btn-delete-1" className="btn btn-outline-danger float-right mr-2" value="Delete" />
                        <input type="button" id="btn-retire-1" name="btn-retire-1" className="btn btn-outline-success float-right mr-2" value="Retire" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    ) 
  }
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
      <div className="card mb-4">
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
