"use client";

import ReviewAccessButton from "@/components/Buttons/ReviewAccess";
import Title from "@/components/Custom/Title";
import { CustomForm } from "@/components/FormsAndDialog/CustomForm";
import MainText from "@/components/Layout/MainText";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { googleLogin } from "@/services/user.service";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { LogInAction } from "./actions";

const formSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(8, "password must be at least 8 characters"),
});

export default function Login() {
  const router = useRouter();
  const defaultValues: z.infer<typeof formSchema> = {
    email: "",
    password: "",
  };

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = (await LogInAction(values)) as any;
      if (response === 403) {
        toast({
          title: "Please verify your account",
          variant: "destructive",
        });
        router.push(`/verify?email=${values.email}`);
      } else if (response?.status === 200) {
        toast({
          title: "LogIn successful",
          duration: 2000,
        });
        router.push("/");
      } else {
        const message = getMessage(response);
        toast({
          title: message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      // const message = getMessage(error);
      // toast({
      //   title: message,
      //   variant: "destructive",
      // });
    }
  };
  const signInWithGoogle = async ({
    credential,
  }: {
    credential: {
      email: string;
      name: string;
      picture: string;
    };
  }) => {
    try {
      const response = await googleLogin(credential);
      toast({
        title: "LogIn successful",
        duration: 2000,
      });
      if (response === 403) {
        toast({
          title: "Please verify your account",
          variant: "destructive",
        });
        router.push(`/verify?email=${credential?.email}`);
      } else if (response?.status === 200) {
        localStorage.setItem("userToken", response?.data?.data?.token);
        toast({
          title: "LogIn successful",
          duration: 2000,
        });
        router.push("/");
      } else {
        const message = getMessage(response);
        toast({
          title: message,
          variant: "destructive",
        });
      }
    } catch (error) {
      const message = getMessage(error);
      console.log(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex min-h-screen justify-stretch bg-cover bg-center bg-no-repeat">
      <div className="hidden w-full max-w-[600px] items-center justify-center rounded-r-3xl bg-primaryColor p-10 md:flex">
        <div className="flex h-full max-h-[500px] w-full flex-col items-center justify-center">
          <Title className="ms-[-10px]" height={80} width={200} />
          <MainText text="Transforming Job Hunting into Job Finding!" />
        </div>
      </div>
      <div className="me-auto flex w-full min-w-[350px] flex-col items-center justify-center rounded-3xl bg-background  px-3 py-32">
        <span className="hidden pb-6 text-2xl font-semibold text-foreground/90 md:inline-block">
          Login
        </span>
        <Title className="block pb-10 md:hidden" />
        <div className="w-full max-w-[370px]">
          <CustomForm
            formSchema={formSchema}
            defaultValues={defaultValues}
            onSubmit={onsubmit}
            action="Login"
            comment={
              <>
                <span className="text-foreground/70">
                  Don&apos;t you have an account?{" "}
                </span>
                <Link className="underline" href={"/signup"}>
                  Signup
                </Link>
              </>
            }
          />
        </div>
        <ReviewAccessButton
          onsubmit={onsubmit}
          email="ajmaljaleel8589946195@gmail.com"
          password="ajmaljaleel"
        />
        <div className="z-20 mt-5 flex h-14 w-full max-w-[370px] items-center justify-center rounded-full bg-white">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (!credentialResponse?.credential) return alert("error");
              const decoded = jwtDecode(credentialResponse?.credential);
              const { email, name, picture }: any = decoded;
              signInWithGoogle({ credential: { email, name, picture } });
            }}
            onError={() => {
              alert("error");
            }}
            text="continue_with"
            shape="pill"
            logo_alignment="center"
            locale="en"
            useOneTap={true}
          />
        </div>
      </div>
    </div>
  );
}
