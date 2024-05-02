import { signIn } from "../../auth";

export async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", {redirectTo:"/simulator"});
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
