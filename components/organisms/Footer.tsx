interface FooterProps {
	className?: string
}

function Footer({ className = '' }: FooterProps) {
	return (
		<footer className={className}>
			<p>{`Copyright © ${new Date().getFullYear()} | Built with ❤️ by`}</p>
			<a
				href="https://github.com/ThiagoPereiraUFV"
				target="_blank"
				rel="noreferrer"
				className="hover:tw-text-purpleTransparent"
			>
				Thiago Pereira
			</a>
		</footer>
	)
}

export default Footer
