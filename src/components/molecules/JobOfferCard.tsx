import React from 'react';
import { Box, Button, Paper } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { JobWithCompanyAndOwner } from '../../interfaces/Job';
import { JobOfferAvatar } from '@components/atoms/JobOfferCard/JobOfferAvatar';
import { JobOfferCompanyInfo } from '@components/atoms/JobOfferCard/JobOfferCompanyInfo';
import { JobOfferGeneralInfo } from '@components/atoms/JobOfferCard/JobOfferGeneralInfo';
import { makeStyles } from '@material-ui/core/styles';
import { LinkWrapper } from '@components/atoms/LinkWrapper';
import { DangerButton } from '@components/atoms/DangerButton';
import { useAxios } from '../../hooks/useAxios';

interface OfferCardProps {
  job: JobWithCompanyAndOwner;
  isOwner?: boolean;
}

const useStyles = makeStyles(() => ({
  paper: {
    maxWidth: 1000,
    width: '100%',
  },
  offerCard: {
    transition: 'all 0.3s',
    '&:hover': {
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    },
  },
}));

export const JobOfferCard: React.FC<OfferCardProps> = ({ job, isOwner }) => {
  const classes = useStyles();

  const axios = useAxios();

  const onDelete = async (e) => {
    e.stopPropagation();

    try {
      await axios.delete('jobs/', {
        data: {
          slug: job.slug,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LinkWrapper href={`/jobs/${job.slug}`} className={classes.offerCard}>
      <BoxCenter minWidth={isOwner ? 1000 : 850}>
        <Paper elevation={2} className={classes.paper}>
          <BoxCenter mx={4} my={3}>
            <JobOfferAvatar job={job} />
            <JobOfferCompanyInfo job={job} />
            <JobOfferGeneralInfo job={job} />
            {isOwner && (
              <BoxCenter flexDirection="column" ml={2} gridGap={10}>
                <Button color="primary" variant="outlined">
                  Edit
                </Button>
                <DangerButton variant="outlined" onClick={onDelete}>
                  Delete
                </DangerButton>
              </BoxCenter>
            )}
          </BoxCenter>
        </Paper>
      </BoxCenter>
    </LinkWrapper>
  );
};
