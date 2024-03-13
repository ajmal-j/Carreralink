import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TokensIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

export function Footer() {
  return (
    <footer className="mb-5 mt-3 w-full rounded-2xl border px-3 py-3 pb-7">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 lg:px-0">
        <div className="inline-flex items-center">
          <span className="flex items-center gap-3">
            <TokensIcon className="size-8 cursor-pointer" />
            <span className="text-xl font-bold">CarreraLink</span>
          </span>
        </div>
        <div className="hidden items-center md:inline-flex">
          <span className="text-sm font-medium text-foreground/60">
            Ready to Get Started ?
          </span>
          <button
            type="button"
            className="ml-2 rounded-md border bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Get Started
          </button>
        </div>
      </div>
      <hr className="my-8" />
      <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 px-4 md:flex-row">
        <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-foreground/80 ">
                Company
              </p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                <li>About us</li>
                <li>Company History</li>
                <li>Our Team</li>
                <li>Our Vision</li>
                <li>Press Release</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-4 px-4 py-4">
        <InstagramLogoIcon className="size-6 cursor-pointer text-foreground/60 hover:text-foreground" />
        <TwitterLogoIcon className="size-6 cursor-pointer text-foreground/60 hover:text-foreground" />
        <GitHubLogoIcon className="size-6 cursor-pointer text-foreground/60 hover:text-foreground" />
        <LinkedInLogoIcon className="size-6 cursor-pointer text-foreground/60 hover:text-foreground" />
      </div>
    </footer>
  );
}
