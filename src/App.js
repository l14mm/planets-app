import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { withStyles, createMuiTheme, MuiThemeProvider, FlatButton, RaisedButton, getMuiTheme, LightRawTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import ListIcon from '@material-ui/icons/List';
import IconButton from '@material-ui/core/IconButton';
import PlanetCard from './components/PlanetCard';

const apiUrl = 'http://planetsapi20180630123940.azurewebsites.net/';

const styles = {
  appBar: {
    background: 'linear-gradient(45deg, #0F2027 5%, #2C5364 90%)',
    color: 'white',
  },
  earthCard: {
    background: 'linear-gradient(45deg, #0F2027 5%, #2C5364 90%)',
    color: 'white',
  },
  // marsHeader: {
  //   color: 'white',
  // },
  earthHeader: {
    background: 'linear-gradient(45deg, #0F2027 5%, #2C5364 90%)',
    color: 'white',
  },
  
  // style1planetCard:  {
  //   display: 'flex', 
  //   flexDirection: 'row', 
  //   flex: '2 1 0%',
  //   margin: '20px',
  //   textAlign: 'left',
  //   flex: 4,
  //   margin: '20px',
  //   height: '100%',
  // },
  // style1media: {display:'block'},
  // style1image: {display:'inline-block', height:'500px', width:'500px'},
  // style1header: {backgroundColor:'white', color:'black',display:'block'},
  // style1content: {backgroundColor:'white',color:'black',display:'block'},
  // style1info: {fontSize:'12px',paddingBottom:'2px',display:'block'},
  // style1description: {fontSize:'12px'},
  // style1actions: {backgroundColor:'white',color:'black',display:'block'},

  style1planetCard:  {
    flex: 2,
    display: 'inline-flex', 
    flexDirection: 'row', 
    margin: '20px', 
    flexWrap:'wrap',
    alignSelf:'flex-start'
  },
  style1media: {
    flex: 1,
    display: 'grid',
    // float:'left',
    // flexShrink:1
  },
  style1image: {
    width: '100%',
    minWidth:'200px '
  },
  style1header: {backgroundColor:'white', color:'black',display:'block'},
  style1contentContainer: {flex:1,flexShrink:1,textAlign:'left',float:'left',display:'block'},
  style1content: {backgroundColor:'white',color:'black',display:'block'},
  style1info: {fontSize:'12px',paddingBottom:'2px',display:'block'},
  style1description: {fontSize:'12px'},
  style1actions: {backgroundColor:'white',color:'black',display:'block'},

  style2planetCard:  {
    width:'300px', 
    margin: '2px',
    textAlign: 'left',
    fontSize: '0px'
  },
  style2image: {width: '100%'},
  style2header: {backgroundColor:'black', color:'white'},
  style2content: {backgroundColor:'black',color:'white'},
  style2info: {fontSize:'12px',paddingBottom:'2px'},
  style2description: {fontSize:'12px'},
  style2actions: {backgroundColor:'black',color:'white'},
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewMode: 0,
      selectedPlanet: null,
      planets: null,
    };
    this.onPlanetClick.bind(this);
    this.ChangeView.bind(this);
    this.RetrievePlanets.bind(this);
    this.RetrievePlanets();
    this.onPlanetClick("earth");
    this.checkRoute();
  }

  onPlanetClick(planetName) {
    return fetch(`${apiUrl}api/planets/${planetName}`)
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
    return fetch(`${apiUrl}api/planets/getall`)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ planets: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  planetItems(classes) {
    return this.state.planets === null ? null
      : this.state.planets.map((planet, i) => (
        this.state.viewMode === 0 ? (
          <div>
            <ListItem onClick={() => this.onPlanetClick(planet.name)} type="button" key={i} className="planet-container" button>
              <ListItemText>
                <p>
                  {planet.name}
                </p>
              </ListItemText>
            </ListItem>
            <Divider />
          </div>
        ) : (
          <span style={{ padding: '5px' }}>
            <PlanetCard
              classes={{
                planetCard: classes.style2planetCard,
                image: classes.style2image,
                header: classes.style2header,
                content: classes.style2content,
                info: classes.style2info,
                description: classes.style2description,
                actions: classes.style2actions,
              }}
              planet={planet}
              index={i}
              onPlanetClick={this.onPlanetClick}
            />
          </span>)
      ));
  }


  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.checkRoute();
    }
  }

  // Check if url is requesting to view a specific planet
  checkRoute() {
    const splitPath = this.props.location.pathname.split('/');
    const planet = splitPath[splitPath.length - 1];
    if (planet != null) {
      this.onPlanetClick(planet);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Planets App
            </Typography>
          </Toolbar>
        </AppBar>
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
              {this.planetItems(classes)}
            </List>
            {this.state.selectedPlanet !== null ? (
              <PlanetCard
                classes={{
                  planetCard: classes.style1planetCard,
                  media: classes.style1media,
                  image: classes.style1image,
                  contentContainer: classes.style1contentContainer,
                  header: classes.style1header,
                  content: classes.style1content,
                  info: classes.style1info,
                  description: classes.style1description,
                  actions: classes.style1actions,
                }}
                planet={this.state.selectedPlanet}
                onPlanetClick={this.onPlanetClick}
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
              {this.planetItems(classes)}
            </span>
          </div>
        )}
        <div className="footer">
          <p>
            Copyright © 2018 PRETTYPLANETS All rights reserved.
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
