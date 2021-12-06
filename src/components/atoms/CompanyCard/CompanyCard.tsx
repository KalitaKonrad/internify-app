import { Avatar, Paper } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { JobOfferAvatar } from '@components/atoms/JobOfferCard/JobOfferAvatar';
import { JobOfferCompanyInfo } from '@components/atoms/JobOfferCard/JobOfferCompanyInfo';
import { JobOfferGeneralInfo } from '@components/atoms/JobOfferCard/JobOfferGeneralInfo';
import React from 'react';
import { CompanyWithOwner } from '../../../interfaces/Job';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface CompanyCardProps {
  company: CompanyWithOwner;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/*@ts-ignore*/}
        {company?.photo ? (
          <CardMedia
            className={classes.media}
            // @ts-ignore
            image={company.photo}
            title="Contemplative Reptile"
          />
        ) : (
          <div>image placeholder</div>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {company.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {company.description?.length > 60 ? `${company.description.substring(0, 60)}...` : company.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <BoxCenter flexGrow={1} justifyContent="flex-end">
          <Button color="primary" variant="contained">
            Learn More
          </Button>
        </BoxCenter>
      </CardActions>
    </Card>
  );
};

export default CompanyCard;
