"use client";
import {FormEvent, useState} from "react";
import Link from "next/link";
import { Button } from "@/components/button/button";
import { InputWithIcon } from "@/components/input-with-icon/input-with-icon";
import IconButton from "@/components/icon-button/icon-button";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { LuUserPlus } from "react-icons/lu";
import { WhiteContainer } from "../../components/white-container/white-container";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

export default function SignUp() {
  const [name, setName] = useState("");
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
      console.log("Signing up with", email, password);
    } catch (err) {
      setError("Failed to sign up. Please try again.");
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
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              <IconButton icon={LuUserPlus} size={28} color={"#1f2937"} />
            </Link>
          </WhiteContainer>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mt-6 mb-2">
            Sign up with email
          </h2>
          <p className="text-s text-center text-gray-500 px-20">
            Create an account to manage your tasks efficiently!
          </p>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </header>
        <form onSubmit={handleSubmit} className="space-y-4 p-10">
          <InputWithIcon
            icon={FaUser}
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
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
          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          <div className="flex flex-col py-3">
            <span className="text-center text-gray-800 mb-2">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-blue-500 hover:underline">
                Sign in!
              </Link>
            </span>
            <div className="flex flex-row justify-center items-center">
              <hr />
              <span className="text-[13px] text-gray-500 px-5">
                Or sign up with
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
