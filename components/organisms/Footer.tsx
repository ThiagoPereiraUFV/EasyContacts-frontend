function Footer() {
	return (
		<div className="tw-flex tw-flex-row tw-gap-x-1 tw-justify-center">
			<p>{`Copyright © ${new Date().getFullYear()} | Built with ❤️ by`}</p>
			<a
				href="https://github.com/ThiagoPereiraUFV"
				target="_blank"
				rel="noreferrer"
			>
				Thiago Pereira
			</a>
		</div>
	)
}

export default Footer
