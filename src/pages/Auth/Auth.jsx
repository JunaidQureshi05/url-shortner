import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import Login from "@/components/Login/Login";
import Signup from "@/components/Signup/Signup";
import { urlState } from "@/context";

const Auth = () => {
  const [searchParams] = useSearchParams();

  const { isAuthenticated, loading } = urlState();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="mt-16 md:mt-24 flex flex-col items-center gap-8 px-4 md:px-8">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center">
        {searchParams.get("createNew")
          ? "Hold up! Let's login first..."
          : "Login / Signup"}
      </h1>
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="p-4">
          <Login />
        </TabsContent>
        <TabsContent value="signup" className="p-4">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
