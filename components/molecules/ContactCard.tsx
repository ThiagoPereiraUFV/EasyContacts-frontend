import * as React from 'react'
import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { IContact } from 'types/contact'

interface IContactCardProps
	extends React.HTMLAttributes<HTMLDivElement>,
		React.Attributes {
	contact: IContact
}

function ContactCard({ className, contact, onClick }: IContactCardProps) {
	return (
		<Card className={className} sx={{ maxWidth: 345 }} onClick={onClick}>
			<CardMedia
				component="img"
				height="140"
				image="/avatar.png"
				alt="green iguana"
			/>
			<CardContent className="tw-text-white">
				<Typography
					className="tw-text-center tw-m-0"
					gutterBottom
					variant="h5"
					component="div"
				>
					{contact.name} {contact.surname}
				</Typography>
			</CardContent>
			{/* <CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Learn More</Button>
			</CardActions> */}
		</Card>
	)
}

export default ContactCard
