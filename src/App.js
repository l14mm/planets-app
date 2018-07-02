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
import style1 from './style1';
import style2 from './style2';

const apiUrl = 'http://planetsapi20180630123940.azurewebsites.net/';

const styles = {
  appBar: {
    background: 'linear-gradient(45deg, #0F2027 5%, #2C5364 90%)',
    color: 'white',
  },
  style2header: {
    backgroundColor: 'black',
    color: 'white',
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewMode: 1,
      selectedPlanet: null,
      planets: null,
    };
    this.SelectPlanet.bind(this);
    this.ChangeView.bind(this);
    this.RetrievePlanets.bind(this);
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

  RenderAddPlanetCard(classes) {
    console.log("{this.RenderAddPlanetCard(classes)}");
    return 
    (<div style={{display:'block',fontSize:'20px'}}>Hello!</div>)
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
        <span style={{}}>
          <IconButton onClick={() => this.ChangeView(0)} aria-label="view-list">
            <ListIcon />
          </IconButton>
              {this.RenderAddPlanetCard()}
        </span>
        {this.state.viewMode === 0 ? (
          <div className="planets">
            <List component="nav" className="planets-list">
              {this.RenderAddPlanetCard(classes)}
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
              {this.RenderAddPlanetCard(classes)}
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
