import { JobWithCompanyAndOwner } from '../../../interfaces/Job';
import React, { cloneElement, isValidElement, ReactNode } from 'react';
import { BoxCenter } from '@components/atoms/BoxCenter';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { formatPublishDate } from '@components/atoms/JobOfferCard/JobOfferGeneralInfo';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface DescriptionInfoProps {
  job: JobWithCompanyAndOwner;
}

interface DescriptionCardProps {
  title: string | number;
  subtitle: string;
  icon: ReactNode;
}
const useStyles = makeStyles((theme) => ({
  boxIcon: {
    borderRadius: '50%',
    padding: 5,
    border: `1px solid ${theme.palette.secondary.light}`,
  },
  text: {
    textAlign: 'center',
  },
}));

const DescriptionCard: React.FC<DescriptionCardProps> = ({ title, subtitle, icon }) => {
  const classes = useStyles();

  const IconElement = (() => {
    if (isValidElement(icon)) {
      return cloneElement(icon, {
        className: classes.boxIcon,
        fontSize: 'large',
      });
    }
  })();

  return (
    <Box boxShadow={2} borderRadius={25} p={2} minWidth={150}>
      <BoxCenter flexDirection="column">
        <BoxCenter>{IconElement}</BoxCenter>
        <Typography variant="body1" className={classes.text}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.text}>
          {subtitle}
        </Typography>
      </BoxCenter>
    </Box>
  );
};

export const DescriptionInfo: React.FC<DescriptionInfoProps> = ({ job }) => {
  return (
    <BoxCenter display="flex">
      <BoxCenter mx={1}>
        <DescriptionCard title={job.company.name} subtitle="Company name" icon={<BusinessIcon color="secondary" />} />
      </BoxCenter>
      <BoxCenter mx={1}>
        {/*TODO: add job company size*/}
        <DescriptionCard title={50} subtitle="Company size" icon={<PeopleIcon color="secondary" />} />
      </BoxCenter>
      <BoxCenter mx={1}>
        {/*TODO: add job.experience */}
        <DescriptionCard title={`${5} Years`} subtitle="Exp. lvl" icon={<ShowChartIcon color="secondary" />} />
      </BoxCenter>
      <BoxCenter mx={1}>
        <DescriptionCard
          title={formatPublishDate(job.published)}
          subtitle="Posted"
          icon={<TimelapseIcon color="secondary" />}
        />
      </BoxCenter>
    </BoxCenter>
  );
};
