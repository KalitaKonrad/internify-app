import React, { ChangeEvent } from 'react';
import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      color: theme.palette.common.white,
      position: 'relative',
      borderRadius: 25,
      backgroundColor: alpha(theme.palette.success.main, 0.9),
      '&:hover': {
        backgroundColor: alpha(theme.palette.success.main, 0.96),
      },
      transition: 'background-color 0.2s ease',
      // marginRight: theme.spacing(2),
      // marginLeft: 0,
      // width: '100%',
      // [theme.breakpoints.up('sm')]: {
      //   marginLeft: theme.spacing(3),
      //   width: 'auto',
      // },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      color: 'white',
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

interface SearchBarProps {
  onChange: (val: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={onChange}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};
