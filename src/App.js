import React, { Component } from 'react';
import {array, func, string, number, object} from 'prop-types';

import moment from 'moment';

import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import { defaults }  from './defaults.json';

import './App.css';

const CAMPAIGN = {
  scenarios: { 
    1: { name: "Black Barrow", unlocked: true, blocked: false, complete: false, notes: '' },
    2: { name: "Barrow Lair", unlocked: false, blocked: false, complete: false, notes: '' }
  },
  characters: [
    { name: "Frieda", class: 5, experience: 150, gold: 94, donations: 0, items: '', notes: '', retired: false },
    { name: "Bob", class: 1, experience: 30, gold: 10, donations: 30, items: 'Iron Helmet', notes: 'Almost died :(', retired: false }
  ],
  log: [
    { timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), text: 'Log text 1.'},
    { timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), text: 'Log text 2.'},
    { timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), text: 'Log text 3.'},
    { timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), text: 'Log text 4.'},
    { timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), text: 'Log text 5.'},
    { timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), text: 'Log text 6.'},
    { timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), text: 'Log text 7.'},
    { timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), text: 'Log text 8.'},
    { timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), text: 'Log text 9.'},
    { timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), text: 'Log text 10.'}
  ]
}

class App extends Component {
  render() { 
    return (
      <React.Fragment>
        <Header />
        <Main campaign={CAMPAIGN}/>
      </React.Fragment>
    ) 
  }
}

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <a className="navbar-brand" href="#root">Haven</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav mr-auto">
        {defaults.nav.links.map((link, index) => <NavLink key={index} link={link} />)}
      </ul>
      <form className="form-inline">
        {defaults.nav.buttons.map((button, index) => <NavButton key={index} button={button} />)}
      </form>
    </div>
  </nav>
);

const NavLink = ({ link }) => (
  <li className="nav-item">
    <a className="nav-link" href={link.href}>{link.text}</a>
  </li>
);

const NavButton = ({ button }) => (
  <button className={`btn btn-outline-${button.class} mr-2`} type="submit">{button.text}</button>
);

const Main = ({ campaign }) => (
  <main role="main" className="container">
    <ScenariosCard scenarios={campaign.scenarios} />
    <PartyCard party={campaign.party} />
    <CharactersCard characters={campaign.characters} />
    <CampaignLogCard entries={campaign.log} />
  </main>
);

const ScenariosCard = ({ scenarios, scenarioUpdateHandler }) => (
  <div className="card mb-4" id="scenarios">
    <div className="card-header">Scenarios</div>
    <div className="card-body">
      <ScenariosTable scenarios={scenarios} />
    </div>
  </div>
);

const ScenariosTable = ({ scenarios, scenarioUpdateHandler }) => (
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Unlocked</th>
        <th>Blocked</th>
        <th>Complete</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(scenarios).map((index) => <ScenariosTableRow key={index} index={index} scenario={scenarios[index]} />)}
    </tbody>
  </table>
);

const ScenariosTableRow = ({ index, scenario, scenarioUpdateHandler }) => (
  <tr>
    <th scope="row">{index}</th>
    <td><span className={scenario.unlocked ? '' : 'blur'}>{scenario.name}</span></td>
    <td>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" checked={scenario.unlocked} id={`scenario-${index}-unlocked`} />
      </div>
    </td>
    <td>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value={scenario.blocked} id={`scenario-${index}-blocked`} />
      </div>
    </td>
    <td>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value={scenario.complete} id={`scenario-${index}-complete`} />
      </div>
    </td>
    <td>
      <div className="form-group mb-0">
        <input className="form-control form-control-sm" type="text" value={scenario.notes} id={`scenario-${index}-notes`} />
      </div>
    </td>
  </tr>
);

class PartyCard extends Component {
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
      <div className="card mb-4" id="party">
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

const CharactersCard = ({ characters, characterUpdateHandler }) => (
  <div className="card mb-4" id="characters">
    <div className="card-header">Characters</div>
    <div className="card-body">
      <CharactersTable characters={characters} />
      {characters.map((character, index) => <CharacterDetailsCard key={index} index={index} character={character} />)}
    </div>
  </div>
);

const CharactersTable = ({ characters, characterUpdateHandler }) => (
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
      {characters.map((character, index) => <CharactersTableRow key={index} index={index} character={character} />)}
    </tbody>
  </table>
);

const CharactersTableRow = ({ index, character, characterUpdateHandler }) => (
  <tr>
    <td>{character.class}</td>
    <td><a href={`#character-details-${index}`}>{character.name}</a></td>
    <td>{character.experience}</td>
    <td>{calculateLevel(character.experience)}</td>
    <td>{character.gold}</td>
    <td>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value={character.retired} id={`character-${index}-retired`} readOnly />
      </div>
    </td>
  </tr>
);

const CharacterDetailsCard = ({ index, character, characterUpdateHandler }) => (
  <div className="card mb-4">
    <div className="card-header" id={`character-details-${index}`}>{character.name} <span>?class-icon?</span></div>
    <div className="card-body">
      <form>
        <div className="form-row align-items-end">
          <div className="form-group col-md-5">
            <label htmlFor={`experience-${index}`}>Experience:</label>
            <input type="text" id={`experience-${index}`} name={`experience-${index}`} className="form-control" value={character.experience} readOnly />
          </div>
          <div className="form-group col-md-1">
            <input type="button" id={`btn-inc-experience-${index}`} name={`btn-inc-experience-${index}`} className="btn btn-info mr-2" value="+" />
            <input type="button" id={`btn-dec-experience-${index}`} name={`btn-dec-experience-${index}`} className="btn btn-info" value="-" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor={`level-${index}`}>Level:</label>
            <input type="text" id={`level-${index}`} name={`level-${index}`} className="form-control" value={calculateLevel(character.experience)} readOnly />
          </div>
        </div>
        <div className="form-row align-items-end">
          <div className="form-group col-md-5">
            <label htmlFor={`gold-${index}`}>Gold:</label>
            <input type="text" id={`gold-${index}`} name={`gold-${index}`} className="form-control" value={character.gold} readOnly />
          </div>
          <div className="form-group col-md-1">
            <input type="button" id={`btn-inc-gold-${index}`} name={`btn-inc-gold-${index}`} className="btn btn-info mr-2" value="+" />
            <input type="button" id={`btn-dec-gold-${index}`} name={`btn-dec-gold-${index}`} className="btn btn-info" value="-" />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor={`gold-donated-${index}`}>Gold Donated:</label>
            <input type="text" id={`gold-donated-${index}`} name={`gold-donated-${index}`} className="form-control" value={character.donations} readOnly />
          </div>
          <div className="form-group col-md-1">
            <input type="button" id={`btn-inc-gold-donated-${index}`} name={`btn-inc-gold-donated-${index}`} className="btn btn-info mr-2" value="+" />
            <input type="button" id={`btn-dec-gold-donated-${index}`} name={`btn-dec-gold-donated-${index}`} className="btn btn-info" value="-" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor={`items-${index}`}>Items:</label>
            <textarea name={`items-${index}`} id={`items-${index}`} className="form-control" value={character.items} />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor={`notes-${index}`}>Notes:</label>
            <textarea name={`notes-${index}`} id={`notes-${index}`} className="form-control" value={character.notes} />
          </div>
        </div>
        <div className="form-row">
            <input type="button" id={`btn-retire-${index}`} name={`btn-retire-${index}`} className="btn btn-outline-success ml-auto mr-2" value="Retire" />
            <input type="button" id={`btn-delete-${index}`} name={`btn-delete-${index}`} className="btn btn-outline-danger mr-2" value="Delete" />
        </div>
      </form>
    </div>
  </div>
);

const CampaignLogCard = ({ entries }) => (
  <div className="card mb-4" id="log">
    <div className="card-header">Campaign Log</div>
    <div className="card-body">
      <div className="log">
        {entries.sort(sortDateDesc).map(entry => <CampaignLogEntry key={entry.timestamp} entry={entry} />)}
      </div>
    </div>
  </div>
);

const CampaignLogEntry = ({ entry }) => (
  <p>{entry.timestamp}: {entry.text}</p>
);

const SelectOption = ({ value, text }) => ( <option value={value}>{text}</option> );

const PartyAchievements = ({ deleteHandler, achievements }) => (
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
        <span className="btn btn-default p-0" onClick={() => deleteHandler(achievement)}>
          <i className="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </span>
  </li>
);

const sortDateDesc = (x,y) => moment.utc(x.timestamp).diff(y.timestamp);

const calculateLevel = (exp) => { let l = 0; defaults.experience.forEach((v,i) => { if (exp >= v) l = i + 1; }); return l; }

Main.propTypes = {
  campaign: object.isRequired
}

NavLink.propTypes = {
  link: object.isRequired
}

NavButton.propTypes = {
  button: object.isRequired
}

ScenariosCard.propTypes = {
  scenarios: array.isRequired,
  scenarioUpdateHandler: func.isRequired
}

ScenariosTable.propTypes = {
  scenarios: array.isRequired,
  scenarioUpdateHandler: func.isRequired
}

ScenariosTableRow.propTypes = {
  index: number.isRequired,
  scenario: object.isRequired,
  scenarioUpdateHandler: func.isRequired
}

CharactersCard.propTypes = {
  characters: array.isRequired,
  characterUpdateHandler: func.isRequired
}

CharactersTable.propTypes = {
  characters: array.isRequired,
  characterUpdateHandler: func.isRequired
}

CharactersTableRow.propTypes = {
  index: number.isRequired,
  character: object.isRequired,
  characterUpdateHandler: func.isRequired
}

CharacterDetailsCard.propTypes = {
  index: number.isRequired,
  character: object.isRequired,
  characterUpdateHandler: func.isRequired
}

CampaignLogCard.propTypes = {
  entries: array.isRequired
}

CampaignLogEntry.propTypes = {
  entry: object.isRequired
}

SelectOption.propTypes = {
  value: string.isRequired,
  text: string.isRequired
}

PartyAchievements.propTypes = {
  deleteHandler: func.isRequired,
  achievements: array.isRequired
}

AchievementListItem.propTypes = {
  deleteHandler: func.isRequired,
  achievement: string.isRequired
}

export default App;