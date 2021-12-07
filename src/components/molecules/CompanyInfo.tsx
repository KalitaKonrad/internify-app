import React from 'react';
import { CompanyWithOwner } from '../../interfaces/Job';
import { Line } from '@components/atoms/Line';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useDialog } from '../../hooks/useDialog';
import { useSWRConfig } from 'swr';
import { CompanyForm } from '@components/organisms/CompanyForm';
import { useAxios } from '../../hooks/useAxios';

interface CompanyInfoProps {
  company: CompanyWithOwner;
  isEditing?: boolean;
}

const useStyles = makeStyles((theme) => ({
  infoContainer: {
    maxWidth: 900,
  },
  editButton: {
    top: 25,
    right: 25,
    position: 'absolute',
  },
}));

export const CompanyInfo: React.FC<CompanyInfoProps> = ({ company, isEditing }) => {
  const classes = useStyles();
  const { setDialogChildren, setDialogTitle, setDialogOpen } = useDialog();

  const { mutate } = useSWRConfig();

  const handleClose = () => {
    setDialogOpen(false);
  };

  const axios = useAxios();

  const onSubmit = async (d) => {
    try {
      await axios.patch(`companies/${company.slug}/`, d);
      setDialogOpen(false);
      // TODO: reset key ?
      // mutate('jobs/?page=1');
    } catch (e) {
      console.error(e);
    }
  };

  const onEditClick = () => {
    setDialogTitle('Edit company info');
    setDialogChildren(<CompanyForm company={company} onSubmit={onSubmit} handleClose={handleClose} isEditing />);
    setDialogOpen(true);
  };

  if (!company) {
    return null;
  }

  return (
    <div className={classes.infoContainer}>
      {isEditing && (
        <Button className={classes.editButton} variant="contained" color="primary" onClick={onEditClick}>
          Edit
        </Button>
      )}
      <Line header="Name" description={company.name} />
      <Line header="Description" description={company.description} />
      <Line header="Headquarters" description={company.headquarters} />
      <Line header="Size" description={company.size} />
      {company.establishment && <Line header="Establishment" description={company.establishment} />}
      <Line header="Careers page url" description={company.website_url} />
    </div>
  );
};
