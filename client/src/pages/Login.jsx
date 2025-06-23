import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();
  const [currentAction, setCurrentAction] = useState(null);

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    setCurrentAction(type);
    await action(inputData);
  };

  useEffect(() => {
    if (currentAction === "signup") {
      if (registerIsSuccess && registerData) {
        toast.success(registerData.message || "Signup successful✅");
        setSignupInput({ name: "", email: "", password: "" });
      }
      if (!registerIsLoading && !registerIsSuccess && registerError) {
        toast.error(registerError.data?.message || "Signup failed❌");
      }
    }

    if (currentAction === "login") {
      if (loginIsSuccess && loginData) {
        toast.success(loginData.message || "Login successful✅");
        setLoginInput({ email: "", password: "" });
        navigate("/");
      }
      if (!loginIsLoading && !loginIsSuccess && loginError) {
        toast.error(loginError.data?.message || "Login failed❌");
      }
    }
  }, [
    currentAction,
    registerIsSuccess,
    registerData,
    registerError,
    registerIsLoading,
    loginIsSuccess,
    loginData,
    loginError,
    loginIsLoading,
  ]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0F172A] dark:bg-black px-4 py-20">
      <div className="w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-xl shadow-lg p-6 sm:p-8">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 dark:text-white">Sign Up</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Create a new account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="name"
                    value={signupInput.name}
                    type="text"
                    placeholder="Eg. Aryan Talekar"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="email"
                    value={signupInput.email}
                    type="email"
                    placeholder="Eg. aryantalekar@gmail.com"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="password"
                    value={signupInput.password}
                    type="password"
                    placeholder="Eg. aryan@T123"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                  className="w-full"
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="login">
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 dark:text-white">Login</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Log in to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    onChange={(e) => changeInputHandler(e, "login")}
                    name="email"
                    value={loginInput.email}
                    type="email"
                    placeholder="Eg. aryantalekar@gmail.com"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    type="password"
                    placeholder="Eg. aryan@T123"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                  className="w-full"
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Login;
