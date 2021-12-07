import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, TextField } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import clsx from 'clsx';
import { DangerButton } from '@components/atoms/DangerButton';
import * as yup from 'yup';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Company } from '../../interfaces/Company';
import { CompanyWithOwner } from '../../interfaces/Job';

interface CompanyFormProps {
  onSubmit: (data) => void;
  handleClose: () => void;
  isEditing?: boolean;
  company?: Company | CompanyWithOwner;
}

const useStyles = makeStyles((propTheme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  bold: {
    fontWeight: 600,
  },
  fullWidth: {
    width: '100%',
    padding: '0 0.25rem',
  },
  title: {
    marginTop: '2rem',
    paddingLeft: '0.25rem',
  },
  fieldContainer: {
    width: '100%',
    paddingTop: propTheme.spacing(2),
    paddingBottom: propTheme.spacing(2),
  },
  checkboxContainer: {
    width: '100%',
  },
  submissionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: propTheme.spacing(3),
    paddingBottom: propTheme.spacing(1),
  },
  leftButtonWrapper: {
    display: 'flex',
    marginRight: propTheme.spacing(1),
    width: 180,
  },
  rightButtonWrapper: {
    display: 'flex',
    marginLeft: propTheme.spacing(1),
    width: 180,
  },
  submissionBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  typography: {
    display: 'flex',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  checkboxComponentWrapper: {
    display: 'flex',
  },
  priorityEventOverriding: {
    marginTop: '0.5rem',
  },
  editActionsContainer: {
    marginTop: '1rem',
  },
}));

const schema = yup.object().shape({
  name: yup.string().required(),
  // establishment: yup.string().optional(),
  website_url: yup.string().required(),
  headquarters: yup.string().required(),
  description: yup.string().required(),
  size: yup.number().required().positive(),
});

export const CompanyForm: React.FC<CompanyFormProps> = ({ company, handleClose, onSubmit, isEditing }) => {
  const classes = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  // set initial values to values from comapny if its present
  useEffect(() => {
    const companyKeys: Record<keyof Company, boolean> = {
      id: true,
      name: true,
      // establishment: true,
      website_url: true,
      description: true,
      slug: true,
      size: true,
      headquarters: true,
    };

    if (company) {
      Object.entries(company).forEach(([key, value]) => {
        if (key in companyKeys) {
          setValue(key, value);
        }
      });
    }
  }, []);

  return (
    <form className={classes.container}>
      <div className={classes.fieldContainer}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              className={classes.fullWidth}
              required
              error={errors.title}
              helperText={errors.title && 'Name is required'}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className={classes.fieldContainer}>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="description"
              className={classes.fullWidth}
              multiline
              minRows={10}
              required
              label="Description"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={errors.description}
              helperText={errors.description && 'Description is required'}
            />
          )}
        />
      </div>
      <BoxCenter>
        <div className={classes.fieldContainer}>
          <Controller
            control={control}
            name="website_url"
            render={({ field: { onChange, value } }) => (
              <TextField
                id="website_url"
                className={classes.fullWidth}
                label="Careers page url"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={errors.website_url}
                helperText={errors.website_url && 'Careers page url is required'}
              />
            )}
          />
        </div>
        <div className={classes.fieldContainer}>
          <Controller
            control={control}
            name="headquarters"
            render={({ field: { onChange, value } }) => (
              <TextField
                id="headquarters"
                className={classes.fullWidth}
                label="Headquarters"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={errors.headquarters}
                helperText={errors.headquarters && 'Headquarters is required'}
              />
            )}
          />
        </div>
      </BoxCenter>
      <div className={classes.fieldContainer}>
        <Controller
          control={control}
          name="size"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="size"
              label="Company size"
              variant="outlined"
              value={value}
              onChange={onChange}
              required
              error={errors.size}
              helperText={errors.size && 'Company size is required'}
              className={classes.fullWidth}
            />
          )}
        />
      </div>
      {/*<div className={classes.fieldContainer}>*/}
      {/*  <Controller*/}
      {/*    control={control}*/}
      {/*    name="establishment"*/}
      {/*    render={({ field: { onChange, value } }) => (*/}
      {/*      <TextField*/}
      {/*        id="establishment"*/}
      {/*        label="Establishment year"*/}
      {/*        variant="outlined"*/}
      {/*        value={value}*/}
      {/*        onChange={onChange}*/}
      {/*        required*/}
      {/*        error={errors.establishment}*/}
      {/*        helperText={errors.establishment && 'Establishment must be a positive number'}*/}
      {/*        className={classes.fullWidth}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  />*/}
      {/*</div>*/}
      <div className={classes.submissionContainer}>
        <div className={clsx(classes.submissionBox, classes.editActionsContainer)}>
          <div>
            <DangerButton onClick={handleClose} variant="outlined">
              Cancel
            </DangerButton>
          </div>
          <div>
            <Button type="submit" onClick={handleSubmit(onSubmit)} color="primary" variant="contained">
              {isEditing ? 'Edit' : 'Add'} company
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
