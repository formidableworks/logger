import { makeStyles } from '@material-ui/core/styles';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { Severity } from '../logger.types';

const useStyles = makeStyles((theme) => ({
  icon: { marginRight: theme.spacing(0.5), height: 18, width: 18 },
}));

interface Props {
  severity: Severity;
}
export function LoggerSnackbarIcon(props: Props): JSX.Element {
  const { severity } = props;
  const classes = useStyles();
  switch (severity) {
    case 'debug':
      return <BugReportOutlinedIcon color="inherit" className={classes.icon} />;
    case 'info':
      return <InfoOutlinedIcon color="inherit" className={classes.icon} />;
    case 'warn':
      return <ReportProblemOutlinedIcon color="inherit" className={classes.icon} />;
    case 'error':
      return <ErrorOutlineRoundedIcon color="inherit" className={classes.icon} />;
    default: {
      const exhaustiveSeverityValues: never = severity;
      throw new Error(`Unhandled severity case: ${exhaustiveSeverityValues}`);
    }
  }
}
