import * as React from "react";

import { cn } from "~/lib/utils";
import { Icons } from "~/components/icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form, useSearchParams } from "@remix-run/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  signup?: boolean;
  dark?: boolean;
}

export function UserAuthForm({
  className,
  signup = false,
  dark,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const error = searchParams.get("error") === "true";
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form method="post">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
            <input
              type="hidden"
              name="register"
              value={JSON.stringify(signup)}
            />
          </div>
          <Button
            disabled={isLoading}
            onSubmit={onSubmit}
            variant={dark ? "secondary" : "default"}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {signup ? "Sign Up" : "Log In"}
          </Button>
          {error && <p className="text-red-500 text-center">Login failed</p>}
        </div>
      </Form>

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  );
}
