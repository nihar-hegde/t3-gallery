import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";

export const TopNav = () => {
  return (
    <nav className="flex h-24 w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div className="">Gallery</div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
