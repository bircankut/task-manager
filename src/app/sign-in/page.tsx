"use client";
import {FormEvent, useState} from "react";
import { Button } from "@/components/button/button";
import { InputWithIcon } from "@/components/input-with-icon/input-with-icon";
import IconButton from "@/components/icon-button/icon-button";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { WhiteContainer } from "../../components/white-container/white-container";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import Link from "next/link";

export default function SingIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      console.log("Signing in with", email, password);
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div
      className="h-full w-full flex justify-center items-center"
      style={{
        backgroundImage: `url(/bg4.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div className="min-h-3/5 w-1/3 p-6 shadow-xl rounded-3xl py-12 bg-white">
        <header className="flex flex-col items-center">
          <WhiteContainer height="50px" width="50px" borderRadius="10px">
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              <IconButton icon={LuLogIn} size={28} color={"#1f2937"} />
            </Link>
          </WhiteContainer>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mt-6 mb-2">
            Sign in with email
          </h2>
          <p className="text-s text-center text-gray-500 px-20">
            Sign up to streamline your work with our all-in-one Task Manager!
          </p>
          {error && (
            <p className="text-red-500 text-sm text-center ">{error}</p>
          )}
        </header>
        <form onSubmit={handleSubmit} className="space-y-4 p-10">
          <InputWithIcon
            icon={MdEmail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <InputWithIcon
            icon={RiLockPasswordFill}
            buttonIcon={FaEye}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <div className="flex justify-end">
            <span className="text-center text-[14px] text-gray-500">
              Forgot your password?
            </span>
          </div>
          <Button type="submit" className="w-full">
            Get started
          </Button>

          <div className="flex flex-col py-3">
            <span className="text-center text-gray-800 mb-2">
              Don't you have and account?{" "}
              <Link href="/sign-up" className="text-blue-500 hover:underline">
                Sign up!
              </Link>
            </span>
            <div className="flex flex-row justify-center items-center">
              <hr />
              <span className="text-[13px] text-gray-500 px-7">
                Or sign in with
              </span>
              <hr />
            </div>
          </div>

          <div className="flex justify-evenly items-center space-x-4">
            <WhiteContainer height="50px" width="100px" borderRadius="10px">
              <IconButton icon={FaGoogle} />
            </WhiteContainer>
            <WhiteContainer height="50px" width="100px" borderRadius="10px">
              <IconButton icon={FaFacebook} />
            </WhiteContainer>
            <WhiteContainer height="50px" width="100px" borderRadius="10px">
              <IconButton icon={FaGithub} />
            </WhiteContainer>
          </div>
        </form>
      </div>
    </div>
  );
}
