import React, { useEffect } from 'react';
import { Button, Checkbox, TextField } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { DangerButton } from '@components/atoms/DangerButton';
import { Company } from '../../interfaces/Company';
import { CompanyWithOwner, Job, JobWithCompanyAndOwner } from '../../interfaces/Job';

export interface IPostEditOffer {
  title: string;
  description: string;
  salary_min?: number;
  salary_max?: number;
  experience: number;
  is_remote?: boolean;
}

interface JobFormProps {
  onSubmit: (data: IPostEditOffer) => void;
  handleClose: () => void;
  isEditing?: boolean;
  job?: Job | JobWithCompanyAndOwner;
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
  title: yup.string().required(),
  description: yup.string().required(),
  experience: yup.number().required().positive(),
  salary_min: yup.number().optional(),
  salary_max: yup.number().optional(),
  is_remote: yup.boolean().optional(),
});

export const JobForm: React.FC<JobFormProps> = ({ onSubmit, handleClose, job, isEditing }) => {
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

  // set initial values to values from job if its present
  useEffect(() => {
    if (job) {
      Object.entries(job).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, []);

  return (
    <form className={classes.container}>
      <div className={classes.fieldContainer}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              className={classes.fullWidth}
              required
              error={errors.title}
              helperText={errors.title && 'Title is required'}
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
            name="salary_min"
            render={({ field: { onChange, value } }) => (
              <TextField
                id="salary_min"
                className={classes.fullWidth}
                label="Minimum Salary"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={errors.salary_min}
                helperText={errors.salary_min && 'Minimum salary must be less than max salary'}
              />
            )}
          />
        </div>
        <div className={classes.fieldContainer}>
          <Controller
            control={control}
            name="salary_max"
            render={({ field: { onChange, value } }) => (
              <TextField
                id="salary_max"
                className={classes.fullWidth}
                label="Maximum Salary"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={errors.salary_max}
                helperText={errors.salary_max && 'Maximum salary must be greater than min salary'}
              />
            )}
          />
        </div>
      </BoxCenter>
      <div className={classes.fieldContainer}>
        <Controller
          control={control}
          name="experience"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="experience"
              label="Experience (years)"
              variant="outlined"
              value={value}
              onChange={onChange}
              required
              error={errors.experience}
              helperText={errors.experience && 'Experience is required'}
              className={classes.fullWidth}
            />
          )}
        />
      </div>
      <div className={classes.checkboxContainer}>
        <Controller
          control={control}
          name="is_remote"
          render={({ field: { onChange, value } }) => (
            <div className={classes.checkboxComponentWrapper}>
              <Checkbox onChange={(e) => onChange(e.target.checked)} value={value} />
              <div className={classes.typography}>Remote work</div>
            </div>
          )}
        />
      </div>
      <div className={classes.submissionContainer}>
        <div className={clsx(classes.submissionBox, classes.editActionsContainer)}>
          <div>
            <DangerButton onClick={handleClose} variant="outlined">
              Cancel
            </DangerButton>
          </div>
          <div>
            <Button type="submit" onClick={handleSubmit(onSubmit)} color="primary" variant="contained">
              {isEditing ? 'Edit' : 'Post'} job
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
