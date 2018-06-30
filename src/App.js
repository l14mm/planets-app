import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
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



const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const styles = {
  appBar: {
    background: 'linear-gradient(45deg, #0F2027 5%, #2C5364 90%)',
    color: 'white',
  },
  earthCard: {
    background: 'linear-gradient(45deg, #0F2027 5%, #2C5364 90%)',
    color: 'white',
  },
  marsHeader: {
    color: 'white',
  },
  earthHeader: {
    background: 'linear-gradient(45deg, #0F2027 5%, #2C5364 90%)',
    color: 'white',
  },
  learnMoreButton: {
    background: 'black',
    color: 'white',
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planetNames: [
        'Mars',
        'Earth',
        'Jupiter',
        'Saturn',
        'Neptune',
      ],
      selectedPlanet: {
        name: "Earth",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1197px-The_Earth_seen_from_Apollo_17.jpg',
        distance: 2,
        mass: 10,
        diameter: 100,
      },
      viewMode: 1,
      planets: null
    };
    this.onPlanetClick.bind(this);
    this.ChangeView.bind(this);
    this.RetrievePlanets.bind(this);
    this.RetrievePlanets();
  }

  RetrievePlanets() {
    this.setState({planets: []});
  }

  onPlanetClick(planet) {
    this.setState({
      selectedPlanet: {
        name: planet,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1197px-The_Earth_seen_from_Apollo_17.jpg',
        distance: 2,
        mass: 10,
        diameter: 100,
      },
    });
  }

  ChangeView(newMode) {
    this.setState({viewMode: newMode});
    console.log('view mode: ' + this.state.viewMode);
  }

  render() {
    const { classes } = this.props;

    const planetItems = this.state.planets === null ? null 
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
      )
      : this.state.viewMode === 1 ?
      (<span style={{padding:'5px'}}>
        <Card onClick={() => this.onPlanetClick(planet)} type="button" key={i} className="planet-container-card" style={{width:'250px'}}>
        <CardMedia src={planet.image}>
        <img className="planet-image"
        src={planet.image} />
        </CardMedia>
        <CardHeader title={planet.name} classes={{title:classes.marsHeader}} size='20px' style={{backgroundColor:'black', color:'white'}}/>
        <CardContent style={{backgroundColor:'black',color:'white'}}>
        <p className="planet-distance" style={{fontSize:'12px'}}>
          Distance from sun: {planet.distance}
        </p>
        <p className="planet-mass" style={{fontSize:'12px'}}>
          Mass: {planet.mass}
        </p>
        <p className="planet-diameter" style={{fontSize:'12px'}}>
          Diameter: {planet.diameter}
        </p>
        </CardContent>
        <CardActions style={{backgroundColor:'black',color:'white'}}>
          <a href="https://en.wikipedia.org/wiki/Earth" target="_blank"
          style={{textDecoration:'none'}}>
            <Button size="small" className={classes.learnMoreButton}>
              Learn More
            </Button>
          </a>
        </CardActions>
        </Card>
      </span>)
      : this.state.viewMode === 2 ?
      (<span style={{padding:'5px'}}>
        <Card onClick={() => this.onPlanetClick(planet)} type="button" key={i} className="planet-container-card" style={{width:'300px',height:'600px'}} className={classes.earthCard}>
        <CardHeader title={planet.name} size='20px'/>
        <CardMedia src={planet.image}>
        <img className="planet-image"
        src={planet.image} />
        </CardMedia>
        <CardContent>
        <p className="planet-distance" style={{fontSize:'12px'}}>
          Distance from sun: {planet.distance}
        </p>
        <p className="planet-mass" style={{fontSize:'12px'}}>
          Mass: {planet.mass}
        </p>
        <p className="planet-diameter" style={{fontSize:'12px'}}>
          Diameter: {planet.diameter}
        </p>
        </CardContent>
        <CardActions>
          <a href="https://en.wikipedia.org/wiki/Earth" target="_blank"
          style={{textDecoration:'none'}}>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </a>
        </CardActions>
        </Card>
      </span>)
      : 
      (<span style={{padding:'5px'}}>
        <Card onClick={() => this.onPlanetClick(planet)} type="button" key={i} className="planet-container-card" style={{width:'100%'}}>
        <CardHeader title={planet.name} size='20px'/>
        <CardMedia src={planet.image}>
        <img className="planet-image"
        src={planet.image} />
        </CardMedia>
        <CardContent>
        <p className="planet-distance" style={{fontSize:'12px'}}>
          Distance from sun: {planet.distance}
        </p>
        <p className="planet-mass" style={{fontSize:'12px'}}>
          Mass: {planet.mass}
        </p>
        <p className="planet-diameter" style={{fontSize:'12px'}}>
          Diameter: {planet.diameter}
        </p>
        </CardContent>
        <CardActions>
          <a href="https://en.wikipedia.org/wiki/Earth" target="_blank"
          style={{textDecoration:'none'}}>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </a>
        </CardActions>
        </Card>
      </span>)
    ));

    return (
      <div className="App" style={{backgroundColor:'rgb(242,242,242)'}}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Planets App
            </Typography>
          </Toolbar>
        </AppBar>
        <IconButton onClick={() => this.ChangeView(0)} aria-label="view-list">
          <ListIcon />
        </IconButton>
        <IconButton onClick={() => this.ChangeView(1)} aria-label="view-list">
          <ListIcon />
        </IconButton>
        <IconButton onClick={() => this.ChangeView(2)} aria-label="view-list">
          <ListIcon />
        </IconButton>
        <IconButton onClick={() => this.ChangeView(3)} aria-label="view-list">
          <ListIcon />
        </IconButton>
        {this.state.viewMode === 0 ? (
        <div className="planets">
          <List component="nav" className="planets-list">
            {planetItems}
          </List>
          <Card style={{maxWidth: 800}} className="planet-info">
            {this.state.selectedPlanet !== null ? (
              <div>
                <CardHeader title={this.state.selectedPlanet.name} />
                <CardMedia src={this.state.selectedPlanet.image}>
                <img className="planet-image"
                src={this.state.selectedPlanet.image} />
                </CardMedia>
                <CardContent>
                <p className="planet-distance">
                  Distance from sun: {this.state.selectedPlanet.distance}
                </p>
                <p className="planet-mass">
                  Mass: {this.state.selectedPlanet.mass}
                </p>
                <p className="planet-diameter">
                  Diameter: {this.state.selectedPlanet.diameter}
                </p>
                </CardContent>
                <CardActions>
                  <a href="https://en.wikipedia.org/wiki/Earth" target="_blank"
                  style={{textDecoration:'none'}}>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </a>
                </CardActions>
              </div>
            ) : (

              <CardHeader title='No planet selected' />
            )}
          </Card>
        </div>
        ) : (
          <div className="planets" style={{flex:'1 0 auto'}}>
            <span component="nav" className="planets-list"  style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
              {planetItems}
            </span>
          </div>
        )}
        <div className='footer'>
        <p>Copyright © 2018 PRETTYPLANETS All rights reserved.</p>
        </div>
      </div>
    );
  }
}

//export default App;
export default withStyles(styles)(App);
