import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';

function PlanetCard(props) {
  const { classes, planet, style } = props;
  return (
    <Card type="button" style={style.planetCard}>
      <CardMedia src={planet.image} style={style.media}>
        <img
          className="planet-image"
          style={style.image}
          src={planet.image}
          alt="planet"
        />
      </CardMedia>
      <div style={style.contentContainer}>
        <CardHeader
          title={props.planet.name}
          classes={{
            title: classes.header,
          }}
          style={style.header}
          size="20px"
        />
        <CardContent style={style.content}>
          <p style={style.info}>
            {`Distance from sun: ${props.planet.distance} distance`}
          </p>
          <p style={style.info}>
            {`Mass: ${props.planet.mass} mass`}
          </p>
          <p style={style.info}>
            {`Diameter: ${props.planet.diameter} diameter`}
          </p>
          <p style={style.description} className="planet-description">
            {`${props.planet.description.substring(0, 100)}...`}
          </p>
        </CardContent>
        <CardActions style={style.actions}>
          <a
            href={`//${props.planet.link}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
            }}
          >
            <Button size="small" style={style.actions}>
              {'Learn More'}
            </Button>
          </a>
        </CardActions>
      </div>
    </Card>
  )
}

PlanetCard.propTypes = {
    classes: PropTypes.object.isRequired,
    planet: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
};

export default PlanetCard;
