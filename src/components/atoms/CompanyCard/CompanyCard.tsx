import { BoxCenter } from '@components/atoms/BoxCenter';
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
import { useRouter } from 'next/router';

interface CompanyCardProps {
  company: CompanyWithOwner;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    minHeight: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 140,
  },
});

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => router.push(`companies/${company.slug}`)}>
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
            {company.description?.length > 100 ? `${company.description.substring(0, 100)}...` : company.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <BoxCenter flexGrow={1} justifyContent="flex-end">
          <Button color="primary" variant="contained" onClick={() => router.push(`companies/${company.slug}`)}>
            Check offers
          </Button>
        </BoxCenter>
      </CardActions>
    </Card>
  );
};

export default CompanyCard;
