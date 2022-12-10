interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function Footer({ className = '' }: FooterProps) {
	return (
		<footer className={className}>
			<p className="tw-mt-auto">{`Copyright © ${new Date().getFullYear()} | Built with ❤️ by`}</p>
			<a
				href="https://github.com/ThiagoPereiraUFV"
				target="_blank"
				rel="noreferrer"
				className="tw-mt-auto hover:tw-text-purpleTransparent"
			>
				Thiago Pereira
			</a>
		</footer>
	)
}

export default Footer
