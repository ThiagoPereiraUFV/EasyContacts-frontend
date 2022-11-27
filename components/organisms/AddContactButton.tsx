import { IconButton } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

interface AddContactButtonProps {
	className?: string
	onClick?: () => void
}

function AddContactButton({ className = '', onClick }: AddContactButtonProps) {
	return (
		<IconButton
			className={className}
			sx={{
				border: '0.1px solid #7E7BD785',
				color: '#7E7BD785',
			}}
			onClick={onClick}
			size="large"
		>
			<PersonAddIcon className="tw-text-4xl" />
		</IconButton>
	)
}

export default AddContactButton
