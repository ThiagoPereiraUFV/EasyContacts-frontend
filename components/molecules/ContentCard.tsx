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
	classNameBody?: string
}

function ContentCard({
	title,
	className,
	classNameBody,
	children,
}: ContentCardProps) {
	return (
		<Card className={className}>
			<Typography className={title.className} variant="h5" component="div">
				{title.text}
			</Typography>
			<CardContent className={classNameBody}>{children}</CardContent>
		</Card>
	)
}

export default ContentCard
