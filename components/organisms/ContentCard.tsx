import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

interface TitleProps {
	text: string
	className?: string
}

interface ContentCardProps extends React.PropsWithChildren<unknown> {
	title: TitleProps
	className?: string
}

function ContentCard({ title, className, children }: ContentCardProps) {
	return (
		<Card className={className}>
			<CardContent>
				<Typography className={title.className} variant="h5" component="div">
					{title.text}
				</Typography>
				{children}
			</CardContent>
		</Card>
	)
}

export default ContentCard
