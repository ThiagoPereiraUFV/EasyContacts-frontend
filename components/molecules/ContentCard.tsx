import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import H5 from 'components/atoms/H5'

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
			<H5 className={title.className}>{title.text}</H5>
			<CardContent className={classNameBody}>{children}</CardContent>
		</Card>
	)
}

export default ContentCard
