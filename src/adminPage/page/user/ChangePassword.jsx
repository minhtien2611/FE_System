import * as React from 'react';
import ReactDOM from 'react-dom';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Combobox, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { changePass } from '../../../api/apiServices';

export default function ChangePassword(props) {

	// Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xs');

  // Declare global variables to create product
  const { open, close } = props;

	const [alertError, setAlertError] = React.useState("");
	console.log(alertError)

  const [data, setData] = React.useState({
    oldPass: "",
    newPass: "",
		confirmPass: "",
  });

	const [error, setError] = React.useState({
    oldPass: "",
    newPass: "",
		confirmPass: "",
  });

  const validation = () => {
    let msg = {}
    if (data.oldPass === "") {
      msg.oldPass = "Do not empty the field!"
    } else if (alertError !== "") {
      msg.oldPass = alertError
    } if (data.newPass === "") {
      msg.newPass = "Do not empty the field!"
    } else if (data.newPass.length < 6) {
      msg.newPass = "Password must be greater than 6!"
    } if (data.confirmPass === "") {
      msg.confirmPass = "Do not empty the field!"
    } if (data.confirmPass !== data.newPass) {
      msg.confirmPass = "Password do not match!"
    }
    
    setError(msg)
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };

	const handleChangeInput = (e) => {
    let {name, value} = e.target;
    setData({...data, [name]: value})
    setError({...error, [name]: ""})
  }

  const clearState = () => {
		setError({
      oldPass: "",
			newPass: "",
			confirmPass: "",
    })
    setData({
      oldPass: "",
			newPass: "",
			confirmPass: "",
    })
    close()
  }

	const handleClose = () => {
    clearState()
    close()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      oldPass: data.oldPass,
			newPass: data.newPass,
			confirmPass: data.confirmPass,
    }

		console.log(updatedData)

		const isValid = validation()
    if (isValid){

    // Change password
    await changePass(updatedData)
      .then((response) => {
				console.log(response.data.data)
        clearState();
      })
      .catch((error) => {
				if (error.response.status === 500) {
					console.log(error.response.data.result);
					console.log(error);
					setAlertError(error.response.data.message);
				}
      })

		}
  }
  

  return (
    <div>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Change password
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={close}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div className='grid gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="oldPass"
                      value="Old password"
                    />
                  </div>
                  <TextInput
                    id="oldPass"
                    name="oldPass"
                    placeholder="Old password"
                    required
                    type="password"
                    value={data.oldPass}
                    onChange={handleChangeInput}
                  />
									<p class="mt-1 text-sm text-red-500"> 
										{error.oldPass}
									</p>
                </div>
              </div>

							<div className='grid gap-2'>
								<div>
									<div className="mb-2 block">
										<Label
											htmlFor="newPass"
											value="New password"
										/>
									</div>
									<TextInput
										id="newPass"
										name="newPass"
										placeholder="New password"
										required
										type="password"
										value={data.newPass}
										onChange={handleChangeInput}
									/>
									<p class="mt-1 text-sm text-red-500"> 
										{error.newPass}
									</p>
								</div>
              </div>

							<div className='grid gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="confirmPass"
                      value="Password confirmation"
                    />
                  </div>
                  <TextInput
                    id="confirmPass"
                    name="confirmPass"
                    placeholder="Password confirmation"
                    required
                    type="password"
                    value={data.confirmPass}
                    onChange={handleChangeInput}
                  />
									<p class="mt-1 text-sm text-red-500"> 
										{error.confirmPass}
									</p>
                </div>
              </div>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}