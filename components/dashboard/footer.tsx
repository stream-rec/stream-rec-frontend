import {Link} from "@/i18n";
import {APP_VERSION} from "@/lib/version";

export function Footer() {
  return (
      <div className="supports-backdrop-blur:bg-background/60 z-20 w-full shadow bg-background/95 backdrop-blur">
        <div className="mx-4 md:mx-8 flex h-14 items-center">
          <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
            Powered by {" "}
            <Link
                href="https://github.com/hua0512/stream-rec"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
            >
              Stream-rec
            </Link>
            . WebUI version: {APP_VERSION}
          </p>
        </div>
      </div>
  );
}
