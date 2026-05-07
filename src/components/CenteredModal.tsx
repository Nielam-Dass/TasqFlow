import type { JSX } from '@emotion/react/jsx-runtime';
import { Box, Modal } from '@mui/material'
import type { PropsWithChildren } from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type CenteredModalProps = {
  open: boolean;
  onClose(): void;
}

/**
 * Component to display content within a centered modal
 * 
 * @param props Component props object
 * @param props.open Boolean indicating if the modal should be open
 * @param props.onClose Function to call when the modal is closed
 * @param props.children React node children of the component
 * @returns JSX element for the centered modal
 */
function CenteredModal(props: CenteredModalProps & PropsWithChildren): JSX.Element {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box sx={style}>
        {props.children}
      </Box>
    </Modal>
  )
}

export default CenteredModal
