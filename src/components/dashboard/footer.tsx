import { Link } from "@/src/i18n/routing"
import { APP_VERSION } from "@/src/lib/version"

export function Footer() {
	return (
		<div className='z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='mx-4 flex h-14 items-center md:mx-8'>
				<p className='text-left text-xs leading-loose text-muted-foreground md:text-sm'>
					Powered by{" "}
					<Link
						href='https://github.com/stream-rec/stream-rec'
						target='_blank'
						rel='noopener noreferrer'
						className='font-medium underline underline-offset-4'
					>
						Stream-rec
					</Link>
					. WebUI version: {APP_VERSION}
				</p>
			</div>
		</div>
	)
}
