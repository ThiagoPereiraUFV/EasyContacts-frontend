function Footer() {
	return (
		<div className="tw-flex tw-flex-row tw-gap-x-1 tw-justify-center tw-text-white tw-py-2">
			<p>{`Copyright © ${new Date().getFullYear()} | Built with ❤️ by`}</p>
			<a
				href="https://github.com/ThiagoPereiraUFV"
				target="_blank"
				rel="noreferrer"
				className="hover:tw-text-purpleTransparent"
			>
				Thiago Pereira
			</a>
		</div>
	)
}

export default Footer
