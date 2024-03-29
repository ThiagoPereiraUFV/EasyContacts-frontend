import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import H5 from 'components/atoms/H5'

interface ButtonProps {
	label: string
	onClick: () => void
	className?: string
}

interface TitleProps {
	text: string
	className?: string
}

interface SubtitleProps {
	text: string
	className?: string
}

interface BodyProps {
	text: string
	className?: string
}

interface JumbotronProps {
	title: TitleProps
	subtitle: SubtitleProps
	body?: BodyProps
	button?: ButtonProps
	className?: string
}

function Jumbotron({
	title,
	subtitle,
	body,
	button,
	className,
}: JumbotronProps) {
	return (
		<Card className={className}>
			<CardContent>
				<Typography className={title.className} variant="h1" component="div">
					{title.text}
				</Typography>
				<H5 className={subtitle.className}>{subtitle.text}</H5>
				{body && (
					<Typography className={body.className} variant="body1">
						{body.text}
					</Typography>
				)}
			</CardContent>
			{button && (
				<CardActions>
					<Button
						className={button.className}
						variant="contained"
						onClick={button.onClick}
						size="large"
					>
						{button.label}
					</Button>
				</CardActions>
			)}
		</Card>
	)
}

export default Jumbotron
