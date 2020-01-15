import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';

const styles = theme => ({
    Note: {
        //padding: theme.spacing(8, 0, 6),
    }
});

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};// You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({text: value})
    }

    render() {
        const {classes} = this.props;
        return (
            <ReactQuill value={this.state.text}
                        onChange={this.handleChange} className={classes.Note}/>
        )
    }
}

Note.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Note);