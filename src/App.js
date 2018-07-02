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
import CardHeader from '@material-ui/core/CardHeader';
import ListIcon from '@material-ui/icons/List';
import IconButton from '@material-ui/core/IconButton';
import PlanetCard from './components/PlanetCard';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import NumberFormat from "react-number-format";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";


import style1 from './style1';
import style2 from './style2';
import { CardContent } from '@material-ui/core';

const apiUrl = 'http://planetsapi20180630123940.azurewebsites.net/api/';

const styles = {
  appBar: {
    background: 'linear-gradient(45deg, #0F2027 5%, #2C5364 90%)',
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
      viewMode: 1,
      selectedPlanet: null,
      planets: null,
      isAddingPlanet: false,
      numberformat: "1234",
      successSnackbarOpen: false,
      errorSnackbarOpen: false,
      errorMessage: "Error!",
      successMessage: "Success!",
    };
    this.SelectPlanet.bind(this);
    this.ChangeView.bind(this);
    this.RenderAddPlanetCard.bind(this);
    this.RetrievePlanets.bind(this);
    this.HandleInputChange = this.HandleInputChange.bind(this);
    this.handleNewPlanetSubmit = this.handleNewPlanetSubmit.bind(this);
    this.clearNewPlanetForm = this.clearNewPlanetForm.bind(this);
    this.RetrievePlanets();
    this.SelectPlanet('earth');
    this.checkRoute();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.checkRoute();
    }
  }

  SelectPlanet(planetName) {
    return fetch(`${apiUrl}planets/${planetName}`)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ selectedPlanet: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ChangeView(newMode) {
    this.setState({ viewMode: newMode });
  }

  RetrievePlanets() {
    return fetch(`${apiUrl}planets/getall`)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ planets: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  RenderPlanetList(classes) {
    return this.state.planets === null ? null
      : this.state.planets.map((planet, i) => (
        this.state.viewMode === 0 ? (
          <div>
            <ListItem onClick={() => this.SelectPlanet(planet.name)} type="button" key={`${planet.name}-${planet.id}`} className="planet-container" button>
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

  HandleInputChange(event) {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    this.setState({[id]:value});
    // console.log(id + ":" + value);
  }

  clearNewPlanetForm() {
    this.setState({
      newplanetname:undefined,
      newplanetdistance:undefined,
      newplanetmass:undefined,
      newplanetdiameter:undefined,
      newplanetdescription:undefined,
    });
  }

  validateOnlyContainsLetters(value, errorMessage) {
    if (value.match(/^[a-zA-Z]+$/)) {
      return true;
    }
    this.setState({
      errorMessage: errorMessage,
      errorSnackbarOpen: true,
    });
    return false;
  }

  validateUrl(value, errorMessage) {
    if (value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)) {
      return true;
    }
    this.setState({
      errorMessage: errorMessage,
      errorSnackbarOpen: true,
    });
    return false;
  }

  validateIsNotNullOrEmpty(value, errorMessage) {
    if (value !== undefined && value.length > 0) {
      return true;
    }
    // console.log("error: " + value);
    this.setState({
      errorMessage: errorMessage,
      errorSnackbarOpen: true,
    });
    return false;
  }

  handleNewPlanetSubmit() {

    if (this.validateIsNotNullOrEmpty(this.state.newplanetname, "Error: planet needs a name!")
    && this.validateOnlyContainsLetters(this.state.newplanetname, "Error: planet name shouldn't contain numbers!")
    && this.validateIsNotNullOrEmpty(this.state.newplanetdistance, "Error: planet needs a distance!")
    && this.validateIsNotNullOrEmpty(this.state.newplanetmass, "Error: planet needs a mass!")
    && this.validateIsNotNullOrEmpty(this.state.newplanetdiameter, "Error: planet needs a diameter!")
    && this.validateIsNotNullOrEmpty(this.state.newplanetdescription, "Error: planet needs a description!")
    && this.validateIsNotNullOrEmpty(this.state.newplaneturl, "Error: planet needs a wikipedia url!")
    && this.validateUrl(this.state.newplaneturl, "Error: incorrect wikipedia url!")
    && this.validateIsNotNullOrEmpty(this.state.newplanetimage, "Error: planet needs an image!")
    && this.validateUrl(this.state.newplanetimage, "Error: incorrect image url!")
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
          // 'Accept': 'application/json',
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
    }
  }

  RenderAddPlanetCard(classes) {
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
        <CardActions style={{}}>
        </CardActions>
      </div>) : (
        <div>
        {/* <form className={classes.container} noValidate autoComplete="off"> */}
          <TextField
            required
            id="newplanetname"
            label="Name"
            className={classes.textField}
            margin="normal"
            value={this.state.newplanetname}
            onChange={this.HandleInputChange}
          />
          <TextField
            required
            id="newplanetdistance"
            label="Distance from sun"
            className={classes.textField}
            margin="normal"
            value={this.state.newplanetdistance}
            onChange={this.HandleInputChange}
          />
          <TextField
            required
            id="newplanetmass"
            label="Mass"
            className={classes.textField}
            margin="normal"
            value={this.state.newplanetmass}
            onChange={this.HandleInputChange}
          />
          <TextField
            required
            id="newplanetdiameter"
            label="Diameter (km)"
            value={this.state.newplanetdiameter}
            onChange={this.HandleInputChange}
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
            onChange={this.HandleInputChange}
          />
          <TextField
            required
            id="newplaneturl"
            label="Wikipedia page"
            className={classes.textField}
            margin="normal"
            value={this.state.newplaneturl}
            onChange={this.HandleInputChange}
          />
          <TextField
            required
            id="newplanetimage"
            label="Image url"
            className={classes.textField}
            margin="normal"
            value={this.state.newplanetimage}
            onChange={this.HandleInputChange}
          />
        {/* </form> */}
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

  // Check if url is requesting to view a specific planet. e.g. /planet/earth
  checkRoute() {
    const splitPath = this.props.location.pathname.split('/');
    const planet = splitPath[splitPath.length - 1];
    if (planet != null) {
      this.SelectPlanet(planet);
    }
  }

  render() {
    const { classes } = this.props;
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
            //className={classNames(classes[variant], className)}
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
          autoHideDuration={6000}
          onClose={()=>{this.setState({errorSnackbarOpen:false})}}
        >
          <SnackbarContent
            //className={classNames(classes[variant], className)}
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

        <span style={{}}>
          <IconButton onClick={() => this.ChangeView(0)} aria-label="view-list">
            <ListIcon />
          </IconButton>
          <IconButton onClick={() => this.ChangeView(1)} aria-label="view-list">
            <ListIcon />
          </IconButton>
        </span>
        {this.state.viewMode === 0 ? (
          <div className="planets">
            <List component="nav" className="planets-list">
              {this.RenderPlanetList(classes)}
            </List>
            {this.state.selectedPlanet !== null ? (
              <PlanetCard
                classes={{
                  header: classes.style1header,
                }}
                planet={this.state.selectedPlanet}
                SelectPlanet={this.SelectPlanet}
                style={style1}
              />
            ) : (
              <Card className="planet-info-card" style={{ height: '100%' }}>
                <CardHeader title="No planet selected" />
              </Card>
            )}
          </div>
        ) : (
          <div className="planets" style={{ flex: '1 0 auto' }}>
            <span component="nav" className="planets-list" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {this.RenderPlanetList(classes)}
              {this.RenderAddPlanetCard(classes)}
            </span>
          </div>
        )}
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
