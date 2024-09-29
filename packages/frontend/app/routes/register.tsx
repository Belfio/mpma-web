import { UserAuthForm } from "~/components/UserAuthForm";
import { Link } from "@remix-run/react";

export default function RegisterPage() {
  return (
    <>
      <div className=" relative  h-screen flex-col items-center justify-center  w-screen">
        <div className="relative  h-full flex-col p-10 text-white dark:border-r lg:flex  bg-[var(--darkblue)]">
          <div className="relative z-20 ">
            {/* <img src={Logo} alt="GL1" className="w-[120px]" /> */}
            <h1>MPMA</h1>
          </div>
          <div className="h-full flex flex-col justify-center items-center ">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] z-20 mb-[120px] bg-primary px-12 ">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                  Create a new account
                </h1>
                <p className="text-sm text-white">
                  Enter your email below to create a new account
                </p>
              </div>
              <UserAuthForm signup={true} dark={true} />
              {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">Green lending made simple</p>
              {/* <footer className="text-sm">Green lending made simple</footer> */}
            </blockquote>
          </div>
          <Link
            to="/login"
            className="absolute right-4 top-4 md:right-8 md:top-8 z-20 text-lg"
          >
            <blockquote className="space-y-2">
              <p className="text-lg">Go to login</p>
              {/* <footer className="text-sm">Green lending made simple</footer> */}
            </blockquote>
          </Link>
        </div>
      </div>
    </>
  );
}
