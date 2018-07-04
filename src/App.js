import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PlanetCard from './components/PlanetCard';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import { ValidateOnlyContainsLetters, ValidateUniqueValue, ValidateUrl, ValidateIsNotNullOrEmpty } from './helper'
import style1 from './style1';
import style2 from './style2';
import { CardContent } from '@material-ui/core';

const apiUrl = 'http://planetsapi20180630123940.azurewebsites.net/api/';

const styles = {
  appBar: {
    background: 'linear-gradient(to right, #141e30, #243b55)',
    color: 'white',
  },
  style2header: {
    backgroundColor: 'black',
    color: 'white',
  },
  appPlanetCard: {
    backgroundColor: 'red'
  },
  successSnackbar: {
    backgroundColor: green[700]
  }, 
  errorSnackbar: {
    backgroundColor: red[900]
  }, 
  snackbarIcon: {
    marginRight: '5px',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontSize:'20px'
  }
};

// Custom number format used for planet diameter entry field.
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      suffix=" km"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewMode: 0,
      selectedPlanet: null,
      planets: null,
      isAddingPlanet: false,
      numberformat: "1234",
      successSnackbarOpen: false,
      errorSnackbarOpen: false,
      errorMessage: "Error!",
      successMessage: "Success!",
      query: 'success',
    };
    this.selectPlanet.bind(this);
    this.changeView.bind(this);
    this.renderAddPlanetCard.bind(this);
    this.retrievePlanets.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNewPlanetSubmit = this.handleNewPlanetSubmit.bind(this);
    this.clearNewPlanetForm = this.clearNewPlanetForm.bind(this);
    this.refreshPage.bind(this);

    this.retrievePlanets();
  }

  // Used to simulate a page load by using a spinner.
  refreshPage() {
    // Starts the spinner.
    this.setState({
      query: 'progress',
    });
    // Stops the load spinner after 2 seconds.
    this.timer = setTimeout(() => {
      this.setState({
        query: 'success',
      });
    }, 2e4);
  };

  componentDidMount() {
    // Simulate a load then show the 1st view.
    this.refreshPage();
    this.changeView(0);
  }

  componentDidUpdate(prevProps) {
    // Check if the url has changed since last time, if so, then check if anything is being requested.
    if (this.props.location !== prevProps.location) {
      this.checkRoute();
    }
  }

  // Selects the planet with name for its info to be displayed.
  selectPlanet(planetName) {
    if (this.state.planets === null)
      return;
    return fetch(`${apiUrl}planets/${planetName}`)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ selectedPlanet: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Changes the type of view.
  changeView(newMode) {
    this.setState({ viewMode: newMode });
    this.refreshPage();
    this.timer = setTimeout(() => {
      this.setState({
        query: 'success',
      });
    }, 2e3);
  }

  // GETS a list of all the planets.
  retrievePlanets() {
    return fetch(`${apiUrl}planets/getall`)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ planets: responseJson });
        this.checkRoute();
        this.refreshPage();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Renders a list of planets according to which view mode is selected,
  // either a list of planet names, or a list of planet cards.
  renderPlanetList(classes) {
    return this.state.planets === null ? null
      : this.state.planets.map((planet, i) => (
        this.state.viewMode === 0 ? (
          <div>
            <ListItem onClick={() => this.selectPlanet(planet.name)} type="button" key={`${planet.name}-${planet.id}`} className="planet-container" button>
              <ListItemText>
                <p>
                  {planet.name}
                </p>
              </ListItemText>
            </ListItem>
            {i < this.state.planets.length - 1 ?
            (<Divider />):(null)}
          </div>
        ) : (
          <span style={{ padding: '5px' }}>
            <PlanetCard
              classes={{
                header: classes.style2header,
              }}
              style={style2}
              planet={planet}
              index={i}
            />
          </span>)
      ));
  }

  // Handles an input change event by storing the value of the field in state.
  handleInputChange(event) {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    this.setState({[id]:value});
  }

  // Clears all fields in the new planet form.
  clearNewPlanetForm() {
    this.setState({
      newplanetname:undefined,
      newplanetdistance:undefined,
      newplanetmass:undefined,
      newplanetdiameter:undefined,
      newplanetdescription:undefined,
      newplaneturl:undefined,
      newplanetimage:undefined,
    });
  }

  // Retrieve new planet form values from state then POST to api, then refresh page.
  handleNewPlanetSubmit() {
    const _validateIsNotNullOrEmpty = ValidateIsNotNullOrEmpty.bind(this);
    if (_validateIsNotNullOrEmpty(this.state.newplanetname, "Error: planet needs a name!")
    && ValidateUniqueValue.call(this, this.state.planets, 'name', this.state.newplanetname, "Error: planet name already exists!")
    && ValidateOnlyContainsLetters.call(this, this.state.newplanetname, "Error: planet name should only contain letters!")
    && _validateIsNotNullOrEmpty(this.state.newplanetdistance, "Error: planet needs a distance!")
    && _validateIsNotNullOrEmpty(this.state.newplanetmass, "Error: planet needs a mass!")
    && _validateIsNotNullOrEmpty(this.state.newplanetdiameter, "Error: planet needs a diameter!")
    && _validateIsNotNullOrEmpty(this.state.newplanetdescription, "Error: planet needs a description!")
    && _validateIsNotNullOrEmpty(this.state.newplaneturl, "Error: planet needs a wikipedia url!")
    && ValidateUrl.call(this, this.state.newplaneturl, "Error: incorrect wikipedia url!")
    && _validateIsNotNullOrEmpty(this.state.newplanetimage, "Error: planet needs an image!")
    && ValidateUrl.call(this, this.state.newplanetimage, "Error: incorrect image url!")
    ) {
      this.clearNewPlanetForm();
      this.setState({
        isAddingPlanet: false,
        successMessage: this.state.newplanetname + " created!",
        successSnackbarOpen: true
      });
      fetch(apiUrl + 'planets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": this.state.newplanetname,
            "image": this.state.newplanetimage,
            "distance": this.state.newplanetdistance,
            "mass": this.state.newplanetmass,
            "diameter": this.state.newplanetdiameter+"km",
            "description": this.state.newplanetdescription,
            "link": this.state.newplaneturl,
        })
      })
      this.retrievePlanets();
    }
  }

  // Renders the card to be able to create/add a new planet.
  renderAddPlanetCard(classes) {
    return <span style={{ padding: '5px' }}>
    <Card type="button" style={{
      backgroundColor:'white',
      width:'300px',
      height:'594px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      }}>
      {this.state.isAddingPlanet === false ? (
      <div>
        <CardContent>
          <p>Add new planet</p>
        </CardContent>
          <Button onClick={() => {this.setState({isAddingPlanet: true})}} variant="fab" color="primary" aria-label="add" className={classes.button} style={{textAlign:'centre'}}>
            <AddIcon />
          </Button>
        <CardActions>
        </CardActions>
      </div>) : (
        <div>
          <TextField
            required
            id="newplanetname"
            label="Name"
            className={classes.textField}
            margin="normal"
            value={this.state.newplanetname}
            onChange={this.handleInputChange}
          />
          <TextField
            required
            id="newplanetdistance"
            label="Distance from sun"
            className={classes.textField}
            margin="normal"
            value={this.state.newplanetdistance}
            onChange={this.handleInputChange}
          />
          <TextField
            required
            id="newplanetmass"
            label="Mass"
            className={classes.textField}
            margin="normal"
            value={this.state.newplanetmass}
            onChange={this.handleInputChange}
          />
          <TextField
            required
            id="newplanetdiameter"
            label="Diameter (km)"
            value={this.state.newplanetdiameter}
            onChange={this.handleInputChange}
            type="number"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            required
            id="newplanetdescription"
            label="Description"
            className={classes.textField}
            margin="normal"
            value={this.state.newplanetdescription}
            onChange={this.handleInputChange}
          />
          <TextField
            required
            id="newplaneturl"
            label="Wikipedia page"
            className={classes.textField}
            margin="normal"
            value={this.state.newplaneturl}
            onChange={this.handleInputChange}
          />
          <TextField
            required
            id="newplanetimage"
            label="Image url"
            className={classes.textField}
            margin="normal"
            value={this.state.newplanetimage}
            onChange={this.handleInputChange}
          />
          <div style={{paddingTop:'20px'}}>
            <Button variant="contained" color="primary" className={classes.button}
            style={{margin:'10px'}} 
            onClick={()=>{
              this.clearNewPlanetForm();
              this.setState({isAddingPlanet:false})}}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary" className={classes.button} style={{margin:'10px'}} onClick={this.handleNewPlanetSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </Card>
    </span>;
  }

  // Check the appended url for any requests.
  checkRoute() {
    // Check for a requested planet name:
    // /planet/earth - select earth
    // /planet/mars - select mars
    const splitPath = this.props.location.pathname.split('/');
    const planetName = splitPath[splitPath.length - 1];
    if (planetName !== null) {
      this.selectPlanet(planetName);
    }
  }

  // Called from the tabs to switch between the view modes.
  handleChangeTab = (event, value) => {
    this.changeView(value);
  };

  render() {
    const { classes } = this.props;
    const { query, viewMode, selectedPlanet } = this.state;
    return (
      <div className="App">
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              {'Planets App'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.successSnackbarOpen}
          autoHideDuration={6000}
          onClose={()=>{this.setState({successSnackbarOpen:false})}}
        >
          <SnackbarContent
            className={classes["successSnackbar"]}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <CheckCircleIcon className={classes.snackbarIcon} />
                {this.state.successMessage}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className="close"
                onClick={()=>{this.setState({successSnackbarOpen:false})}}
              >
                <CloseIcon className="classnameicon" />
              </IconButton>,
            ]}
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.errorSnackbarOpen}
          autoHideDuration={3000}
          onClose={()=>{this.setState({errorSnackbarOpen:false})}}
        >
          <SnackbarContent
            className={classes["errorSnackbar"]}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <ErrorIcon className={classes.snackbarIcon} />
                {this.state.errorMessage}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className="close"
                onClick={()=>{this.setState({errorSnackbarOpen:false})}}
              >
                <CloseIcon className="classnameicon" />
              </IconButton>,
            ]}
          />
        </Snackbar>
        <Tabs
          value={viewMode}
          onChange={this.handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
          style={{display:'flex',justifyContent:'center'}}
        >
          <Tab label="List Style" />
          <Tab label="Card Style" />
        </Tabs>
        <div className={classes.placeholder} style={{flex: 1}}>
          {query === 'success' ? (
          <div>
            {viewMode === 0 ? (
              <div className="planets">
                <List component="nav" className="planets-list">
                  {this.renderPlanetList(classes)}
                </List>
                {selectedPlanet !== null ? (
                  <PlanetCard
                    classes={{
                      header: classes.style1header,
                    }}
                    planet={selectedPlanet}
                    selectPlanet={this.selectPlanet}
                    style={style1}
                  />
                ) : (
                  <Card className="noSelectedPlanet">
                    <CardContent>
                      <p>
                        Select a planet
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="planets" style={{ flex: '1 0 auto' }}>
                <span component="nav" className="planets-list" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {this.renderPlanetList(classes)}
                  {this.renderAddPlanetCard(classes)}
                </span>
              </div>
            )}
        </div>
        ) : (
        <div style={{paddingTop: '20px'}}>
          <Fade
            in={query === 'progress'}
            style={{
              transitionDelay: query === 'progress' ? '800ms' : '0ms',

            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
          <Fade
            in={query === 'progress'}
            style={{
              transitionDelay: query === 'progress' ? '800ms' : '0ms',

            }}
            unmountOnExit
          >
          <p>Loading planets...</p>
          </Fade>
        </div>
        )}
        </div>
        <div className="footer">
          <p>
            {'Copyright © 2018 PRETTYPLANETS All rights reserved.'}
          </p>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
