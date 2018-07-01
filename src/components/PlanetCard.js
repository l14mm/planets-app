import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';

// default styles
export const styles = theme => ({
    planetCard:  {
        width:'300px', 
        margin: '2px',
        textAlign: 'left',
        fontSize: '0px'
    },
    image: {width: '100%'},
    header: {backgroundColor:'black', color:'white'},
    content: {backgroundColor:'black',color:'white'},
    info: {fontSize:'12px',paddingBottom:'2px'},
    description: {fontSize:'12px'},
    actions: {backgroundColor:'black',color:'white'},
    randomo: {}
});


class PlanetCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        console.log(classes);
        return (
            <Card type="button" className={classes.planetCard}>
            <CardMedia src={this.props.planet.image} className={classes.media}>
                <img className="planet-image" className={classes.image}
                src={this.props.planet.image} />
            </CardMedia>
            <div>
                <CardHeader title={this.props.planet.name} classes={{title:classes.header}} className={classes.header + " header"} size='20px'/>
                <CardContent className={classes.content + " content"}>
                    <p className={classes.info}>
                    Distance from sun: {this.props.planet.distance + " distance"}
                    </p>
                    <p className={classes.info}>
                    Mass: {this.props.planet.mass + " mass"}
                    </p>
                    <p className={classes.info}>
                    Diameter: {this.props.planet.diameter + " diameter"}
                    </p>
                    <p className={classes.description + " description"}>
                    {this.props.planet.description.substring(0, 300) + "..."}
                    </p>
                </CardContent>
                <CardActions className={classes.actions + " actions"}>
                <a href={this.props.planet.link} target="_blank"
                style={{textDecoration:'none'}}>
                    <Button size="small" className={classes.actions}>
                    Learn More
                    </Button>
                </a>
                </CardActions>
            </div>
            </Card>
        )
}
}

PlanetCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlanetCard);
