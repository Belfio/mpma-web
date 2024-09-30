import { UserAuthForm } from "~/components/UserAuthForm";
import { Link } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export default function LoginPage() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 h-screen gradient-background" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            {/* <img src={Logo} alt="GL1" className="w-[120px]" /> */}
            <h1>MPMA</h1>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">Green lending made simple</p>
              {/* <footer className="text-sm">Green lending made simple</footer> */}
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 ">
          <Link
            to="/register"
            className="absolute right-4 top-4 md:right-8 md:top-8 text-lg"
          >
            <blockquote className="space-y-2">
              <p className="text-lg">Create new account</p>
              {/* <footer className="text-sm">Green lending made simple</footer> */}
            </blockquote>
          </Link>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login
              </p>
            </div>
            <UserAuthForm />
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
      </div>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/login?error=true",
  });
}
export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}
